from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from .models import Estudante
from django.urls import reverse

class EstudanteModelTest(TestCase):
    def test_criacao_estudante(self):
        estudante = Estudante.objects.create(
            nome='Sophia Betoni',
            email='sophiabetoni@outlook.com'
        )
        self.assertEqual(estudante.nome, 'Sophia Betoni')
        self.assertEqual(estudante.email, 'sophiabetoni@outlook.com')
        self.assertEqual(str(estudante), 'Sophia Betoni')


class EstudanteViewTest(TestCase):
    def test_index_retorna_200(self):
        url = reverse('index')  # nome definido em urls.py
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Área do Estudante - EstudaIA")