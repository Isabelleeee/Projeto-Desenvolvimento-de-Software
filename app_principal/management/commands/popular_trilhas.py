from django.core.management.base import BaseCommand
from app_principal.models import Trilha, Etapa, Categoria


class Command(BaseCommand):
    help = "Popula o banco com trilhas pré-definidas (ex: Fundamentos do Desenvolvimento Web)"

    def handle(self, *args, **options):
        # Criar ou obter a categoria
        categoria, _ = Categoria.objects.get_or_create(nome="Desenvolvimento Web")

        # Criar a trilha
        trilha, created = Trilha.objects.get_or_create(
            titulo="Fundamentos do Desenvolvimento Web e Front-end",
            defaults={
                "descricao": "Aprenda os conceitos essenciais da Web, o papel do desenvolvedor Front-end e a tríade HTML, CSS e JavaScript.",
                "categoria": categoria,
                "tipo": "PRE",
                "duracao_estimada": 90,
            },
        )

        if not created:
            self.stdout.write(self.style.WARNING("⚠️ Trilha já existente, atualizando etapas..."))

        # ======================================================
        # ETAPA 1
        # ======================================================
        etapa1_conteudo = """
✅ ETAPA 1 — Fundamentos da Web e Introdução ao Front-end

🎯 Objetivo da Etapa:
Aprender os conceitos básicos do desenvolvimento Front-end: como a web funciona, o que o desenvolvedor front-end faz, e a importância do HTML, CSS e JavaScript para construção de sites.

🌐 O que é a Web?
A Web é um conjunto de páginas acessadas por meio de navegadores. Essas páginas são criadas com HTML + CSS + JavaScript e seguem o modelo cliente-servidor.

🎨 O que é Front-end?
É toda a parte visual e interativa de um site, responsável por transformar layouts em experiências reais.

👩‍💻 O que faz um Desenvolvedor Front-end?
✔ Estrutura o conteúdo (HTML)
✔ Cria o visual (CSS)
✔ Cria interações e lógica (JavaScript)
✔ Garante responsividade e acessibilidade

🧩 Tríade do Front-end:
- HTML: Estrutura e conteúdo da página
- CSS: Aparência visual e layout
- JavaScript: Interatividade e lógica

🛠️ Ferramentas:
VS Code, Navegador, Inspecionar Elemento, CodePen, W3Schools, FreeCodeCamp

💡 Conceitos importantes:
DOM, Responsividade, Acessibilidade, Boas práticas de código
""".strip()

        Etapa.objects.update_or_create(
            trilha=trilha,
            ordem=1,
            defaults={
                "titulo": "Fundamentos da Web e Introdução ao Front-end",
                "descricao": "Introdução ao desenvolvimento web e à função do desenvolvedor front-end.",
                "conteudo_texto": etapa1_conteudo,
                "video_url": "http://127.0.0.1:8000/media/Construindo_a_Web__Front-End.mp4",
                "duracao_estimada": 45,
            },
        )

        # ======================================================
        # ETAPA 2
        # ======================================================
        etapa2_conteudo = """
✅ ETAPA 2 — Introdução ao HTML

🎯 Objetivo:
Compreender a estrutura fundamental de uma página web e aprender como o HTML organiza o conteúdo que o navegador exibe.

📘 Resumo:
A construção de qualquer site começa com o HTML — HyperText Markup Language.
Ela estrutura as informações da página (textos, imagens, botões, links, tabelas) e indica ao navegador o que cada elemento representa.

📄 Estrutura básica:
<!DOCTYPE html>
<html>
  <head>
    <title>Meu Primeiro Site</title>
  </head>
  <body>
    <h1>Olá, mundo!</h1>
    <p>Bem-vindo ao meu site.</p>
  </body>
</html>

💡 Dica:
Experimente editar o HTML no CodePen ou VSCode para entender como o navegador interpreta cada tag.
""".strip()

        Etapa.objects.update_or_create(
            trilha=trilha,
            ordem=2,
            defaults={
                "titulo": "Introdução ao HTML",
                "descricao": "Aprenda a base do HTML, a linguagem que estrutura todo o conteúdo da web.",
                "conteudo_texto": etapa2_conteudo,
                "video_url": "http://127.0.0.1:8000/media/html_basico.mp4",  # opcional
                "duracao_estimada": 60,
            },
        )

        self.stdout.write(
            self.style.SUCCESS("✅ Trilha 'Fundamentos do Desenvolvimento Web' e suas etapas foram populadas com sucesso!")
        )
