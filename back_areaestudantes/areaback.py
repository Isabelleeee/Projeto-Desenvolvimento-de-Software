import uuid
from datetime import datetime

# --- Classes de Modelo de Dados ---

class EtapaAprendizagem:
    """
    Representa uma única etapa, módulo ou aula dentro de uma Trilha.
    Esta é a unidade básica de progresso do aluno.
    """
    def __init__(self, titulo, descricao):
        self.id = str(uuid.uuid4())
        self.titulo = titulo
        self.descricao = descricao
        self.concluida = False # Estado inicial: não concluída

    # Função simplificada: 'concluir'
    def concluir(self):
        """Marca a etapa como concluída."""
        self.concluida = True
        return True

    def __str__(self):
        """Representação em string da etapa, indicando o status."""
        status = "[CONCLUÍDA]" if self.concluida else "[PENDENTE]"
        return f"{status} {self.titulo}: {self.descricao[:50]}..."

class TrilhaAprendizagem:
    """
    Representa uma trilha de estudo completa, contendo várias etapas.
    Pode ser pré-definida ou personalizada via LLM.
    """
    def __init__(self, nome, area, tipo="Pré-definida", etapas=None):
        self.id = str(uuid.uuid4())
        self.nome = nome
        self.area = area
        # Ex: "Pré-definida" ou "Personalizada (LLM)"
        self.tipo = tipo 
        self.etapas = etapas if etapas is not None else []

    # Função simplificada: 'add_etapa'
    def add_etapa(self, etapa):
        """Adiciona uma nova Etapa à lista de etapas da trilha."""
        if isinstance(etapa, EtapaAprendizagem):
            self.etapas.append(etapa)

    # Função simplificada: 'ver_progresso'
    def ver_progresso(self):
        """Calcula a porcentagem de conclusão da trilha, baseado nas etapas concluídas."""
        if not self.etapas:
            return 0.0
        
        # Conta quantas etapas têm 'concluida = True'
        etapas_concluidas = sum(1 for etapa in self.etapas if etapa.concluida)
        progresso = (etapas_concluidas / len(self.etapas)) * 100
        return round(progresso, 2)

    def __str__(self):
        """Representação em string da trilha com seu progresso atual."""
        progresso = self.ver_progresso()
        return f"[{self.tipo}] Trilha: {self.nome} (Área: {self.area}) - Progresso: {progresso}%"

class Estudante:
    """
    Representa o estudante e seus dados centrais no sistema.
    Esta classe define a "Área do Estudante" em termos de dados e ações.
    """
    def __init__(self, nome, email, senha):
        self.id = str(uuid.uuid4())
        self.nome = nome
        self.email = email
        # Em um sistema real, a senha seria hasheada!
        self._senha = senha 
        self.trilhas_inscritas = [] # Lista de objetos TrilhaAprendizagem
        self.data_cadastro = datetime.now()

    def inscrever_trilha(self, trilha):
        """Adiciona uma trilha à lista de trilhas que o estudante está cursando."""
        if isinstance(trilha, TrilhaAprendizagem):
            self.trilhas_inscritas.append(trilha)
            print(f"Estudante {self.nome} inscrito na trilha: {trilha.nome}")

    def progresso_geral(self):
        """Calcula a média de progresso em TODAS as trilhas inscritas."""
        if not self.trilhas_inscritas:
            return 0.0

        soma_progressos = sum(t.ver_progresso() for t in self.trilhas_inscritas)
        progresso = soma_progressos / len(self.trilhas_inscritas)
        return round(progresso, 2)

    def perfil(self):
        """Retorna os dados detalhados do perfil do estudante."""
        return {
            "ID": self.id,
            "Nome": self.nome,
            "Email": self.email,
            "Membro Desde": self.data_cadastro.strftime("%Y-%m-%d"),
            "Trilhas Inscritas": len(self.trilhas_inscritas),
            "Progresso Geral": f"{self.progresso_geral()}%"
        }

    def __str__(self):
        return f"Estudante: {self.nome} | Email: {self.email} | Trilhas: {len(self.trilhas_inscritas)}"

# --- Sistema Principal (Simulação do Backend do EstudaAI) ---

class EstudaAISistema:
    """
    Simula o backend do EstudaAI, gerenciando o estado global (dados).
    Responsável por funcionalidades como Cadastro e Login.
    """
    def __init__(self):
        self.estudantes = {} # Dicionário de estudantes (chave: ID)
        self.trilhas_disponiveis = {} # Dicionário de trilhas globais (chave: ID)

    def cadastrar_estudante(self, nome, email, senha):
        """Cria um novo objeto Estudante e o armazena no sistema."""
        if email in [e.email for e in self.estudantes.values()]:
             return None, "Email já cadastrado."
        
        novo_estudante = Estudante(nome, email, senha)
        self.estudantes[novo_estudante.id] = novo_estudante
        print(f"\n[SISTEMA] Novo estudante cadastrado: {nome}")
        return novo_estudante, "Cadastro realizado com sucesso."

    def add_trilha_disponivel(self, trilha):
        #Adiciona uma trilha que pode ser escolhida pelos alunos
        self.trilhas_disponiveis[trilha.id] = trilha
    
    def login(self, email, senha):
        #Simula o processo de login: busca o estudante pelo email e verifica a senha
        for estudante in self.estudantes.values():
            if estudante.email == email and estudante._senha == senha:
                return estudante # Retorna o objeto Estudante logado
        return None

# --- Simulação de Uso (Main) ---

def main():
    """
    A função principal que demonstra o uso das classes e simula a navegação
    na "Área do Estudante" após o login.
    """
    print("BEM-VINDO AO EstudaAI")
    sistema = EstudaAISistema()

    # 1 - Criação de Trilhas e Etapas
    
    trilha_backend = TrilhaAprendizagem("Desenvolvimento Backend com Python", "Programação", "Pré-definida")
    etapa_setup = EtapaAprendizagem("Setup do Ambiente", "Instalação do Python, VSCode e Git.")
    etapa_flask = EtapaAprendizagem("Introdução ao Flask", "Criando a primeira API simples.")
    etapa_db = EtapaAprendizagem("Bancos de Dados com SQLAlchemy", "Mapeamento Objeto-Relacional.")

    trilha_backend.add_etapa(etapa_setup)
    trilha_backend.add_etapa(etapa_flask)
    trilha_backend.add_etapa(etapa_db)
    sistema.add_trilha_disponivel(trilha_backend)

    # + Trilha de aprendizagem personalizada 
    trilha_llm = TrilhaAprendizagem("Fundamentos de UI/UX", "Design", "Personalizada (LLM)")
    trilha_llm.add_etapa(EtapaAprendizagem("Pesquisa de Usuário", "Técnicas de entrevistas e personas."))
    trilha_llm.add_etapa(EtapaAprendizagem("Wireframing e Prototipagem", "Desenho de baixa e alta fidelidade."))
    sistema.add_trilha_disponivel(trilha_llm)


    # 2. Cadastro e Login
    aluno, msg = sistema.cadastrar_estudante("Sophia Betoni", "sophia@mackenzista.com.br", "123456")
    aluno_logado = sistema.login("sophia@mackenzista.com.br", "123456")

    if not aluno_logado:
        print("\n[ERRO] Falha no login. Encerrando simulação.")
        return

    print(f"\n[LOGIN SUCESSO] Bem-vindo, {aluno_logado.nome}!")

    # 3. Inscrição em Trilhas (O aluno escolhe/cria suas trilhas)
    aluno_logado.inscrever_trilha(trilha_backend)
    aluno_logado.inscrever_trilha(trilha_llm)

    print("\n--- 1. ACESSAR PERFIL ---")
    # Chama a função para exibir os dados do perfil do aluno
    perfil = aluno_logado.perfil()
    for chave, valor in perfil.items():
        print(f"| {chave}: {valor}")

    # 4. Simulação de Progresso (O aluno conclui etapas)
    print("\n--- 2. INTERAGINDO E MARCANDO PROGRESSO ---")
    
    # João conclui a primeira e segunda etapa de Backend
    print(f"-> Marcando progresso na trilha: '{trilha_backend.nome}'")
    etapa_setup.concluir() 
    etapa_flask.concluir() 
    
    # João conclui a primeira etapa de UI/UX
    print(f"-> Marcando progresso na trilha: '{trilha_llm.nome}'")
    trilha_llm.etapas[0].concluir() 

    # 5. Visualização (Simulação da Tela Principal da Área do Estudante)
    
    print("\n--- 3. VER PROGRESSO E TRILHAS ---")
    
    # Exibe o progresso médio em todas as trilhas
    print(f"Progresso Geral do Estudante: {aluno_logado.progresso_geral()}%")
    print("\n[LISTA DE SUAS TRILHAS DE APRENDIZADO]:")

    for i, trilha in enumerate(aluno_logado.trilhas_inscritas):
        # Exibe o status resumido da trilha
        print(f"\n{i+1}. {trilha}")
        
        # Exibe o progresso detalhado de cada etapa da trilha
        print("   Etapas da Trilha:")
        for etapa in trilha.etapas:
            print(f"   - {etapa}")
    
    print("\n--- Fim da Simulação da Área do Estudante ---")


if __name__ == "__main__":
    main()