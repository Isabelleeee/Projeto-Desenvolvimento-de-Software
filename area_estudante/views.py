from rest_framework import generics, permissions
from app_principal.models import Trilha
from .serializers import TrilhaComProgressoSerializer

class MeuProgressoAPIView(generics.ListAPIView):
    """
    API que retorna a lista de trilhas em que o usuário logado
    está inscrito, incluindo o progresso calculado para cada uma.
    """
    serializer_class = TrilhaComProgressoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        usuario_logado = self.request.user
        # Busca IDs das trilhas onde o usuário tem inscrição
        trilhas_inscritas_ids = usuario_logado.inscricoes.values_list('trilha_id', flat=True)
        # Retorna os objetos Trilha correspondentes a esses IDs
        return Trilha.objects.filter(id__in=trilhas_inscritas_ids)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
