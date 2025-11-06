from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.views import View
from django.shortcuts import redirect
from django.conf import settings
from django.conf.urls.static import static


# ===================================================
# 🔀 Redirect dinâmico conforme o tipo de usuário
# ===================================================
class DynamicRedirectView(View):
    """Redireciona automaticamente o usuário logado
    para o front correto (admin / estudante / login)
    """

    def get(self, request):
        user = request.user

        # Usuário autenticado
        if user.is_authenticated:
            # Se for superusuário → área admin React
            if user.is_superuser:
                return redirect(settings.FRONTEND_ADMIN_URL)

            # Se for aluno comum → área estudante React
            return redirect(settings.FRONTEND_ESTUDANTE_URL)

        # Caso não esteja logado → página de login React
        return redirect(settings.FRONTEND_LOGIN_URL)


# ===================================================
# 🔗 URL Patterns
# ===================================================
urlpatterns = [
    # 🔹 LOGOUT do painel admin (redireciona para o front)
    path(
        "admin/logout/",
        auth_views.LogoutView.as_view(next_page=settings.FRONTEND_LOGIN_URL),
        name="admin_logout",
    ),

    # 🔹 PAINEL ADMIN DJANGO
    path("admin/", admin.site.urls),

    # 🔹 ÁREA DO ESTUDANTE (API)
    path(
        "api/estudante/",
        include(("area_estudante.urls", "area_estudante"), namespace="estudante"),
    ),

    # 🔹 APP PRINCIPAL (login, cadastro, trilhas, IA, etc.)
    path("", include(("app_principal.urls", "app_principal"), namespace="principal")),

    # 🔹 Redirecionamento dinâmico
    path("", DynamicRedirectView.as_view(), name="home"),
]


# ===================================================
# 🔹 SERVE ARQUIVOS ESTÁTICOS (apenas no DEBUG)
# ===================================================
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
