# Use slim Python 3.10 image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# ------------------------------
# Install system dependencies
# ------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------
# Upgrade pip and install Python packages
# ------------------------------
RUN pip install --upgrade pip

# Install core dependencies
RUN pip install \
    scikit-learn==1.7.2 \
    numpy==1.26.4 \
    pandas==2.1.1 \
    joblib==1.3.2 \
    flask==2.3.2 \
    flask-cors==6.0.2 \
    matplotlib==3.8.1

# Install LightFM from GitHub
RUN pip install git+https://github.com/daviddavo/lightfm

# ------------------------------
# Copy application code
# ------------------------------
COPY app.py .
COPY routes ./routes
COPY models ./models
COPY trained_models ./trained_models

# Expose Flask port
EXPOSE 5000

# Command to run the app
CMD ["python", "app.py"]
