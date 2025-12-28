from flask import Blueprint, request, jsonify
from sklearn.exceptions import NotFittedError


from models.lightfm_model import (
    train_lightfm_model,
    checkRecordAvailable,
    predict_for_existing_customer,
    predict_for_new_customer,
    sales_data
)

product_predict_bp = Blueprint("product_predict_bp", __name__)

# ---------------- TEST ENDPOINT ----------------
@product_predict_bp.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Product Prediction API is running 🚀.."})



@product_predict_bp.route('/predict', methods=['POST'])
def predict_product():
    try:
        data = request.get_json()

        required_fields = [
            "customer_id",
            "customer_age_group",
            "customer_religion",
            "family_size",
            "city",
            "province"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        train_lightfm_model(sales_data)

        customer_id = data["customer_id"]

        exists, history = checkRecordAvailable(customer_id)

        if exists:
            prediction = predict_for_existing_customer(customer_id)
        else:
            prediction = predict_for_new_customer(data)

        response = {
            "customer_id": customer_id,
            "has_history": exists,
            "history_summary": history,
            **prediction
        }

        return jsonify(response)

    except NotFittedError:
        return jsonify({"error": "Model not trained"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
