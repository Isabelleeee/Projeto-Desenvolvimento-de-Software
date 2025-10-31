from django.db import models
from django.conf import settings

class Categoria(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Trilha(models.Model):
    TIPO_TRILHA_CHOICES = [
        ('PRE', 'Pré-Definida'),
        ('PER', 'Personalizada'),
    ]

    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    tipo = models.CharField(max_length=3, choices=TIPO_TRILHA_CHOICES, default='PRE')
    data_criacao = models.DateTimeField(auto_now_add=True)
    duracao_estimada = models.PositiveIntegerField(help_text="Duração estimada em minutos",default=0)

    def __str__(self):
        return self.titulo

class Etapa(models.Model):
    trilha = models.ForeignKey(Trilha, related_name='etapas', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    ordem = models.PositiveIntegerField()
    duracao_estimada = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return f"{self.trilha.titulo} - Etapa {self.ordem}: {self.titulo}"
class Inscricao(models.Model):
    """ Modelo que liga um Usuário a uma Trilha """
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='inscricões'
    )
    trilha = models.ForeignKey(
        Trilha, # Garante que a classe Trilha está definida acima
        on_delete=models.CASCADE,
        related_name='inscritos'
    )
    data_inscricao = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('usuario', 'trilha')
        ordering = ['data_inscricao']

    def __str__(self):
        # Tenta acessar username, mas previne erro se usuário for None (embora não deva ser)
        username = getattr(self.usuario, 'username', 'N/A')
        trilha_titulo = getattr(self.trilha, 'titulo', 'N/A')
        return f"'{username}' inscrito em '{trilha_titulo}'"