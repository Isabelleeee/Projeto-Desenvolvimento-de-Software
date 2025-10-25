from django.db import models

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
    duracao_estimada = models.PositiveIntegerField(help_text="Duração estimada em minutos")

    class Meta:
        ordering = ['ordem']

    def __str__(self):
        return f"{self.trilha.titulo} - Etapa {self.ordem}: {self.titulo}"
