# app_principal/views_ia.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authentication import TokenAuthentication
from django.conf import settings
import google.generativeai as genai
import json

class GerarTrilhaIAView(APIView):
    """
    Endpoint para gerar trilhas de aprendizado usando a API do Google Gemini.
    ✅ Compatível com chaves antigas e novas
    ✅ Usa gemini-pro (modelo estável)
    ✅ Retorna JSON válido para o front
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt", "").strip()

        if not prompt:
            return Response({"error": "Nenhum prompt fornecido."}, status=400)

        try:
            # 🔑 Configura a API Gemini com sua chave do .env
            genai.configure(api_key=settings.GEMINI_API_KEY)

            # ⚙️ Usa o modelo mais estável e universal
            model = genai.GenerativeModel("gemini-pro")

            # 💬 Cria o prompt que orienta a IA
            resposta = model.generate_content(
                f"""
                Monte uma trilha de aprendizado baseada neste objetivo: {prompt}.
                Responda **apenas em JSON puro** no formato:
                {{
                    "titulo": "Título da trilha",
                    "descricao": "Breve resumo da trilha",
                    "etapas": [
                        {{"ordem": 1, "titulo": "Etapa 1", "descricao": "Descrição da etapa 1"}},
                        {{"ordem": 2, "titulo": "Etapa 2", "descricao": "Descrição da etapa 2"}}
                    ]
                }}
                """
            )

            # 🧩 Limpa o texto e tenta interpretar como JSON
            conteudo = resposta.text.strip()
            conteudo = conteudo.replace("```json", "").replace("```", "").strip()

            try:
                data = json.loads(conteudo)
            except json.JSONDecodeError:
                print("⚠️ Resposta não era JSON puro:", conteudo)
                return Response(
                    {"error": "A IA não retornou um JSON válido. Tente novamente."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            # ✅ Sucesso
            print("✅ Trilha gerada com sucesso pela IA!")
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            print("❌ Erro na IA:", str(e))
            return Response(
                {"error": f"Falha ao gerar trilha com IA: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
