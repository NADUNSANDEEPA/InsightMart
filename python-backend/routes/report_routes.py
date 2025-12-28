from flask import Blueprint, request, jsonify
from models.report_model import predict_report
from sklearn.exceptions import NotFittedError

report_bp = Blueprint("report_bp", __name__)


@report_bp.route('/test', methods=['GET'])
def home():
    return jsonify({"message": "Report Prediction API is running 🚀."})


@report_bp.route('/predict', methods=['POST'])
def predict_api():
    try:
        data = request.get_json()
        user_question = data.get("user_question", "")

        if not user_question.strip():
            return jsonify({"error": "user_question is required"}), 400

        result = predict_report(user_question)
        print(f"Predicted report: {result}")
        return jsonify(result)

    except NotFittedError as e:
        return jsonify({"error": "Vectorizer not fitted", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal error", "details": str(e)}), 500
