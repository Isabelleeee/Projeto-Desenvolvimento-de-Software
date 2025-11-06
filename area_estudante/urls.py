from django.urls import path
from . import views

app_name = 'area_estudante'

urlpatterns = [
    path('meu-progresso/', views.MeuProgressoAPIView.as_view(), name='meu-progresso'),
]
