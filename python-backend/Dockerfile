FROM python:3.10-slim

WORKDIR /app

RUN pip install scikit-learn==1.7.2 numpy==1.26.4 joblib==1.3.2 flask==2.3.2

COPY app.py .
COPY routes ./routes
COPY models ./models
COPY trained_models ./trained_models

EXPOSE 5000

CMD ["python", "app.py"]
