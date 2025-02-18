Backend - Gerenciador de Contatos

Este é o backend do sistema de gerenciamento de contatos, desenvolvido com NestJS e MongoDB. Ele fornece APIs para cadastrar, editar, listar e excluir contatos, além de validar se um número de telefone já foi cadastrado.

📌 Tecnologias Utilizadas

NestJS - Framework backend

TypeScript - Linguagem de desenvolvimento

MongoDB - Banco de dados NoSQL

Mongoose - ODM para MongoDB

Swagger - Documentação da API

Jest - Testes automatizados

🚀 Funcionalidades

📋 Listagem de contatos

➕ Criação de novos contatos

✏️ Edição de contatos existentes

❌ Exclusão de contatos

🔍 Validação de e-mail e telefone

⚡ Verificação assíncrona para evitar números de telefone duplicados

📂 Estrutura do Projeto

backend/
│-- src/
│   ├── modules/
│   │   ├── contacts/
│   │   │   ├── contacts.controller.ts
│   │   │   ├── contacts.service.ts
│   │   │   ├── contacts.module.ts
│   │   │   ├── contacts.schema.ts
│   │   ├── database/
│   │   │   ├── database.module.ts
│   │   │   ├── database.providers.ts
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── config/
│   │   ├── environment.ts
│   ├── tests/
│   │   ├── contacts.e2e-spec.ts

⚙️ Como Executar o Projeto

1️⃣ Instalar Dependências

npm install

2️⃣ Configurar Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e configure os seguintes valores:

MONGO_URI=mongodb://localhost:27017/contacts_db
PORT=3000

3️⃣ Executar o Servidor

npm run start:dev

A API estará disponível em: http://localhost:3000

📖 Documentação da API

A documentação da API pode ser acessada via Swagger em:

http://localhost:3000/api

🔗 Conexão com o Frontend

O frontend deve estar configurado para consumir a API no endpoint http://localhost:3000/api. Se necessário, ajuste as configurações no arquivo environment.ts do frontend.

✨ Melhorias Futuras

🔑 Autenticação de usuários

📊 Dashboard com estatísticas

📆 Integração com calendário

🔄 Paginação na listagem de contatos

Desenvolvido com 💙 por Fabio Francisco da Silva

