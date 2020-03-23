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

## TypeOrm

Esse é o nome biblioteca que lida com o banco de dados, a estrutura desse cara é a seguinte:

- `src/typeorm/migrations`: O local onde todas as migrations ficam.
- `src/typeorm/entities`: O local onde todas as entidades criadas devem ficar, **SEMPRE** devem possuir o final terminando em `.entity.ts`.
- `src/typeorm/subscribers`: O local onde todas os `subscribers` ficam, **SEMPRE** devem possuir o final terminando em `.subscriber.ts`.

### MySQL

Use o seguinte comando para criar o arquivo de configurações a partir do exemplo:
```shell
cp .env.mysql.example .env
```

Depois, defina as configurações do banco de dados de acordo com as suas necessidades.

Pronto! Agora, você pode criar uma `migration` usando `npm run add-migration v1`, e depois executa-la com `npm run migration` para iniciar o banco de dados. 

### SQLite

Se for usar SQLite em vez de MySQL, instale as dependências necessárias com:
```shell
sudo apt-get install sqlite3 libsqlite3-dev
```

E depois inicie uma banco de dados inicial com:
```shell
sqlite3 example.db "VACUUM;"
```

Por fim, crie o arquivo contendo as configurações iniciais:
```shell
cp .env.sqlite.example .env
```

Pronto! Agora, você pode criar uma `migration` usando `npm run add-migration v1`, e depois executa-la com `npm run migration` para iniciar o banco de dados. 

### Migrations

Para criar uma `migration`, use o comando:
```shell
npm run add-migration NOME_DA_MIGRATION
```

E para executar todas as suas `migrations`, use:
```shell
npm run migration
```

Caso queira realizar alguma operação mais complexa com o Typeorm, use o comando:
```shell
npm run typeorm:cli COMANDO
```
