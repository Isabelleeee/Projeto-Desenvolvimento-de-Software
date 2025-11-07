import requests

# URL da sua rota Django
url = "http://127.0.0.1:8000/estudante/gerar-trilha/"

# Tema de exemplo para gerar uma trilha
dados = {"tema": "engenharia da computação"}

# Envia a requisição POST para o backend
resposta = requests.post(url, json=dados)

# Exibe o código de status e o conteúdo da resposta
print("Status:", resposta.status_code)
print("Resposta da IA:", resposta.json())
