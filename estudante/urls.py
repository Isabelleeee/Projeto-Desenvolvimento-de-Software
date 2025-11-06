from django.urls import path
from . import areaback

urlpatterns = [
    path('', areaback.index, name='index'),
]

urlpatterns = [
    path("gerar-trilha/", areaback.gerar_trilha, name="gerar_trilha"),
]
