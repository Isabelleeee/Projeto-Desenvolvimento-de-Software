# --- Imports Necessários ---
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

# --- Importa os Modelos ---
from .models import Trilha, Categoria

# --- Obtém o Modelo de Usuário ---
User = get_user_model()

# --- Suíte de Testes Unitários para Modelos ---
class TrilhaModelTest(TestCase):

    def test_trilha_str_representation(self):
        """ Testa se a representação em string do modelo Trilha é o seu título. """
        categoria_teste = Categoria.objects.create(nome="Teste Categoria")
        trilha = Trilha.objects.create(titulo="Minha Trilha de Teste", categoria=categoria_teste)
        self.assertEqual(str(trilha), trilha.titulo)

    def test_trilha_default_values(self):
        """ Testa se os valores padrão da Trilha são aplicados na criação. """
        trilha = Trilha.objects.create(titulo="Trilha com Valores Padrão")
        self.assertEqual(trilha.tipo, 'PRE')
        self.assertIsNotNone(trilha.data_criacao)

# --- Suíte de Testes de Integração para a API de Listagem ---
class TrilhaAPITest(APITestCase):

    def test_listagem_de_trilhas(self):
        """ Testa se a API de listagem de trilhas está funcionando corretamente. """
        trilha_de_teste = Trilha.objects.create(titulo="Trilha de Integração")
        url = reverse('lista_trilhas') # Usa o nome da URL
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, trilha_de_teste.titulo)

# --- Suíte de Testes de Integração para a API de Login do Admin ---
class AdminLoginAPITest(APITestCase):

    def setUp(self):
        """ Cria os usuários de teste antes de cada teste. """
        self.admin_user = User.objects.create_superuser(
            username='admin_test',
            password='password123',
            email='admin@test.com'
        )
        self.normal_user = User.objects.create_user(
            username='aluno_test',
            password='password123',
            email='aluno@test.com'
        )
        self.login_url = reverse('admin_login')

    def test_admin_login_success(self):
        """ Testa o login bem-sucedido de um administrador. """
        data = {'username': 'admin_test', 'password': 'password123'}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('user_type'), 'admin')

    def test_admin_login_invalid_password(self):
        """ Testa o login com senha incorreta para o administrador. """
        data = {'username': 'admin_test', 'password': 'wrongpassword'}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Credenciais inválidas.', response.data.get('non_field_errors', []))

    def test_admin_login_non_admin_user(self):
        """ Testa a tentativa de login com um usuário que não é administrador. """
        data = {'username': 'aluno_test', 'password': 'password123'}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Este usuário não tem permissão de administrador.', response.data.get('non_field_errors', []))