from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse
from django.contrib.auth import get_user_model

class LoginUnificadoViewTest(TestCase):
    def setUp(self):
        """Cria dois usuários: um admin e um estudante"""
        self.client = Client()
        self.url = reverse('login_unificado')

        # Admin
        self.admin_user = User.objects.create_user(
            username='admin_teste',
            email='admin@teste.com',
            password='senha123',
            is_staff=True
        )

        # Estudante
        self.estudante_user = User.objects.create_user(
            username='aluno_teste',
            email='aluno@teste.com',
            password='senha123',
            is_staff=False
        )

    def test_login_admin_redireciona_para_admin(self):
        """Admin deve ser redirecionado para o painel Django"""
        response = self.client.post(self.url, {
            'username': 'admin_teste',
            'password': 'senha123',
            'profile_type': 'admin'
        })
        self.assertEqual(response.status_code, 302)
        self.assertTrue(response['Location'].startswith('/admin/'))

    def test_login_estudante_redireciona_para_area_estudante(self):
        """Estudante deve ser redirecionado para a área do estudante"""
        response = self.client.post(self.url, {
            'username': 'aluno_teste',
            'password': 'senha123',
            'profile_type': 'estudante'
        })
        self.assertEqual(response.status_code, 302)
        self.assertIn('http://localhost:3000', response['Location'])


    def test_login_com_credenciais_invalidas(self):
        """Deve exibir erro para credenciais inválidas"""
        response = self.client.post(self.url, {
            'username': 'nao_existe',
            'password': 'errada',
            'profile_type': 'estudante'
        })
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Credenciais inválidas")

    def test_login_admin_com_tipo_estudante(self):
        """Admin tentando logar como estudante deve dar erro"""
        response = self.client.post(self.url, {
            'username': 'admin_teste',
            'password': 'senha123',
            'profile_type': 'estudante'
        })
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "não podem acessar o portal do estudante")

    def test_login_estudante_com_tipo_admin(self):
        """Estudante tentando logar como admin deve dar erro"""
        response = self.client.post(self.url, {
            'username': 'aluno_teste',
            'password': 'senha123',
            'profile_type': 'admin'
        })
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "não tem permissão de Administrador")

class LogoutUnificadoTest(TestCase):
    """Testa se o logout redireciona corretamente para o login unificado"""

    def setUp(self):
        self.client = Client()
        self.user_model = get_user_model()
        self.user = self.user_model.objects.create_user(
            username='usuario_teste_logout',
            password='senha123',
            is_staff=False
        )

    def test_logout_redireciona_para_login_unificado(self):
        """Após logout, o usuário deve ser redirecionado para /login-unificado/"""
        # Realiza login
        self.client.login(username='usuario_teste_logout', password='senha123')

        # Faz logout
        response = self.client.get('/logout/', follow=False)

        # Verifica o redirecionamento
        self.assertEqual(response.status_code, 302)
        self.assertIn('/login-unificado/', response['Location'])
