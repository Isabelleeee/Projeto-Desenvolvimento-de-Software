# app_principal/utils/security.py
import os
from dotenv import load_dotenv
from django.contrib.auth.hashers import make_password, check_password

# Carrega variáveis de ambiente (.env)
load_dotenv()

# Obtém chaves sensíveis com fallback
SECRET_KEY = os.getenv("SECRET_KEY", "chave_padrao_insegura")
DATABASE_URL = os.getenv("DATABASE_URL", "")
DEBUG = os.getenv("DEBUG", "True").lower() == "true"

def hash_password(password: str) -> str:
    """
    Gera o hash da senha usando o sistema nativo do Django (PBKDF2).
    """
    return make_password(password)

def verify_password(password: str, hashed_password: str) -> bool:
    """
    Verifica se a senha fornecida confere com o hash armazenado.
    """
    return check_password(password, hashed_password)

def get_secret_config():
    """
    Retorna as variáveis sensíveis carregadas do .env
    """
    return {
        "SECRET_KEY": SECRET_KEY,
        "DATABASE_URL": DATABASE_URL,
        "DEBUG": DEBUG,
    }
