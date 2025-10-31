from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView

urlpatterns = [
    # opcional: redireciona root para o login-unificado
    path('', RedirectView.as_view(url='/login-unificado/', permanent=True)),

    path('admin/', admin.site.urls),
    path('api/principal/', include('app_principal.urls_api', namespace='app_principal_api')),
    path('api/estudante/', include('area_estudante.urls', namespace='estudante')),
    path('', include('app_principal.urls')),  # inclui /login-unificado/
]
