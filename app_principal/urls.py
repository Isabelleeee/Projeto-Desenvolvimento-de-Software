# app_principal/urls.py
from django.urls import path
from .login_unificado_front import login_unificado_view

urlpatterns = [
    path('login-unificado/', login_unificado_view, name='login_unificado'),
]
