from rest_framework import serializers
from app_principal.models import Trilha, Etapa

class EtapaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etapa
        fields = ['id', 'titulo', 'descricao', 'ordem']

class TrilhaComProgressoSerializer(serializers.ModelSerializer):
    etapas = EtapaSerializer(many=True, read_only=True)
    progresso = serializers.SerializerMethodField()

    class Meta:
        model = Trilha
        fields = ['id', 'nome', 'descricao', 'progresso', 'etapas']

    def get_progresso(self, obj):
        user = self.context['request'].user
        inscricao = user.inscricoes.filter(trilha=obj).first()
        return inscricao.progresso if inscricao else 0.0
