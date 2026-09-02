# Safar Karo Backend

Django REST API for the Safar Karo travel booking application.

## Prerequisites

- Python 3.14 or later
- [uv](https://docs.astral.sh/uv/)
- `wkhtmltopdf` for generating PDF receipts

On Windows, install `wkhtmltopdf` so that it is available at the default path:
`C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe`. If it is installed elsewhere,
set the `WKHTMLTOPDF_PATH` environment variable to the executable path.

## Setup

From the repository root:

```powershell
cd safarBackend
uv venv
.venv\Scripts\Activate.ps1
uv pip install -r requirement.txt
```

On macOS or Linux, activate the environment with:

```bash
cd safarBackend
uv venv
source .venv/bin/activate
uv pip install -r requirement.txt
```

The existing `requirement.txt` is the source of the backend dependencies. Run the
commands below with the virtual environment activated.

## Initialize the database

```bash
uv run python manage.py check
uv run python manage.py migrate
```

SQLite is used by default and is stored in `safarBackend/db.sqlite3`. To use a
different database, set `DATABASE_URL` before starting Django. The application
also supports `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, and `DJANGO_ALLOWED_HOSTS`.

## Run the development server

```bash
uv run python manage.py runserver
```

The API is available at <http://127.0.0.1:8000/>.

To create an administrator account:

```bash
uv run python manage.py createsuperuser
```

The Django admin is available at <http://127.0.0.1:8000/admin/>.
