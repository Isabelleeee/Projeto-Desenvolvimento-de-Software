"""
Django settings for config project.
Integração completa entre Django (backend) e React (fronts: login 3000, estudante 3001, admin 3002)
"""

from pathlib import Path
from decouple import config
import dj_database_url
from dotenv import load_dotenv
import os

# Carrega o arquivo .env
load_dotenv()

# ========================
# 📁 BASE
# ========================
BASE_DIR = Path(__file__).resolve().parent.parent

# ========================
# 🔐 Segurança e Debug
# ========================
SECRET_KEY = config("SECRET_KEY", default="dev-secret-key")
DEBUG = config("DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

# ========================
# 📦 APPS INSTALADOS
# ========================
INSTALLED_APPS = [
    # Padrões Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Apps locais
    "app_principal",
    "area_estudante",

    # Bibliotecas externas
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
]

# ========================
# ⚙️ MIDDLEWARES
# ========================
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # deve vir antes de SessionMiddleware
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

# ========================
# 🧠 TEMPLATES
# ========================
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# ========================
# 🗃️ BANCO DE DADOS
# ========================
DATABASE_URL = config("DATABASE_URL", default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}")
DATABASES = {
    "default": dj_database_url.parse(DATABASE_URL, conn_max_age=600)
}

# ========================
# 🔒 VALIDAÇÃO DE SENHAS
# ========================
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ========================
# 🌎 LOCALIZAÇÃO
# ========================
LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

# ========================
# 🧩 ARQUIVOS ESTÁTICOS
# ========================
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [
    BASE_DIR / "static",
]

# Caminhos dos builds React (opcional, para produção)
REACT_LOGIN_DIR = BASE_DIR / "frontend" / "login-cadastro" / "dist"
REACT_ESTUDANTE_DIR = BASE_DIR / "frontend" / "area-estudante" / "dist"
REACT_ADMIN_DIR = BASE_DIR / "frontend" / "area-admin" / "dist"

# ========================
# 🔁 LOGIN / LOGOUT / REDIRECTS
# ========================
LOGIN_URL = "/api/login-unificado/"
LOGIN_REDIRECT_URL = "/api/meu-progresso/"
LOGOUT_REDIRECT_URL = config("FRONTEND_LOGIN_URL", default="http://localhost:3000/")

# ========================
# 🌐 URLs dos Frontends React
# ========================
FRONTEND_LOGIN_URL = config("FRONTEND_LOGIN_URL", default="http://localhost:3000/")
FRONTEND_ESTUDANTE_URL = config("ALUNO_URL", default="http://localhost:3001/")
FRONTEND_ADMIN_URL = config("ADMIN_URL", default="http://localhost:3002/")

# ========================
# 🔗 CORS e CSRF (React)
# ========================
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3002",
]
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3002",
]

# ========================
# 🧩 Django REST Framework
# ========================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        'rest_framework.authentication.TokenAuthentication',
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
}

# ========================
# ⚙️ PADRÕES
# ========================
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
