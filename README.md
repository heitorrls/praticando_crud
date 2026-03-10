# Sistema de Gestão de Usuários (CRUD)

Este projeto é uma aplicação web *Full-Stack* desenvolvida com o objetivo de praticar e consolidar os conceitos de um sistema **CRUD** (Criar, Ler, Atualizar e Eliminar). A aplicação permite gerir uma lista de utilizadores, interagindo com uma base de dados relacional e atualizando a interface gráfica de forma dinâmica e moderna através do *browser*.

## 🚀 Funcionalidades

- **Criar (Create):** Registo de novos utilizadores através de um formulário.
- **Ler (Read):** Listagem automática de todos os utilizadores registados numa tabela HTML.
- **Atualizar (Update):** Edição de utilizadores de forma *inline* (diretamente nas linhas da tabela), oferecendo uma excelente experiência de utilização.
- **Eliminar (Delete):** Remoção de utilizadores da base de dados com atualização imediata da interface.

## 🛠️ Tecnologias Utilizadas

**Frontend:**
- HTML5 & CSS3 (Estrutura e Estilização)
- JavaScript Vanilla (Manipulação do DOM e consumo da API via `fetch`)

**Backend:**
- [Node.js](https://nodejs.org/) (Ambiente de execução)
- [Express](https://expressjs.com/) (Criação do servidor e rotas da API)
- [MySQL2](https://www.npmjs.com/package/mysql2) (Integração e comunicação com a base de dados)

## 📋 Pré-requisitos

Antes de começar, certifique-se de que tem as seguintes ferramentas instaladas no seu sistema:
- [Node.js](https://nodejs.org/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

## ⚙️ Instalação e Execução

Siga os passos abaixo para correr o projeto localmente:

**1. Clone o repositório:**
\`\`\`bash
git clone https://github.com/heitorrls/CRUD.git
cd nome-do-repositorio
\`\`\`

**2. Configure a Base de Dados:**
- Abra o seu cliente MySQL (ex: MySQL Workbench ou DBeaver).
- Importe o ficheiro SQL fornecido no projeto que se encontra em: `banco de dados/crudjs.sql`. Isto irá criar a base de dados e a tabela `usuarios` necessária.
- Abra o ficheiro `db.js` na raiz do projeto e certifique-se de que as credenciais (utilizador, palavra-passe e nome da base de dados) correspondem à sua configuração local do MySQL.

**3. Instale as dependências:**
No terminal, dentro da pasta do projeto, execute:
\`\`\`bash
npm install
\`\`\`

**4. Inicie o Servidor:**
\`\`\`bash
node server.js
\`\`\`

**5. Aceda à aplicação:**
Abra o seu *browser* e aceda ao endereço: [http://localhost:3000](http://localhost:3000)

## 📂 Estrutura do Projeto

\`\`\`text
├── banco de dados/
│   └── crudjs.sql         # Script para criação da base de dados
├── css/
│   └── style.css          # Ficheiro de estilos da interface
├── js/
│   └── script.js          # Lógica do frontend (Fetch API, manipulação do DOM)
├── db.js                  # Configuração da ligação à base de dados MySQL
├── index.html             # Estrutura principal da página web
├── package.json           # Dependências e scripts do Node.js
├── routes.js              # Rotas da API REST (GET, POST, PUT, DELETE)
└── server.js              # Configuração e arranque do servidor Express
\`\`\`

## ✍️ Autor

**Heitor Luiz de Souza Carvalho de Miranda**

Desenvolvido como projeto de estudo e consolidação de conhecimentos em desenvolvimento web.
