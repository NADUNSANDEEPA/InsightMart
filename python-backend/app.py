from flask import Flask
from flask_cors import CORS

from routes.report_routes import report_bp
from routes.product_predict import product_predict_bp
from routes.chart_routes import chart_bp

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(report_bp, url_prefix="/report-generate")
app.register_blueprint(product_predict_bp, url_prefix="/product-predict")
app.register_blueprint(chart_bp, url_prefix="/chart")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
