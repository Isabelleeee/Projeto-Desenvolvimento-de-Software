from django.core.management.base import BaseCommand
from app_principal.models import Trilha, Etapa, Categoria

class Command(BaseCommand):
    help = "Popula o banco com trilhas pré-definidas (ex: Fundamentos do Desenvolvimento Web)"

    def handle(self, *args, **options):
        # Categoria
        categoria, _ = Categoria.objects.get_or_create(nome="Desenvolvimento Web")

        # Criação da trilha principal
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
            self.stdout.write(self.style.WARNING("⚠️ A trilha já existia, etapas serão atualizadas."))

        # Etapa 1
        etapa1_conteudo = """
✅ ETAPA 1 — Fundamentos da Web e Introdução ao Front-end

🎯 Objetivo da Etapa:
Aprender os conceitos básicos do desenvolvimento Front-end:
como a web funciona, o que o desenvolvedor front-end faz,
e a importância do HTML, CSS e JavaScript para construção de sites.

🌐 O que é a Web?
A Web é um conjunto de páginas acessadas por meio de navegadores.
Essas páginas são criadas com HTML + CSS + JavaScript e seguem o modelo cliente-servidor.

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
"""

        Etapa.objects.update_or_create(
            trilha=trilha,
            ordem=1,
            defaults={
                "titulo": "Fundamentos da Web e Introdução ao Front-end",
                "descricao": etapa1_conteudo.strip(),
                "duracao_estimada": 45,
            },
        )

        self.stdout.write(self.style.SUCCESS("✅ Trilha 'Fundamentos do Desenvolvimento Web' e Etapa 1 cadastradas com sucesso!"))
