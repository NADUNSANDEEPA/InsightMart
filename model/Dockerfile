# ------------------------------
# Base Image
# ------------------------------
FROM python:3.10-slim

# ------------------------------
# System Dependencies
# ------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    libopenblas-dev \
    libssl-dev \
    libgomp1 \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------
# Set Working Directory
# ------------------------------
WORKDIR /app

# ------------------------------
# Install Python Dependencies
# ------------------------------
RUN pip install --upgrade pip && pip install --no-cache-dir \
    jupyterlab \
    pandas \
    numpy \
    scipy \
    scikit-learn \
    matplotlib \
    seaborn \
    joblib \
    xgboost \
    pmdarima \
    prophet \
    statsmodels

# ------------------------------
# Expose Ports
# ------------------------------
EXPOSE 8888

# ------------------------------
# Default Command - Launch JupyterLab
# ------------------------------
CMD ["jupyter", "lab", "--ip=0.0.0.0", "--allow-root", "--no-browser", "--NotebookApp.token=", "--NotebookApp.password="]
