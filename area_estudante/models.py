from django.db import models
from django.conf import settings # Para pegar o User
from app_principal.models import Etapa
from django.db import models
from django.contrib.auth.models import User
from app_principal.models import Trilha

class Inscricao(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inscricoes')
    trilha = models.ForeignKey(Trilha, on_delete=models.CASCADE, related_name='inscricoes')
    progresso = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.usuario.username} - {self.trilha.nome} ({self.progresso}%)"

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