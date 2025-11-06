from django.db import models
from django.conf import settings


# ==========================================================
# 📚 CATEGORIA
# ==========================================================
class Categoria(models.Model):
    nome = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Categorias"
        ordering = ["nome"]

    def __str__(self):
        return self.nome


# ==========================================================
# 🧭 TRILHA
# ==========================================================
class Trilha(models.Model):
    TIPO_TRILHA_CHOICES = [
        ('PRE', 'Pré-Definida'),
        ('PER', 'Personalizada'),
    ]

    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    tipo = models.CharField(
        max_length=3,
        choices=TIPO_TRILHA_CHOICES,
        default='PRE'
    )
    data_criacao = models.DateTimeField(auto_now_add=True)
    duracao_estimada = models.PositiveIntegerField(
        help_text="Duração estimada em minutos",
        default=0
    )

    class Meta:
        verbose_name_plural = "Trilhas"
        ordering = ["titulo"]

    def __str__(self):
        return self.titulo


# ==========================================================
# 🧩 ETAPA
# ==========================================================
class Etapa(models.Model):
    trilha = models.ForeignKey(
        Trilha,
        related_name='etapas',
        on_delete=models.CASCADE
    )
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    ordem = models.PositiveIntegerField()
    duracao_estimada = models.IntegerField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "Etapas"
        ordering = ["ordem"]

    def __str__(self):
        return f"{self.trilha.titulo} - Etapa {self.ordem}: {self.titulo}"


# ==========================================================
# 🧾 INSCRIÇÃO
# ==========================================================
class Inscricao(models.Model):
    """
    Liga um usuário a uma trilha específica.
    Corrigido o related_name para evitar conflito com area_estudante.Inscricao.
    """
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='inscricoes_principal'  # ✅ Corrigido
    )
    trilha = models.ForeignKey(
        Trilha,
        on_delete=models.CASCADE,
        related_name='inscritos'
    )
    data_inscricao = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Minha Inscrição"
        verbose_name_plural = "Minhas Inscrições"
        ordering = ["data_inscricao"]

    def __str__(self):
        username = getattr(self.usuario, 'username', 'N/A')
        trilha_titulo = getattr(self.trilha, 'titulo', 'N/A')
        return f"{username} inscrito em {trilha_titulo}"


# ==========================================================
# 📈 PROGRESSO
# ==========================================================
class Progresso(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="progresso"
    )
    trilha = models.ForeignKey(
        Trilha,
        on_delete=models.CASCADE,
        related_name="progresso_trilha"
    )
    etapa = models.ForeignKey(
        Etapa,
        on_delete=models.CASCADE,
        related_name="progresso_etapa"
    )
    concluido = models.BooleanField(default=False)
    data_conclusao = models.DateTimeField(null=True, blank=True)
    ultima_atualizacao = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Progresso"
        verbose_name_plural = "Progresso dos Alunos"
        unique_together = ("usuario", "etapa")

    def __str__(self):
        status = "✅ Concluído" if self.concluido else "🕓 Em andamento"
        return f"{self.usuario.username} - {self.etapa.titulo} ({status})"
