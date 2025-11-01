# app_principal/urls_api.py
from django.urls import path
from .views import redirect_admin, redirect_estudante
from . import views

app_name = 'app_principal_api'

urlpatterns = [
    # 🔹 Endpoint de login unificado (admin ou estudante)
    path('login/', views.UnifiedLoginAPIView.as_view(), name='login'),
    path('redirect-admin/', redirect_admin, name='redirect_admin'),

    path('redirect-estudante/', redirect_estudante, name='redirect_estudante'),
    # 🔹 Listagem de trilhas existentes
    path('trilhas/', views.TrilhaListAPIView.as_view(), name='lista_trilhas'),

    # 🔹 Criar nova trilha via IA e salvar no banco
    path('criar-trilha-ia/', views.CriarTrilhaIAAPIView.as_view(), name='criar_trilha_ia'),
]
