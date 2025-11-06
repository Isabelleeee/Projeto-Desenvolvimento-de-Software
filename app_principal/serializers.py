from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext_lazy as _
from .models import Trilha, Etapa, Categoria, Progresso

User = get_user_model()


# =====================================================
# 🔹 SERIALIZERS DE MODELOS
# =====================================================
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id", "nome"]


class EtapaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etapa
        fields = ["id", "titulo", "descricao", "ordem"]


class TrilhaSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    etapas = EtapaSerializer(many=True, read_only=True, source="etapa_set")

    class Meta:
        model = Trilha
        fields = ["id", "nome", "descricao", "categoria", "etapas"]


class ProgressoSerializer(serializers.ModelSerializer):
    trilha_nome = serializers.CharField(source="trilha.nome", read_only=True)
    etapa_titulo = serializers.CharField(source="etapa.titulo", read_only=True)

    class Meta:
        model = Progresso
        fields = [
            "id",
            "usuario",
            "trilha",
            "trilha_nome",
            "etapa",
            "etapa_titulo",
            "progresso",
            "concluido",
            "data_conclusao",
            "ultima_atualizacao",
        ]


# =====================================================
# 🔹 SERIALIZER DE LOGIN UNIFICADO
# =====================================================
PROFILE_CHOICES = [
    ("admin", "Administrador"),
    ("aluno", "Aluno"),
    ("estudante", "Estudante"),
    ("student", "Student"),
]


class UnifiedLoginSerializer(serializers.Serializer):
    username = serializers.CharField(label=_("Usuário"), write_only=True)
    password = serializers.CharField(
        label=_("Senha"), style={"input_type": "password"}, trim_whitespace=False, write_only=True
    )
    profile_type = serializers.ChoiceField(choices=PROFILE_CHOICES, write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        profile_type = data.get("profile_type")

        if not username or not password:
            raise serializers.ValidationError(_("Usuário e senha são obrigatórios."), code="authorization")

        user = authenticate(
            request=self.context.get("request"),
            username=username,
            password=password,
        )

        if not user:
            raise serializers.ValidationError(_("Credenciais inválidas."), code="authorization")

        # Validação por tipo de usuário
        if profile_type == "admin" and not user.is_staff:
            raise serializers.ValidationError(_("Sem permissão de administrador."), code="authorization")

        if profile_type in ["aluno", "estudante", "student"] and user.is_staff:
            raise serializers.ValidationError(_("Administradores não podem acessar a área do aluno."), code="authorization")

        data["user"] = user
        data["profile_type"] = profile_type
        return data
