from django.test import TestCase

# Create your tests here.
from django.test import TestCase

class TesteBasico(TestCase):
    def test_soma_funciona(self):
        resultado = 2 + 3
        self.assertEqual(resultado, 5)
