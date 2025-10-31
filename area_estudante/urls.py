# area_estudante/urls.py
from django.urls import path
from . import views

# Define um 'namespace' para este conjunto de URLs
app_name = 'area_estudante'

urlpatterns = [
    # Define a rota para a API de "Meu Progresso"
    # O endereço completo será: /api/estudante/meu-progresso/
    path('meu-progresso/', views.MeuProgressoAPIView.as_view(), name='meu-progresso'),

    # Adicione outras URLs específicas da área do estudante aqui no futuro
]