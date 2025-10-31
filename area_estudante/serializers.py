# area_estudante/serializers.py
from rest_framework import serializers
from app_principal.models import Trilha, Etapa
from .models import ProgressoEtapa

class EtapaProgressoSerializer(serializers.ModelSerializer):
    """ Serializer simplificado para Etapa, focado no progresso """
    class Meta:
        model = Etapa
        fields = ['id', 'titulo', 'ordem']

class ProgressoEtapaSerializer(serializers.ModelSerializer):
    """ Serializer para o registro de progresso """
    etapa = EtapaProgressoSerializer(read_only=True)

    class Meta:
        model = ProgressoEtapa
        fields = ['etapa', 'data_conclusao']

class TrilhaComProgressoSerializer(serializers.ModelSerializer):
    """
    Serializer principal para a Trilha, incluindo o progresso do aluno.
    """
    progress = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    totalSteps = serializers.SerializerMethodField()
    completedSteps = serializers.SerializerMethodField()
    # Renomeia 'titulo' para 'name' para combinar com o front-end Progress.tsx
    name = serializers.CharField(source='titulo')


    class Meta:
        model = Trilha
        fields = [
            'id',
            'name', # Campo renomeado
            'progress',
            'status',
            'totalSteps',
            'completedSteps',
        ]

    def get_totalSteps(self, obj):
        """ Calcula o número total de etapas na trilha """
        return obj.etapas.count()

    def get_completedSteps(self, obj):
        """ Calcula quantas etapas desta trilha o usuário atual concluiu """
        usuario = self.context.get('request').user
        if not usuario or not usuario.is_authenticated:
            return 0
        return ProgressoEtapa.objects.filter(
            usuario=usuario,
            etapa__trilha=obj
        ).count()

    def get_progress(self, obj):
        """ Calcula o percentual de progresso """
        total_etapas = self.get_totalSteps(obj)
        if total_etapas == 0: return 0.0
        etapas_completas = self.get_completedSteps(obj)
        progresso = (etapas_completas / total_etapas) * 100
        return round(progresso, 2)

    def get_status(self, obj):
        """ Define o status como 'Concluída' ou 'Em andamento' """
        progresso = self.get_progress(obj)
        return "Concluída" if progresso >= 100 else "Em andamento"

class EtapaProgressoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etapa
        fields = ['id', 'titulo', 'ordem']

class ProgressoEtapaSerializer(serializers.ModelSerializer):
    etapa = EtapaProgressoSerializer(read_only=True)

    class Meta:
        model = ProgressoEtapa
        fields = ['etapa', 'data_conclusao']

class TrilhaComProgressoSerializer(serializers.ModelSerializer):
    progress = serializers.SerializerMethodField()
    status = serializers
