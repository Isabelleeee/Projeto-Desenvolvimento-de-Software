from .models import Categoria, Trilha, Etapa, Inscricao, Progresso
from django.contrib import admin

admin.site.site_header = "EstudaAI — Administração"
admin.site.site_title = "EstudaAI Admin"
admin.site.index_title = "Bem-vindo ao painel EstudaAI"

admin.site.register(Categoria)
admin.site.register(Trilha)
admin.site.register(Etapa)
admin.site.register(Inscricao)

# Reordena apenas a visualização no painel admin (sem afetar o Jazzmin)
def custom_app_list(request, app_list):
    for app in app_list:
        if app["app_label"] == "app_principal":
            ordered_models = []
            order = ["Categoria", "Trilha", "Etapa", "Inscrição", "Minhas Inscrições"]

            # Ordena conforme a lista acima
            app["models"].sort(
                key=lambda x: order.index(x["name"]) if x["name"] in order else 999
            )
    return app_list

@admin.register(Progresso)
class ProgressoAdmin(admin.ModelAdmin):
    list_display = ("usuario", "trilha", "etapa", "concluido", "data_conclusao", "ultima_atualizacao")
    list_filter = ("concluido", "trilha")
    search_fields = ("usuario__username", "trilha__titulo", "etapa__titulo")
    list_editable = ("concluido",)