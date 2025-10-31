'''
from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


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
        return data'''
# em app_principal/serializers.py
from .models import Trilha, Categoria
from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['nome']

class TrilhaSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer() # Para mostrar o nome da categoria, não o ID

    class Meta:
        model = Trilha
        fields = ['id', 'titulo', 'descricao', 'categoria', 'duracao_estimada']

# --- NOVO SERIALIZER DE LOGIN UNIFICADO ---

class UnifiedLoginSerializer(serializers.Serializer):
    """
    Valida o login tanto para Alunos quanto para Admins.
    """
    username = serializers.CharField(
        label=_("Username"),
        write_only=True
    )
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},  # Ajuda o DRF a renderizar como senha
        trim_whitespace=False,
        write_only=True
    )
    # O front-end deve enviar 'aluno' ou 'admin'
    profile_type = serializers.ChoiceField(
        choices=['aluno', 'admin'],
        write_only=True
    )

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        profile_type = data.get('profile_type')

        if not username or not password:
            raise serializers.ValidationError(
                _("Usuário e senha são obrigatórios."),
                code='authorization'
            )

        # 1. Autenticação (Placeholder):
        # A função processar_login() que você descreveu está aqui.
        user = authenticate(request=self.context.get('request'),
                            username=username, password=password)

        if not user:
            raise serializers.ValidationError(
                _("Credenciais inválidas. Verifique o usuário e a senha."),
                code='authorization'
            )

        # 2. Verificação de Perfil:
        if profile_type == 'admin':
            if not user.is_staff:  # Verifica se é Admin
                raise serializers.ValidationError(
                    _("Este usuário não tem permissão de Administrador."),
                    code='authorization'
                )
            # Placeholder para a função do Admin
            self.abrir_painel_admin()

        elif profile_type == 'aluno':
            if user.is_staff:  # Admins não devem logar como alunos
                raise serializers.ValidationError(
                    _("Contas de administrador não podem acessar o portal do aluno."),
                    code='authorization'
                )
            # Placeholder para a função do Aluno
            self.abrir_portal_aluno()

        # Se tudo estiver OK, retorna os dados do usuário
        data['user'] = user
        return data

    # --- Funções de Placeholder (como solicitado) ---

    def abrir_portal_aluno(self):
        """
        Placeholder: Esta função seria chamada se o login do aluno
        fosse bem-sucedido. Em um sistema real, poderíamos gerar um Token JWT aqui.
        """
        print('Abrindo portal do aluno...')

    def abrir_painel_admin(self):
        """
        Placeholder: Esta função seria chamada se o login do admin
        fosse bem-sucedido. Em um sistema real, poderíamos gerar um Token JWT
        ou confirmar a sessão.
        """
        print('Abrindo painel do administrador...')