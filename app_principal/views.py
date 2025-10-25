from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login
from .models import Trilha
from .serializers import TrilhaSerializer, LoginSerializer

class TrilhaListAPIView(generics.ListAPIView):
    """
    API para listar todas as trilhas disponíveis.
    """
    queryset = Trilha.objects.all() # Busca todas as trilhas
    serializer_class = TrilhaSerializer

class AdminLoginAPIView(APIView):
    """
    API para o login de Administradores.
    """
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        # Passa os dados recebidos (request.data) para o serializer
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(
            {
                "message": "Login de administrador realizado com sucesso.",
                "user_type": "admin"
            },
            status=status.HTTP_200_OK
        )
