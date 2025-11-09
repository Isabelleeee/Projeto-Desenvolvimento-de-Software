# app_principal/urls.py
from django.urls import path
from . import views
from .views_ia import GerarTrilhaIAView

urlpatterns = [
    # 🔐 Autenticação e acesso
    path("login-unificado/", views.LoginUnificadoView.as_view(), name="login_unificado"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("cadastro/", views.CadastroView.as_view(), name="cadastro"),

    # 🎯 Trilhas e progresso
    path("trilhas/", views.TrilhaListAPIView.as_view(), name="trilhas"),
    path("trilhas/<int:pk>/", views.TrilhaDetailAPIView.as_view(), name="trilha_detail"),
    path("criar-trilha/", views.CriarTrilhaAPIView.as_view(), name="criar_trilha"),
    path("iniciar-trilha/", views.IniciarTrilhaView.as_view(), name="iniciar_trilha"),
    path("meu-progresso/", views.MeuProgressoView.as_view(), name="meu_progresso"),

    # 👤 Perfil e redirecionamentos
    path("user-profile/", views.UserProfileView.as_view(), name="user_profile"),
    path("redirect-admin/", views.redirect_admin, name="redirect_admin"),
    path("redirect-estudante/", views.redirect_estudante, name="redirect_estudante"),

    # 🧪 Teste
    path("test-auth/", views.TestAuthView.as_view(), name="test_auth"),

    path("gerar-trilha-ia/", GerarTrilhaIAView.as_view(), name="gerar_trilha_ia"),
]
