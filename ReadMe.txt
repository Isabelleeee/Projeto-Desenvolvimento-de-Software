## EstudaAI – Sistema de Recomendação de Trilhas de Aprendizagem

## Descrição Longa: O EstudaAI é uma aplicação web para ajudar estudantes no planejamento de estudos por meio de trilhas de aprendizagem personalizadas. Oferece duas opções:

- Trilhas pré-definidas: curadas por especialistas  
- Trilhas personalizadas: criadas com auxílio de um agente baseado em LLM (Large Language Model)

Ideal para organizar e otimizar seu aprendizado de forma inteligente e adaptada às suas necessidades.

## Instalação e Execução

- Clonar o repositório

Se ainda não tem o repositório local:

```
bash

git clone https://github.com/Isabelleeee/Projeto-Desenvolvimento-de-Software.git

```

Exemplo:

```
bash

git clone https://github.com/seu-usuario/Projeto-Desenvolvimento-de-Software.git

```

Depois entre na pasta:

```bash

cd Projeto-Desenvolvimento-de-Software
```

Checar e mudar para a branch correta

Verifique se a branch existe remotamente:

```bash

git fetch origin
git branch -r
```

Deve aparecer algo como:

```bash
origin/feature/back-end-admin
```

Troque para ela:

```bash
git checkout feature/back-end-admin
```

Se ainda não existir localmente:

```bash
git checkout -b feature/back-end-admin origin/feature/back-end-admin
```

Confirme com:

```bash
git status
```

Deve mostrar:

```
On branch feature/back-end-admin
Your branch is up to date with 'origin/feature/back-end-admin'.
```

---

Configurar o ambiente Django (backend)

Criar o ambiente virtual

```bash
python -m venv venv
```

Ativar:

* Windows (PowerShell):

  ```bash
  venv\Scripts\activate
  ```
* Linux/macOS:

  ```bash
  source venv/bin/activate
  ```

#### Instalar dependências

```bash
pip install -r requirements.txt
```

#### Criar e configurar o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto (se não existir) com variáveis como:

```ini
DEBUG=True
SECRET_KEY=sua_chave_segura_aqui
ALLOWED_HOSTS=127.0.0.1,localhost
ADMIN_URL=http://localhost:3002/
ALUNO_URL=http://localhost:3001/
```

#### Aplicar migrações

```bash
python manage.py makemigrations
python manage.py migrate
```

#### Criar um superusuário (opcional)

```bash
python manage.py createsuperuser
```

#### Rodar o servidor

```bash
python manage.py runserver
```

Backend agora roda em:
👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### Rodar o **frontend (área de login, admin e estudante)**

Abra **três terminais** (ou um por vez) e vá em cada diretório correspondente:

#### 🔹 Login / Cadastro

```bash
cd frontend/login-cadastro
npm install
npm run dev
```

Rodará em: [http://localhost:3000](http://localhost:3000)

#### Área do Estudante

```bash
cd ../area-estudante
npm install
npm run dev
```

Rodará em: [http://localhost:3001](http://localhost:3001)

#### Área do Admin

```bash
cd ../area-admin
npm install
npm run dev
```

Rodará em: [http://localhost:3002](http://localhost:3002)

---

### Testar o login unificado

Acesse o login em `http://localhost:3000`.

*  Admin

  * Username: `giovanna`
  * Password: `610v4nn4`
    → Redireciona para `http://localhost:3002/`

*  Estudante

  * Username: `aluno_novo`
  * Password: `123456`
    → Redireciona para `http://localhost:3001/`

---

(Opcional) Atualizar o projeto no futuro

Quando quiser atualizar a branch para a última versão do repositório remoto:

```bash
git pull origin feature/back-end-admin
```

---

Você agora terá:

*  Backend Django rodando com autenticação unificada.
*  Frontend de login funcional.
*  Redirecionamento automático por tipo de usuário.
*  Estrutura organizada e pronta para continuar o desenvolvimento das áreas internas.

---

## Contribua

Sugestões e relatos de bugs são bem vindos.

## 