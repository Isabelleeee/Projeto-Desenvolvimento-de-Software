from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views
from django.urls import reverse_lazy
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Logout do admin redireciona para login unificado
    path('admin/logout/', auth_views.LogoutView.as_view(next_page=reverse_lazy('login_unificado'))),

    # Painel administrativo
    path('admin/', admin.site.urls),

    # Endpoints de API
    path('api/principal/', include('app_principal.urls_api', namespace='app_principal_api')),
    path('api/estudante/', include('area_estudante.urls', namespace='estudante')),

    # Rotas internas da aplicação (login_unificado, etc)
    path('', include('app_principal.urls')),
]

# Serve o front React (index.html) na raiz /
urlpatterns += [
    path('', TemplateView.as_view(template_name="index.html")),
]

# Serve os assets do React (JS, CSS, imagens)
if settings.DEBUG:
    urlpatterns += static('/assets/', document_root=settings.REACT_BUILD_DIR / "assets")
