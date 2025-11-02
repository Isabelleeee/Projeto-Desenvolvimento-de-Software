"""
Django settings for config project.
"""

from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

# ========================
# 🔐 Segurança e Debug
# ========================
SECRET_KEY = config("DJANGO_SECRET_KEY", default="dev-secret-key")
DEBUG = config("DJANGO_DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = []

# ========================
# 📦 Apps instalados
# ========================
INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app_principal',
    'area_estudante',
    'rest_framework',
    'corsheaders',
]
JAZZMIN_UI_TWEAKS = {
    "theme": "flatly",  # leve e moderna
    "dark_mode_theme": "darkly",
}

# ================================
# CONFIGURAÇÃO DO TEMA JAZZMIN
# ================================
JAZZMIN_SETTINGS = {
    "site_title": "EstudaAI - Administração",
    "site_header": "EstudaAI",
    "site_brand": "Painel Administrativo",
    "welcome_sign": "Bem-vindo(a) ao EstudaAI 💜",
    "copyright": "EstudaAI © 2025",

    # Ícone da aba e do painel
    "site_logo": None,
    "login_logo": None,
    "login_logo_dark": None,

    # Layout
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],

    # Ícones (Font Awesome)
    "icons": {
        "auth": "fas fa-users-cog",
        "app_principal.Categoria": "fas fa-tags",
        "app_principal.Trilha": "fas fa-route",
        "app_principal.Etapa": "fas fa-tasks",
    },

    # Links no topo
    "topmenu_links": [
        {"name": "Início", "url": "admin:index", "permissions": ["auth.view_user"]},
    ],
}

JAZZMIN_UI_TWEAKS = {
    "theme": "flatly",
    "dark_mode_theme": None,
    "navbar": "navbar-dark bg-purple-800",
    "sidebar": "sidebar-dark-purple",
    "brand_colour": "navbar-purple",
    "accent": "accent-purple",
    "button_classes": {
        "primary": "btn-primary bg-purple-700 border-none",
        "secondary": "btn-outline-light",
        "success": "btn-success",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
    },
}


# ========================
# ⚙️ Middlewares
# ========================
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

# ========================
# 🧠 Templates
# ========================
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],  # diretório padrão
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# ========================
# 🗃️ Banco de dados
# ========================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ========================
# 🔒 Validação de senhas
# ========================
AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]

# ========================
# 🌎 Localização
# ========================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ========================
# 🧩 Arquivos estáticos
# ========================
STATIC_URL = '/static/'

# Caminho para o build do React (gerado por npm run build)
REACT_BUILD_DIR = BASE_DIR / "frontend" / "login-cadastro" / "build"

# Adiciona o build do React ao diretório de templates
TEMPLATES[0]['DIRS'] += [REACT_BUILD_DIR]

# Inclui arquivos estáticos do React (JS, CSS, imagens)
STATICFILES_DIRS = [
    BASE_DIR / "static",
    REACT_BUILD_DIR / "assets"
]
STATIC_ROOT = BASE_DIR / "staticfiles"

# ========================
# 🔁 Configuração de login/logout
# ========================
LOGIN_URL = '/login-unificado/'
LOGIN_REDIRECT_URL = '/area-estudante/'
LOGOUT_REDIRECT_URL = 'http://localhost:3000/'

# ========================
# 🔗 CORS e API
# ========================
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}

# ========================
# 🔗 Integração com o Front-end React
# ========================
FRONTEND_URL = "http://localhost:8000/"  # React servido pelo Django

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
