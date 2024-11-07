
# Projeto de Controle de Ponto

Este é um sistema de Controle de Ponto desenvolvido em Node.js e React para gerenciar o horário de entrada e saída dos funcionários, com autenticação JWT e persistência dos dados no MongoDB.

## Índice
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

Este projeto é um sistema de controle de ponto digital que permite aos funcionários registrar seu horário de entrada e saída. O sistema permite que o administrador consulte e gerencie registros e usuários. 

## Funcionalidades

- **Registro de ponto**: Entrada e saída para manhã e tarde.
- **Autenticação JWT**: Proteção de rotas e sessões de usuário.
- **Visualização de horários**: Exibição dos horários registrados.
- **Administração**: Funcionalidades de CRUD para gerenciamento de usuários (apenas administradores).
- **Relatórios**: Geração de relatórios com base nos registros.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado as seguintes ferramentas:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (ou use uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Git](https://git-scm.com/)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências do backend e do frontend:
   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../client
   npm install
   ```

## Configuração

1. Crie um arquivo `.env` no diretório `server` e adicione as seguintes variáveis de ambiente:

   ```plaintext
   MONGODB_URI=sua_string_de_conexao_mongodb
   JWT_SECRET=sua_chave_jwt_secreta
   PORT=5000
   ```

2. Configure o arquivo `.gitignore` para ignorar informações sensíveis como `node_modules` e `.env` (veja o exemplo abaixo).

## Scripts Disponíveis

### Backend

No diretório `server`, você pode usar os seguintes comandos:

- `npm start` - Inicia o servidor em modo de produção.
- `npm run dev` - Inicia o servidor em modo de desenvolvimento usando [Nodemon](https://nodemon.io/).

### Frontend

No diretório `client`, você pode usar os seguintes comandos:

- `npm start` - Inicia o frontend em modo de desenvolvimento.
- `npm run build` - Compila o projeto para produção.

## Estrutura do Projeto

Aqui está uma estrutura básica do projeto:

```plaintext
├── client              # Código do frontend (React)
│   ├── public
│   └── src
│       ├── components  # Componentes React
│       ├── pages       # Páginas principais
│       ├── App.js      # Componente principal
│       └── index.js    # Ponto de entrada do React
│
├── server              # Código do backend (Node.js e Express)
│   ├── config          # Configurações do MongoDB e JWT
│   ├── controllers     # Lógica de negócios
│   ├── middleware      # Middlewares de autenticação
│   ├── models          # Modelos do MongoDB (Mongoose)
│   ├── routes          # Definição de rotas
│   └── server.js       # Ponto de entrada do servidor
│
├── .gitignore          # Arquivos e pastas a serem ignorados pelo Git
├── README.md           # Documentação do projeto
└── package.json        # Dependências e scripts do projeto
```

## Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express
  - Mongoose (MongoDB)
  - JWT para autenticação

- **Frontend**:
  - React
  - Axios para requisições HTTP

## Contribuição

Sinta-se à vontade para contribuir com o projeto, abrindo uma *issue* ou um *pull request*. Para grandes mudanças, abra uma *issue* primeiro para discutir o que você gostaria de mudar.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
