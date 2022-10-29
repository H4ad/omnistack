<h1 align="center">
    <img alt="Be The Hero" src="./../github/assets/logo.svg" width="400px" />
</h1>

<h4 align="center">
  🚀 Semana OmniStack 11.0
</h4>

<p align="center">
  <a href="#book-introducao">Introduction</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-estrutura">Estrutura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#notebook-typeorm">Typeorm</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#file-folder-entidades">Entidades</a>
</p>

## :book: Introduction

For this OmniStack, instead of using Express, I preferred to use NestJS with Express Adater instead because it uses TypeScript.


## :memo: Structure

For this project, we have three main applications:

- api: Deals with basic crud operations in the system.
- analytics: Aggregates all data from operations in crud.
- audit: Aggregates all data from operations in crud to audit before.

## :rocket: Getting Started

To be able to run those applications, first you need to have:

- NodeJS 16.x
- Docker Compose

After having these requirements, run:

```bash
cp .env.postgres.example .env
```

This will create the .env file to us to be able to start the application, then:

```bash
docker compose up -d
```

This will spinning up the databases used and all the services needed.

Then, you just need to start the API and other services:

```bash
npm run start:
```

## :file_folder: Entities

A seguir, as entidades do banco de dados extraida a partir da primeira aula, eu irei modificar um pouco mas no geral é isso:

Usuário:

- Email
- Password ( não havia também, mas eu irei trabalhar com sistema de autenticação por senha )
- Roles ( não visto mas irei incluir por padrão )
- Ongs[] ( uma relação OneToMany )

Apesar das Ongs aparentemente serem um usuário de certa forma, eu ainda irei separar em uma entidade por sí só.

Ongs:

- Name
- Email
- Cidade
- UF
- Whatsapp
- Usuário ( uma relação ManyToOne )
- Casos[] ( uma relação OneToMany )

Incidentes:

- Título
- Descrição
- Valor
- Ong ( uma relação ManyToOne )
