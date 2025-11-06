# app_principal/views.py
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from .models import Trilha, Etapa
from django.conf import settings
from .serializers import TrilhaSerializer, EtapaSerializer
import os

# --------------------- LOGIN / LOGOUT ---------------------
class LoginUnificadoView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

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

        # Login Django (sessão)
        login(request, user)

        # Gera token DRF
        token, _ = Token.objects.get_or_create(user=user)

        # Determina tipo de usuário e URL de redirecionamento
        if user.is_superuser or user.is_staff:
            tipo = "admin"
            redirect_url = getattr(settings, "FRONTEND_ADMIN_URL", "http://localhost:3002/")
        else:
            tipo = "estudante"
            redirect_url = getattr(settings, "FRONTEND_ESTUDANTE_URL", "http://localhost:3001/")

        # Retorno padronizado para o front
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


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response(
            {"mensagem": "Logout realizado com sucesso."},
            status=status.HTTP_200_OK
        )


# --------------------- CADASTRO ---------------------
class CadastroView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response({"error": "Preencha todos os campos."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Nome de usuário já cadastrado."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "E-mail já cadastrado."}, status=status.HTTP_400_BAD_REQUEST)

        # Cria o novo usuário
        user = User.objects.create_user(username=username, email=email, password=password)

        # Retorna mensagem de sucesso
        return Response(
            {"message": "Usuário cadastrado com sucesso!", "usuario": user.username},
            status=status.HTTP_201_CREATED
        )


# --------------------- TRILHAS ---------------------
class TrilhaListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        trilhas = Trilha.objects.all()
        serializer = TrilhaSerializer(trilhas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CriarTrilhaAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TrilhaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IniciarTrilhaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        trilha_id = request.data.get("trilha_id")
        try:
            trilha = Trilha.objects.get(id=trilha_id)
        except Trilha.DoesNotExist:
            return Response({"error": "Trilha não encontrada."},
                            status=status.HTTP_404_NOT_FOUND)
        return Response({"mensagem": f"Trilha '{trilha.nome}' iniciada com sucesso!"})


class MeuProgressoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        etapas = Etapa.objects.filter(usuario=request.user)
        serializer = EtapaSerializer(etapas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# --------------------- REDIRECIONAMENTOS ---------------------
def redirect_admin(request):
    """Redireciona para o painel admin React"""
    return redirect(settings.FRONTEND_ADMIN_URL)


def redirect_estudante(request):
    """Redireciona para o painel estudante React"""
    return redirect(settings.FRONTEND_ESTUDANTE_URL)


# --------------------- TESTE DE AUTENTICAÇÃO ---------------------
class TestAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "mensagem": f"Usuário autenticado: {request.user.username}",
            "is_staff": request.user.is_staff,
            "is_superuser": request.user.is_superuser,
        })
