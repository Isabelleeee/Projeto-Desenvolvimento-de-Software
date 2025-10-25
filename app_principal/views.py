#from django.shortcuts import render
from rest_framework import generics
from .models import Trilha
from .serializers import TrilhaSerializer

class TrilhaListAPIView(generics.ListAPIView):
    queryset = Trilha.objects.all()
    serializer_class = TrilhaSerializer
