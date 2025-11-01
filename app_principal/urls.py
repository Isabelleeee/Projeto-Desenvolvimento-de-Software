from django.urls import path
from .login_unificado_front import login_unificado_view
from .views_logout import logout_view
from .views import UnifiedLoginAPIView  # 🔹 importa a API oficial

urlpatterns = [
    # 🔹 Página de login unificado (HTML)
    path('login-unificado/', login_unificado_view, name='login_unificado'),

    # 🔹 Endpoint REST de login unificado (JSON)
    path('api/login-unificado/', UnifiedLoginAPIView.as_view(), name='api_login_unificado'),

    # 🔹 Logout
    path('logout/', logout_view, name='logout'),
]
