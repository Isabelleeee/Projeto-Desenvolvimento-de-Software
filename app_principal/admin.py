from django.contrib import admin
from .models import Categoria, Trilha, Etapa, Inscricao

admin.site.register(Categoria)
admin.site.register(Trilha)
admin.site.register(Etapa)
admin.site.register(Inscricao)