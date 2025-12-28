from flask import Blueprint, request, jsonify
import pandas as pd

chart_bp = Blueprint("chart_bp", __name__)

sales_data = pd.read_json("generated_sales_dataset.json", orient="records")

if "return_reason" not in sales_data.columns:
    sales_data["return_reason"] = ""
else:
    sales_data["return_reason"] = sales_data["return_reason"].fillna("")

sales_data["buying_date"] = pd.to_datetime(sales_data["buying_date"], errors="coerce")


def get_sales_filtered(start_date, end_date, product_name=None):
    """Helper function to filter sales by date (and optional product)."""
    start_date = pd.to_datetime(start_date)
    end_date = pd.to_datetime(end_date)
    filtered = sales_data[
        (sales_data["buying_date"] >= start_date) & 
        (sales_data["buying_date"] <= end_date)
    ]
    if product_name:
        filtered = filtered[filtered["product_name"] == product_name]
    return filtered


@chart_bp.route("/api/sales/time-based", methods=["POST"])
def time_based_sales():
    """Return daily sales and rolling average for a product."""
    data = request.get_json()
    if not data or "start_date" not in data or "end_date" not in data or "product_name" not in data:
        return jsonify({"success": False, "message": "start_date, end_date, product_name required"}), 400

    try:
        filtered = get_sales_filtered(data["start_date"], data["end_date"], data["product_name"])
        daily_sales = filtered.groupby("buying_date")["quantity"].sum().reset_index().sort_values("buying_date")
        daily_sales["rolling_avg"] = daily_sales["quantity"].rolling(window=3, min_periods=1).mean()
        result = {
            "product_name": data["product_name"],
            "start_date": data["start_date"],
            "end_date": data["end_date"],
            "total_sales": int(filtered["quantity"].sum()),
            "daily_sales": daily_sales.to_dict(orient="records")
        }
        return jsonify({"success": True, "data": result}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@chart_bp.route("/api/sales/by-religion", methods=["POST"])
def sales_by_religion():
    """Return product sales summary grouped by religion."""
    data = request.get_json()
    if not data or "start_date" not in data or "end_date" not in data:
        return jsonify({"success": False, "message": "start_date and end_date required"}), 400

    try:
        filtered = get_sales_filtered(data["start_date"], data["end_date"])
        if filtered.empty:
            return jsonify({"success": True, "data": [], "message": "No sales data found"}), 200

        grouped = filtered.groupby(["product_name", "customer_religion"])["quantity"].sum().unstack(fill_value=0)
        products_summary = []
        for product, row in grouped.iterrows():
            products_summary.append({
                "product_name": product,
                "sales_by_religion": row.to_dict(),
                "total_quantity": int(row.sum())
            })
        return jsonify({"success": True, "data": products_summary}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@chart_bp.route("/api/sales/by-province", methods=["POST"])
def sales_by_province():
    """Return product sales summary grouped by province."""
    data = request.get_json()
    if not data or "start_date" not in data or "end_date" not in data:
        return jsonify({"success": False, "message": "start_date and end_date required"}), 400

    try:
        filtered = get_sales_filtered(data["start_date"], data["end_date"])
        if filtered.empty:
            return jsonify({"success": True, "data": [], "message": "No sales data found"}), 200

        products_summary = []
        for product, group in filtered.groupby("product_name"):
            sales_by_province = group.groupby("province")["quantity"].sum().to_dict()
            products_summary.append({
                "product_name": product,
                "sales_by_province": sales_by_province
            })
        return jsonify({"success": True, "data": products_summary}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
