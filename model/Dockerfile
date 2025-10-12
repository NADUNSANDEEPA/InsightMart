# Use official Python base image
FROM python:3.10-slim

# Install system dependencies for LightFM compilation
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    libopenblas-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install LightFM and Jupyter
RUN pip install --no-cache-dir lightfm jupyterlab pandas numpy scipy scikit-learn matplotlib

# Expose Jupyter notebook port
EXPOSE 8888

# Start Jupyter notebook server
CMD ["jupyter", "lab", "--ip=0.0.0.0", "--allow-root", "--no-browser", "--NotebookApp.token=''", "--NotebookApp.password=''"]
