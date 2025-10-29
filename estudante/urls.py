from django.urls import path
from . import areaback

urlpatterns = [
    path('', areaback.index, name='index'),
]
