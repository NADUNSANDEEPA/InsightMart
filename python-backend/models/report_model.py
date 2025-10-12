import joblib
from sklearn.exceptions import NotFittedError


try:
    model = joblib.load("./trained_models/report_identify/report_model.pkl")
    vectorizer = joblib.load("./trained_models/report_identify/vectorizer.pkl")
    report_info_map = joblib.load("./trained_models/report_identify/report_info_map.pkl")

    if not hasattr(vectorizer, "vocabulary_"):
        raise NotFittedError("Vectorizer is not fitted. Refit before using transform().")

except Exception as e:
    print(f"❌ Error loading model/vectorizer: {e}")
    model = vectorizer = report_info_map = None


def predict_report(user_question: str):
    """Predict report code and return details."""
    if not model or not vectorizer or not report_info_map:
        raise RuntimeError("Model or vectorizer not loaded properly.")

    vec = vectorizer.transform([user_question])
    report_code = model.predict(vec)[0]
    report_details = report_info_map.get(report_code, {})

    return {
        "report_code": report_code,
        "description": report_details.get("description", ""),
        "parameters_for_report_generate": report_details.get("parameters_for_report_generate", []),
    }
