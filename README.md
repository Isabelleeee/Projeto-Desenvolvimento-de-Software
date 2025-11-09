# 🧠 EstudaAI — Plataforma Inteligente de Aprendizado

Bem-vindo(a) ao **EstudaAI**, um sistema de aprendizado inteligente que une **inteligência artificial**, **gestão de trilhas de estudo** e **experiência personalizada** para alunos e administradores.

Este repositório contém **todo o backend (Django)** e **os frontends** das áreas:
- 🧩 Login e cadastro
- 🎓 Área do Estudante
- 🧑‍💼 Área do Administrador

---

## 🚀 Tecnologias Utilizadas

### 🖥️ **Backend**
- **Python 3.13+**
- **Django 5.x**
- **Django REST Framework (DRF)**
- **Django CORS Headers**
- **Python Dotenv**
- **dj-database-url**
- **SQLite** (banco de dados local)

### 💻 **Frontend**
- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React (ícones)**
- **ShadCN UI (componentes de interface)**

---

## 🧩 Estrutura do Projeto

```

Projeto-Desenvolvimento-de-Software/
│
├── app_principal/              # Lógica principal do sistema e APIs unificadas
│   ├── models.py               # Modelos principais
│   ├── views.py                # Lógica de login, tokens e rotas principais
│   ├── serializers.py          # Serialização dos modelos para JSON
│   ├── urls.py                 # Rotas de API
│   └── utils/security.py       # Funções de segurança e geração de tokens
│
├── area_estudante/             # APIs e lógica da área do estudante
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
│
├── config/                     # Configurações globais do Django
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── frontend/
│   ├── login-cadastro/         # Interface de login unificado
│   ├── area-estudante/         # Interface da área do estudante
│   └── area-admin/             # Interface da área administrativa
│
└── manage.py

````

---

## ⚙️ Configuração do Ambiente Backend

### 1️⃣ Criar e ativar ambiente virtual
```bash
python -m venv venv
venv\Scripts\activate      # (Windows)
# ou
source venv/bin/activate   # (Linux/macOS)
````

### 2️⃣ Instalar dependências

```bash
pip install -r requirements.txt
```

Se não existir o arquivo, instale manualmente:

```bash
pip install django djangorestframework django-cors-headers python-dotenv dj-database-url
```

### 3️⃣ Criar arquivo `.env`

Na raiz do projeto, crie um arquivo chamado `.env` com o conteúdo:

```env
SECRET_KEY=sua_chave_secreta_aqui
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
ADMIN_URL=http://localhost:3002/
ALUNO_URL=http://localhost:3001/
```

### 4️⃣ Aplicar migrações e criar superusuário

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 5️⃣ Rodar o servidor Django

```bash
python manage.py runserver
```

Backend disponível em:
👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 💡 Endpoints principais

| Método | Endpoint                | Descrição                                             |
| ------ | ----------------------- | ----------------------------------------------------- |
| `POST` | `/api/login-unificado/` | Autentica usuários e retorna token + redirecionamento |
| `GET`  | `/api/estudante/...`    | APIs da área do estudante                             |
| `GET`  | `/api/admin/...`        | APIs da área administrativa                           |

### 🔐 Exemplo de resposta do login:

```json
{
  "mensagem": "Login realizado com sucesso!",
  "usuario": "giovanna",
  "tipo": "admin",
  "token": "845d0827369ad9d60ec59c5112260c4e4a6efc1b",
  "redirect": "http://localhost:3002/"
}
```

---

## 🧠 Segurança e Tokens

O backend possui um módulo dedicado à segurança:
📄 `app_principal/utils/security.py`

Esse módulo é responsável por:

* Geração de tokens únicos e seguros (`hashlib + secrets`)
* Validação de tokens
* Facilitar migração futura para JWT ou OAuth2

Exemplo de uso:

```python
from .utils.security import gerar_token_unico

token = gerar_token_unico(user)
```

---

## 🎨 Configuração do Frontend

### 1️⃣ Entrar em cada pasta do frontend

```bash
cd frontend/login-cadastro
npm install
npm run dev
```

Depois repita o mesmo para:

```bash
cd ../area-estudante
npm install
npm run dev

cd ../area-admin
npm install
npm run dev
```

### 2️⃣ Acessar as interfaces

| Área             | URL                                            | Descrição                      |
| ---------------- | ---------------------------------------------- | ------------------------------ |
| Login / Cadastro | [http://localhost:3000](http://localhost:3000) | Página inicial de autenticação |
| Estudante        | [http://localhost:3001](http://localhost:3001) | Área do aluno                  |
| Admin            | [http://localhost:3002](http://localhost:3002) | Painel do administrador        |

---

## 🔁 Comunicação Front ↔ Backend

Certifique-se que o backend (porta 8000) está ativo antes de rodar o front.
As URLs de redirecionamento e integração estão configuradas no arquivo `.env` e nas `views` do Django.

No `settings.py`, o CORS já permite o acesso de todas as áreas:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
]
```

---

## 🧩 Funcionalidades já implementadas

✅ Login unificado (Admin e Estudante)
✅ Geração e validação de token de segurança
✅ Redirecionamento automático para as áreas corretas
✅ APIs RESTful para administração e estudo
✅ Interface moderna com animações (Tailwind + Framer Motion)
✅ Comunicação entre front e back 100% funcional

---

## 📦 Próximos Passos

* 🔐 Implementar logout com expiração de token
* 🧪 Adicionar testes unitários (PyTest / DRF)
* 🗄️ Migrar para PostgreSQL em produção
* 🧭 Documentar APIs com Swagger / DRF Docs
* 🧠 Adicionar IA interativa para trilhas personalizadas

---

## 👩‍💻 Equipe e Créditos

**Desenvolvido por:**

* Giovanna *(Back-end & Integração)*
* [Colega responsável pela segurança e integração `security.py`]
* Equipe EstudaAI — Desenvolvimento de Software (Mackenzie)

---

## ⚡ Como Rodar Tudo de Uma Vez (Resumo)

```bash
# Backend
cd Projeto-Desenvolvimento-de-Software
python manage.py runserver

# Frontend - Login
cd frontend/login-cadastro
npm run dev

# Frontend - Estudante
cd ../area-estudante
npm run dev

# Frontend - Admin
cd ../area-admin
npm run dev
```

---

## 🧾 Licença

Projeto desenvolvido para fins acadêmicos — Instituto Presbiteriano Mackenzie
© 2025 - Todos os direitos reservados.

```

---

### 💡 Dica extra:
Quer que eu gere também o arquivo `requirements.txt` pronto, compatível com esse README (para colocar no mesmo commit)?  
Assim qualquer pessoa pode rodar só com `pip install -r requirements.txt`.
```
