⚙️ Frontend Setup

    🚀 Run the Frontend (Vite) : npx vite

🖥️ Backend Setup

    🐳 Docker Details For Java Backend
        1. Start Docker Container : docker compose up -d
        2. Verify It’s Running    : docker ps
        3. Stop the Containers    : docker compose down

    🐍 Docker Details For Python Backend
        1. Build Docker Image : docker build -t lightfm-jupyter .
        2. Run Docker Container : docker run -p 8888:8888 -v ${PWD}:/app lightfm-jupyter
