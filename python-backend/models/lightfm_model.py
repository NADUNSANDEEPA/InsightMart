import json
import numpy as np
import pandas as pd
from lightfm import LightFM
from lightfm.data import Dataset
from lightfm.cross_validation import random_train_test_split
from lightfm.evaluation import precision_at_k, recall_at_k, auc_score


sales_data = pd.read_json("generated_sales_dataset.json", orient="records")

if "return_reason" not in sales_data.columns:
    sales_data["return_reason"] = ""
else:
    sales_data["return_reason"] = sales_data["return_reason"].fillna("")


model = None
dataset = None
product_list = []
train_interactions = None
test_interactions = None
MODEL_TRAINED = False


def train_lightfm_model(data: pd.DataFrame):
    global model, dataset, product_list
    global train_interactions, test_interactions, MODEL_TRAINED

    if MODEL_TRAINED:
        return  

    users = data["customer_id"].unique()
    items = data["product_code"].unique()

    dataset = Dataset()
    dataset.fit(users=users, items=items)

    interactions = []
    for _, row in data.iterrows():
        weight = (row["quantity"] * row["rate"]) / 5.0
        interactions.append(
            (row["customer_id"], row["product_code"], weight)
        )

    interactions_matrix, _ = dataset.build_interactions(interactions)

    train_interactions, test_interactions = random_train_test_split(
        interactions_matrix,
        test_percentage=0.2,
        random_state=42
    )

    model = LightFM(
        loss="warp",
        no_components=50,
        learning_rate=0.05,
        random_state=42
    )

    model.fit(train_interactions, epochs=30, num_threads=4)

    product_list = list(items)
    MODEL_TRAINED = True



def checkRecordAvailable(customer_id: str):
    exists = customer_id in sales_data["customer_id"].values

    if not exists:
        return False, {"total_sales_records": 0, "products": []}

    summary = (
        sales_data[sales_data["customer_id"] == customer_id]
        .groupby("product_code")
        .size()
        .reset_index(name="count")
        .to_dict("records")
    )

    return True, {
        "total_sales_records": len(summary),
        "products": summary
    }


def find_similar_customers(customer_input, data, top_k=50):
    similar = data[
        (data["customer_age_group"] == customer_input["customer_age_group"]) &
        (data["customer_religion"] == customer_input["customer_religion"]) &
        (data["family_size"] == customer_input["family_size"]) &
        (data["city"] == customer_input["city"]) &
        (data["province"] == customer_input["province"])
    ]

    if similar.empty:
        similar = data[
            (data["customer_age_group"] == customer_input["customer_age_group"]) &
            (data["customer_religion"] == customer_input["customer_religion"])
        ]

    return similar["customer_id"].unique()[:top_k]


def predict_for_new_customer(customer_input):
    user_mapping = dataset.mapping()[0]
    similar_customers = find_similar_customers(customer_input, sales_data)

    scores_list = []

    for cust in similar_customers:
        if cust in user_mapping:
            uid = user_mapping[cust]
            scores = model.predict(uid, np.arange(len(product_list)))
            scores_list.append(scores)

    if not scores_list:
        return {"approach": "cold_start", "recommendations": []}

    avg_scores = np.mean(scores_list, axis=0)
    top_items = np.argsort(-avg_scores)[:5]

    recommendations = []
    for idx in top_items:
        product_code = product_list[idx]
        info = sales_data[sales_data["product_code"] == product_code].iloc[0]

        recommendations.append({
            "product_code": product_code,
            "product_name": info["product_name"],
            "product_category": info["product_category"],
            "unit_price": info["unit_price"],
            "score": float(avg_scores[idx])
        })

    return {
        "approach": "cold_start",
        "recommendations": recommendations
    }


def predict_for_existing_customer(customer_id: str):
    user_mapping = dataset.mapping()[0]

    if customer_id not in user_mapping:
        return {"error": "Customer not found in trained model"}

    uid = user_mapping[customer_id]
    scores = model.predict(uid, np.arange(len(product_list)))

    purchased = set(
        sales_data[sales_data["customer_id"] == customer_id]["product_code"]
    )

    ranked = [
        (product_list[i], scores[i])
        for i in range(len(scores))
        if product_list[i] not in purchased
    ]

    ranked.sort(key=lambda x: x[1], reverse=True)

    recommendations = []
    for product_code, score in ranked[:5]:
        info = sales_data[sales_data["product_code"] == product_code].iloc[0]

        recommendations.append({
            "product_code": product_code,
            "product_name": info["product_name"],
            "product_category": info["product_category"],
            "unit_price": info["unit_price"],
            "score": float(score)
        })

    return {
        "approach": "existing_customer",
        "recommendations": recommendations
    }
