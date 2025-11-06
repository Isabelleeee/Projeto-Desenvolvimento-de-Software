from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from .models import Estudante

class EstudanteModelTest(TestCase):
    def test_criacao_estudante(self):
        estudante = Estudante.objects.create(
            nome='Sophia Betoni',
            email='sophiabetoni@outlook.com'
        )
        self.assertEqual(estudante.nome, 'Sophia Betoni')
        self.assertEqual(estudante.email, 'sophiabetoni@outlook.com')
        self.assertEqual(str(estudante), 'Sophia Betoni')
