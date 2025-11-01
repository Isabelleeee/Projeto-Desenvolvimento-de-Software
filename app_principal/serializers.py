from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext_lazy as _
from .models import Trilha, Categoria

User = get_user_model()


# =====================================================
# 🔹 SERIALIZERS DE MODELOS (TRILHA / CATEGORIA)
# =====================================================
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['nome']


class TrilhaSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()  # mostra o nome da categoria

    class Meta:
        model = Trilha
        fields = ['id', 'titulo', 'descricao', 'categoria', 'duracao_estimada']


# =====================================================
# 🔹 SERIALIZER DE LOGIN UNIFICADO
# =====================================================
PROFILE_CHOICES = [
    ('admin', 'Administrador'),
    ('aluno', 'Aluno'),
    ('estudante', 'Estudante'),
    ('student', 'Student'),
]

class UnifiedLoginSerializer(serializers.Serializer):
    username = serializers.CharField(label=_("Usuário"), write_only=True)
    password = serializers.CharField(
        label=_("Senha"),
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )
    profile_type = serializers.ChoiceField(choices=PROFILE_CHOICES, write_only=True)


    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        profile_type = data.get('profile_type')

        # Verificação básica
        if not username or not password:
            raise serializers.ValidationError(
                _("Usuário e senha são obrigatórios."),
                code='authorization'
            )

        # Autenticação no Django
        user = authenticate(
            request=self.context.get('request'),
            username=username,
            password=password
        )

        if not user:
            raise serializers.ValidationError(
                _("Credenciais inválidas. Verifique o usuário e a senha."),
                code='authorization'
            )

        # Regras de permissão
        if profile_type == 'admin':
            if not user.is_staff:
                raise serializers.ValidationError(
                    _("Este usuário não tem permissão de Administrador."),
                    code='authorization'
                )
            self.abrir_painel_admin()

        elif profile_type in ['aluno', 'estudante', 'student']:
            if user.is_staff:
                raise serializers.ValidationError(
                    _("Contas de administrador não podem acessar o portal do aluno."),
                    code='authorization'
                )
            self.abrir_portal_aluno()

        data['user'] = user
        data['profile_type'] = profile_type  # mantém o tipo no retorno
        return data

    # =====================================================
    # 🔹 Placeholders (para logs / rastreabilidade)
    # =====================================================
    def abrir_portal_aluno(self):
        print('Login aluno/estudante autorizado.')

    def abrir_painel_admin(self):
        print('Login admin autorizado.')
