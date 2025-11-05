#cadastro novos usuários
from datetime import date
from enum import Enum

class UsuarioTipo(Enum):
    ALUNO = "Aluno"
    ADMIN = "Admin"

class InscricaoStatus(Enum):
    ATIVA = "Ativa"
    CANCELADA = "Cancelada"

class Usuario:
    _id_counter = 1  #id automatico

    def __init__(self, nome: str, email: str, senha: str, tipo: UsuarioTipo = UsuarioTipo.ALUNO):
        self.id = Usuario._id_counter
        Usuario._id_counter += 1

        self.nome = nome
        self.email = email
        self.senha = senha
        self.tipo = tipo

    def __repr__(self):
        return f"<Usuario id={self.id}, nome='{self.nome}', tipo={self.tipo.value}>"

class Inscricao:
    _id_counter = 1

    def __init__(self, usuario_id: int, trilha_id: int, status: InscricaoStatus = InscricaoStatus.ATIVA):
        self.id = Inscricao._id_counter
        Inscricao._id_counter += 1

        self.usuario_id = usuario_id
        self.trilha_id = trilha_id
        self.data_inscricao = date.today()
        self.ultima_atualizacao = date.today()
        self.status = status

    def cancelar(self):
        self.status = InscricaoStatus.CANCELADA
        self.ultima_atualizacao = date.today()

    def reativar(self):
        self.status = InscricaoStatus.ATIVA
        self.ultima_atualizacao = date.today()

    def __repr__(self):
        return f"<Inscricao id={self.id}, usuario={self.usuario_id}, trilha={self.trilha_id}, status={self.status.value}>"


class GerenciadorUsuarios:
    def __init__(self):
        self.usuarios = []

    def criar_usuario(self, nome: str, email: str, senha: str, tipo: UsuarioTipo = UsuarioTipo.ALUNO):
        # Verifica se já existe um usuário com o mesmo e-mail
        for u in self.usuarios:
            if u.email == email:
                raise ValueError("Email já cadastrado.")

        novo_usuario = Usuario(nome, email, senha, tipo)
        self.usuarios.append(novo_usuario)
        print(f"✅ Usuário criado com sucesso: {novo_usuario}")
        return novo_usuario

    def listar_usuarios(self):
        print("\n=== Lista de Usuários ===")
        for u in self.usuarios:
            print(u)

if __name__ == "__main__":
    gerenciador = GerenciadorUsuarios()

    # usarios aleatorios
    gerenciador.criar_usuario("Ana", "ana@email.com", "1234")
    gerenciador.criar_usuario("Lucas", "lucas@email.com", "abcd", UsuarioTipo.ADMIN)

    # Exibir
    gerenciador.listar_usuarios()
