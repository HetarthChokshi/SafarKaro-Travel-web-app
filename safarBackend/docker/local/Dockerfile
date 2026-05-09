FROM python:3.11-slim-bullseye

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        libpq-dev \
        wkhtmltopdf \
    && rm -rf /var/lib/apt/lists/*

COPY safarBackend/requirements-docker.txt /tmp/requirements-docker.txt
RUN pip install --no-cache-dir -r /tmp/requirements-docker.txt

COPY safarBackend /app

RUN chmod +x /app/docker/local/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["sh", "/app/docker/local/entrypoint.sh"]
