# Backend OmniStack 11

Para esse OmniStack, em vez de utilizar Express, eu preferi usar NestJS no lugar por utilizar TypeScript.

## Estrutura

As pastas seguem uma estrutura bem simples:
- src
    - common: Contém arquivos que são utilizados repetidamente nos `controllers`, `services` e outros arquivos.
    - decorators: Contém todos os `decorators` da aplicação.
    - guards: Contém todos os `guards` da aplicação
    - modules: Contém todos os `modules` da aplicação, em essência, um módulo contém os `controllers`, `services`, etc.
    - typeorm: Contém todos os arquivos relacionados ao `typeorm`.
    - utils: Contém todos os arquivos que contém funções úteis usadas em toda a aplicação.
