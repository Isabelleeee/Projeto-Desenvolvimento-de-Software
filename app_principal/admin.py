from django.contrib import admin
from .models import Categoria, Trilha, Etapa, Inscricao
from django.contrib import admin

admin.site.site_header = "EstudaAI — Administração"
admin.site.site_title = "EstudaAI Admin"
admin.site.index_title = "Bem-vindo ao painel EstudaAI"

admin.site.register(Categoria)
admin.site.register(Trilha)
admin.site.register(Etapa)
admin.site.register(Inscricao)