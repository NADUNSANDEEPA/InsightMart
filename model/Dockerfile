FROM python:3.10-slim

# ------------------------------
# System dependencies (needed to build LightFM from source)
# ------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    g++ \
    libopenblas-dev \
    liblapack-dev \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------
# Working directory
# ------------------------------
WORKDIR /app

# ------------------------------
# Upgrade pip & install Python libs
# ------------------------------
RUN pip install --upgrade pip setuptools wheel && \
    pip install \
    jupyterlab \
    pandas \
    numpy \
    scipy \
    scikit-learn \
    matplotlib \
    seaborn \
    joblib \
    statsmodels \
    xgboost \
    pmdarima \
    prophet

# ------------------------------
# Install LightFM from GitHub
# ------------------------------
RUN pip install git+https://github.com/daviddavo/lightfm

# ------------------------------
# Expose Jupyter port
# ------------------------------
EXPOSE 8888

# ------------------------------
# Start JupyterLab
# ------------------------------
CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--allow-root", "--no-browser", "--NotebookApp.token=", "--NotebookApp.password="]
