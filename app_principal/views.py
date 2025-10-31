# app_principal/views.py
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login
from .models import Trilha, Etapa, Categoria
from .serializers import TrilhaSerializer, UnifiedLoginSerializer
import random
from rest_framework.permissions import AllowAny

# ===============================
# 🔹 Função simulando a IA
# ===============================
def gerar_trilha_com_ia(prompt):
    temas = ["Python", "Django", "IA", "Front-end", "Banco de Dados"]
    tema_escolhido = random.choice(temas)

    trilha = {
        "titulo": f"Trilha de {tema_escolhido} - {prompt[:20]}",
        "descricao": f"Aprenda {tema_escolhido} de forma prática e guiada pela IA.",
        "etapas": [
            {"titulo": f"Introdução ao {tema_escolhido}", "descricao": "Conceitos básicos e primeiros passos."},
            {"titulo": f"Projeto Prático com {tema_escolhido}", "descricao": "Aplicando o conhecimento adquirido."},
        ],
    }
    return trilha


# ===============================
# 🔹 Criar Trilha com IA
# ===============================
class CriarTrilhaIAAPIView(APIView):
    """
    Cria uma nova trilha gerada por IA e salva no banco de dados.
    """
    def post(self, request, *args, **kwargs):
        prompt = request.data.get('prompt', '').strip()
        if not prompt:
            return Response(
                {"error": "O campo 'prompt' é obrigatório."},
                status=status.HTTP_400_BAD_REQUEST
            )

        trilha_gerada = gerar_trilha_com_ia(prompt)
        categoria, _ = Categoria.objects.get_or_create(nome="Geradas por IA")

        nova_trilha = Trilha.objects.create(
            titulo=trilha_gerada["titulo"],
            descricao=trilha_gerada["descricao"],
            categoria=categoria
        )

        for i, etapa in enumerate(trilha_gerada["etapas"], start=1):
            Etapa.objects.create(
                trilha=nova_trilha,
                titulo=etapa["titulo"],
                descricao=etapa["descricao"],
                ordem=i
            )

        serializer = TrilhaSerializer(nova_trilha)
        return Response(
            {"message": "Trilha criada e salva com sucesso!", "trilha": serializer.data},
            status=status.HTTP_201_CREATED
        )


# ===============================
# 🔹 Listagem de Trilhas
# ===============================
class TrilhaListAPIView(generics.ListAPIView):
    queryset = Trilha.objects.all()
    serializer_class = TrilhaSerializer
    permission_classes = [permissions.AllowAny]


# ===============================
# 🔹 Login Unificado
# ===============================
class UnifiedLoginAPIView(generics.GenericAPIView):
    """
    Endpoint de login unificado (processar_login).
    Recebe POST com username, password e profile_type.
    """
    serializer_class = UnifiedLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(
            {
                "message": "Login realizado com sucesso.",
                "user_type": serializer.validated_data['profile_type'],
                "username": user.username
            },
            status=status.HTTP_200_OK
        )
