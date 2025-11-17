# Dashboard Auth with JWT

> Sistema de autenticação para Dashboard utilizando JWT (JSON Web Tokens)

## Sobre o Projeto

Dashboard com sistema de autenticação seguro que gera tokens de autorização quando o usuário se autentica com credenciais válidas (usuário e senha).

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **[Node.js](https://nodejs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Fastify](https://www.fastify.io/)** -
- **[JWT](https://jwt.io/)** - JSON Web Tokens para autenticação

## Objetivo

Gerar um token de autorização (JWT) quando o usuário autenticar com usuário e senha corretamente, permitindo acesso seguro às rotas

## Funcionalidades

- Autenticação de usuários com credenciais
- Geração de tokens JWT
- Validação de tokens
- Rotas protegidas
- Logou ao mudar senha

## Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

```bash
# Clone este repositório
git clone https://github.com/leonDenizard/auth-dashboard-back.git

# Acesse a pasta do projeto
cd back

# Instale as dependências
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
# Servidor
PORT=3000

# MongoDB
MONGO_URI=mongodb+srv://root:senha@cluster

# Rota
REACT_APP_API_URL=http://localhost:3000/api

# JWT
JWT_SECRET=sua_chave_secreta_super_segura

```

## Executando o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Build
npm run build

# Modo produção
npm start

```

## Estrutura do Projeto

```
dashboard-auth-jwt/back
├── back/
    ├── src/
    │   ├── controllers/     # Controladores
    │   ├── routes/          # Rotas da aplicação
    │   ├── db/              # Conexão com o mongo
    │   └── app.ts           # Arquivo principal
    │   └── server.ts        # Inicia o servidor
    ├── .gitignore
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## Endpoints da API

### Autenticação

**POST** `/login`

Autentica o usuário e retorna um token JWT.

**Request:**
```json
{
  "username": "dev",
  "password": "123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "101",
    "username": "dev"
  }
}
```

### Rotas Protegidas

**GET** `/profile`

Retorna os dados usuário.

**Headers:**
```
Authorization: Bearer {seu_token}
```

---