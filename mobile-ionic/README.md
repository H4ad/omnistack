<h1 align="center">
    <img alt="Be The Hero" src="./../github/assets/logo.svg" width="400px" />
</h1>

<h4 align="center">
  🚀 Semana OmniStack 11.0
</h4>

<p align="center">
  <a href="#book-introducao">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-estrutura">Estrutura</a>
</p>

## :book: Introdução

A seguir, você pode encontrar todo o código do projeto escrito em TypeScript com Angular e Ionic.

Para gerar o `build` dos arquivos nativos, foi utilizado o Capacitor, que é parecido com o Cordova mas a sua implementação é várias vezes mais tranquila de ser feita.

## :memo: Estrutura

As pastas seguem uma estrutura bem simples:
- app
    - components: Contém os componentes que serão reutilizados em uma ou mais páginas.
    - factories: Contém as `factories` que basicamente são utilizadas para construir um `service` de forma mais flexivel.
    - interactors: Basicamente são serviços que possuem apenas a responsabilidade de lidar com a busca de dados da aplicação, seja via requisições HTTP ou cache.
    - models: Contém os `proxies` e também pode conter os `payloads` usados para representar dados que são enviados e recebidos da API.
    - pages: Contém todas as páginas da aplicação.
    - services: Contém todos os serviços que, diferente dos `ìnteractors`, possuem a responsabilidade de lida com a regra de negócio da aplicação.
