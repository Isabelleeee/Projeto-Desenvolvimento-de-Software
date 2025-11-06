# app_principal/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # 🔐 Autenticação e acesso
    path("api/login-unificado/", views.LoginUnificadoView.as_view(), name="login_unificado"),
    path("api/logout/", views.LogoutView.as_view(), name="logout"),
    path("api/cadastro/", views.CadastroView.as_view(), name="cadastro"),

    # 🎯 Trilhas e progresso
    path("api/trilhas/", views.TrilhaListAPIView.as_view(), name="trilhas"),
    path("api/criar-trilha/", views.CriarTrilhaAPIView.as_view(), name="criar_trilha"),
    path("api/iniciar-trilha/", views.IniciarTrilhaView.as_view(), name="iniciar_trilha"),
    path("api/meu-progresso/", views.MeuProgressoView.as_view(), name="meu_progresso"),

    # 🔄 Redirecionamentos
    path("redirect-admin/", views.redirect_admin, name="redirect_admin"),
    path("redirect-estudante/", views.redirect_estudante, name="redirect_estudante"),

    # 🧪 Teste
    path("api/test-auth/", views.TestAuthView.as_view(), name="test_auth"),
]
