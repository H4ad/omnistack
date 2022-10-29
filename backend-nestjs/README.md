<h1 align="center">
    <img alt="Be The Hero" src="./../github/assets/logo.svg" width="400px" />
</h1>

<h4 align="center">
  🚀 Semana OmniStack 11.0
</h4>

<p align="center">
  <a href="#book-introduction">Introduction</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-structure">Estrutura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-getting-started">Typeorm</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## :book: Introduction

For this OmniStack, instead of using Express, I preferred to use NestJS with Express Adater instead because it uses TypeScript.

## :memo: Structure

For this project, we have three main applications:

- api: Deals with basic crud operations in the system.
- analytics: Aggregates all data from operations in crud.

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

Then, you just need to start the default API and the analytics microservice:

```bash
npm run start:api:debug
npm run start:analytics:debug
```
