FROM ghcr.io/astral-sh/uv:0.12.5 AS uv

FROM python:3.12-slim-bookworm AS builder

COPY --from=uv /uv /uvx /bin/

WORKDIR /build

COPY requirement.txt ./
RUN uv pip install --prefix /install --no-cache -r requirement.txt gunicorn

FROM python:3.12-slim-bookworm


ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=safarBackend.settings

WORKDIR /app

RUN apt-get update \
    && apt-get install --no-install-recommends -y wkhtmltopdf \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /install/ /usr/local/

COPY . .
RUN python manage.py collectstatic --noinput

RUN useradd --create-home --no-log-init --shell /usr/sbin/nologin appuser \
    && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "safarBackend.wsgi:application"]
