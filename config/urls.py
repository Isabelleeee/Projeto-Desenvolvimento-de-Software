from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # =======================================
    # 🔹 LOGOUT ADMIN → redireciona para login React
    # =======================================
    path("admin/logout/", auth_views.LogoutView.as_view(next_page=settings.FRONTEND_LOGIN_URL)),

    # =======================================
    # 🔹 PAINEL ADMIN DJANGO
    # =======================================
    path("admin/", admin.site.urls),

    # =======================================
    # 🔹 ÁREA DO ESTUDANTE (API)
    # =======================================
    path("api/estudante/", include(("area_estudante.urls", "area_estudante"), namespace="estudante")),

    # =======================================
    # 🔹 APP PRINCIPAL (login, trilhas, IA, etc.)
    # =======================================
    path("", include("app_principal.urls")),
]

# =======================================
# 🔹 Redireciona a raiz "/" para o React
# =======================================
urlpatterns += [
    path("", RedirectView.as_view(url=settings.FRONTEND_LOGIN_URL, permanent=False), name="home"),
]

# =======================================
# 🔹 Serve arquivos estáticos em dev
# =======================================
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
