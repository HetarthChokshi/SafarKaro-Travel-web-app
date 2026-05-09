# Backend Docker Setup

This folder contains environment-specific Docker files for the backend only.

## Structure

- `local/`: local development setup (Django dev server, default SQLite)
- `prod/`: production-like setup (Gunicorn + Postgres)

## How to use

From the repository root, copy one environment's files to root and run compose there.

### Local

```bash
cp safarBackend/docker/local/* .
cp safarBackend/docker/local/.env.example .env
docker compose up --build
```

Backend URL: http://localhost:8000

### Production-like

```bash
cp safarBackend/docker/prod/* .
cp safarBackend/docker/prod/.env.example .env
# Edit .env values before starting
docker compose up --build -d
```

Backend URL: http://localhost:8000

## Notes

- Frontend is intentionally not dockerized.
- `DATABASE_URL` is optional in local (SQLite is default if not set).
- `wkhtmltopdf` is installed in the image and wired via `WKHTMLTOPDF_PATH`.
