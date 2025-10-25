from rest_framework import serializers
from .models import Trilha, Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['nome']

class TrilhaSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer() # Para mostrar o nome da categoria, não o ID

    class Meta:
        model = Trilha
        fields = ['id', 'titulo', 'descricao', 'categoria', 'duracao_estimada']