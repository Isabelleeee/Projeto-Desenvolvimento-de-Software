from django.db import models
from django.conf import settings # Para pegar o User
from app_principal.models import Etapa # Importa o modelo Etapa do outro app

# Modelo para registrar a conclusão de uma etapa por um usuário
class ProgressoEtapa(models.Model):
    # Liga ao usuário padrão do Django
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='progresso_etapas'
    )
    # Liga à etapa que foi concluída
    etapa = models.ForeignKey(
        Etapa,
        on_delete=models.CASCADE,
        related_name='conclusoes'
    )
    # Data/hora em que foi concluída
    data_conclusao = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Garante que um usuário só pode concluir uma etapa uma vez
        unique_together = ('usuario', 'etapa')
        ordering = ['data_conclusao'] # Ordena por data

    def __str__(self):
        # Representação em texto (Ex: "Usuário 'giova' concluiu 'Introdução ao Flask'")
        return f"Usuário '{self.usuario.username}' concluiu '{self.etapa.titulo}'"