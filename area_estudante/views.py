from rest_framework import generics, permissions
from app_principal.models import Trilha
from .serializers import TrilhaComProgressoSerializer

class MeuProgressoAPIView(generics.ListAPIView):
    """
    Retorna as trilhas em que o usuário logado está inscrito,
    incluindo o progresso de cada uma.
    """
    serializer_class = TrilhaComProgressoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        usuario_logado = self.request.user
        trilhas_ids = usuario_logado.inscricoes.values_list('trilha_id', flat=True)
        return Trilha.objects.filter(id__in=trilhas_ids)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

# --- Teste de autenticação ---
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class TestAuthView(APIView):
    """
    Endpoint simples para testar se o usuário está autenticado.
    Usado pelo front-end para verificar o login.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "message": "Usuário autenticado com sucesso!",
            "user": request.user.username,
            "id": request.user.id,
        })
