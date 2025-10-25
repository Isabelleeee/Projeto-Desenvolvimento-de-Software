from .models import Trilha, Categoria
from rest_framework import serializers
from django.contrib.auth import authenticate

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['nome']

class TrilhaSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer() # Para mostrar o nome da categoria, não o ID

    class Meta:
        model = Trilha
        fields = ['id', 'titulo', 'descricao', 'categoria', 'duracao_estimada']

class LoginSerializer(serializers.Serializer):
    """
    Serializer para validar o login do Admin.
    """
    username = serializers.CharField()
    password = serializers.CharField(write_only=True) # write_only=True esconde a senha

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            #Tenta autenticar o usuário com o Django
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)

            #Verifica se o usuário é válido E se é um Admin
            if not user:
                raise serializers.ValidationError("Credenciais inválidas.")

            if not user.is_staff: # is_staff ou is_superuser
                raise serializers.ValidationError("Este usuário não tem permissão de administrador.")

        else:
            raise serializers.ValidationError("Usuário e senha são obrigatórios.")

        # anexa o usuário aos dados
        data['user'] = user
        return data