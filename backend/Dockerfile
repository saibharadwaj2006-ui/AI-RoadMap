FROM python:3.11-slim

# Install system tools just in case any python package needs to compile from source
RUN apt-get update && apt-get install -y gcc libffi-dev libpq-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip wheel setuptools
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Run FastAPI using Render's dynamic PORT
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
