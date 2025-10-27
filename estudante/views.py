from django.shortcuts import render
from django.http import JsonResponse
from estudante.areaback import minha_funcao

def minha_view(request):
    resultado = minha_funcao()
    return JsonResponse({'resultado': resultado})
