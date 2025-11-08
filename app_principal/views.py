# app_principal/views.py
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status, permissions, generics
from rest_framework.authtoken.models import Token
from django.conf import settings
from .models import Trilha, Etapa
from .serializers import TrilhaSerializer, EtapaSerializer
import os

# ==========================================================
# 🔐 LOGIN UNIFICADO (ADMIN + ESTUDANTE)
# ==========================================================
class LoginUnificadoView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username_or_email = request.data.get("username")
        password = request.data.get("password")

        try:
            user_obj = User.objects.get(email=username_or_email)
            username = user_obj.username
        except User.DoesNotExist:
            username = username_or_email

        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {"mensagem": "Usuário ou senha inválidos."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_active:
            return Response(
                {"mensagem": "Conta inativa. Contate o suporte."},
                status=status.HTTP_403_FORBIDDEN,
            )

        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)

        if user.is_staff or user.is_superuser:
            tipo = "admin"
            redirect_url = os.getenv("ADMIN_URL", "http://localhost:3002/")
        else:
            tipo = "estudante"
            redirect_url = os.getenv("ALUNO_URL", "http://localhost:3001/")

        return Response(
            {
                "mensagem": "Login realizado com sucesso!",
                "usuario": user.username,
                "tipo": tipo,
                "token": token.key,
                "redirect": redirect_url,
            },
            status=status.HTTP_200_OK,
        )


# ==========================================================
# 🚪 LOGOUT
# ==========================================================
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"mensagem": "Logout realizado com sucesso."}, status=200)


# ==========================================================
# 🧠 CADASTRO (ALUNO E ADMIN)
# ==========================================================
class CadastroView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        phone = request.data.get("phone", "")
        is_staff = request.data.get("is_staff", False)

        if not username or not email or not password:
            return Response(
                {"error": "Preencha todos os campos obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Nome de usuário já cadastrado."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "E-mail já cadastrado."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create_user(username=username, email=email, password=password)
        user.is_staff = bool(is_staff)
        user.save()

        tipo = "admin" if user.is_staff else "estudante"

        return Response(
            {
                "message": "Usuário cadastrado com sucesso!",
                "usuario": user.username,
                "tipo": tipo,
                "is_staff": user.is_staff,
            },
            status=status.HTTP_201_CREATED,
        )


# ==========================================================
# 👤 PERFIL DO USUÁRIO
# ==========================================================
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(
            {
                "username": user.username,
                "email": user.email,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
            },
            status=200,
        )


# ==========================================================
# 🧩 TRILHAS — LISTAGEM (PÚBLICA)
# ==========================================================
class TrilhaListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        trilhas = Trilha.objects.all().prefetch_related("etapas", "categoria")
        serializer = TrilhaSerializer(trilhas, many=True)
        return Response(serializer.data, status=200)


# ==========================================================
# ✏️ CRUD DE TRILHAS (ADMIN)
# ==========================================================
class TrilhaDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    Permite visualizar, atualizar ou excluir uma trilha específica.
    """
    queryset = Trilha.objects.all().prefetch_related("etapas", "categoria")
    serializer_class = TrilhaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        # apenas admin pode editar
        if not request.user.is_staff and not request.user.is_superuser:
            return Response({"erro": "Apenas administradores podem editar trilhas."},
                            status=status.HTTP_403_FORBIDDEN)
        return super().put(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        # apenas admin pode excluir
        if not request.user.is_staff and not request.user.is_superuser:
            return Response({"erro": "Apenas administradores podem excluir trilhas."},
                            status=status.HTTP_403_FORBIDDEN)
        return super().delete(request, *args, **kwargs)


# ==========================================================
# 🚀 CRIAR TRILHA (ADMIN)
# ==========================================================
class CriarTrilhaAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_staff:
            return Response({"erro": "Apenas administradores podem criar trilhas."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = TrilhaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ==========================================================
# 🧭 INICIAR TRILHA (ESTUDANTE)
# ==========================================================
class IniciarTrilhaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        trilha_id = request.data.get("trilha_id")
        try:
            trilha = Trilha.objects.get(id=trilha_id)
        except Trilha.DoesNotExist:
            return Response({"error": "Trilha não encontrada."}, status=404)
        return Response({"mensagem": f"Trilha '{trilha.titulo}' iniciada com sucesso!"})


# ==========================================================
# 🧩 MEU PROGRESSO (EXEMPLO)
# ==========================================================
class MeuProgressoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        etapas = Etapa.objects.filter(usuario=request.user)
        serializer = EtapaSerializer(etapas, many=True)
        return Response(serializer.data, status=200)


# ==========================================================
# 🔁 REDIRECIONAMENTOS
# ==========================================================
def redirect_admin(request):
    return redirect(settings.FRONTEND_ADMIN_URL)

def redirect_estudante(request):
    return redirect(settings.FRONTEND_ESTUDANTE_URL)


# ==========================================================
# 🧪 TESTE DE AUTENTICAÇÃO
# ==========================================================
class TestAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            {
                "mensagem": f"Usuário autenticado: {request.user.username}",
                "is_staff": request.user.is_staff,
                "is_superuser": request.user.is_superuser,
            }
        )
