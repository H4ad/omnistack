# ENV Module

Esse módulo é usado para obter as variáveis de ambiente da minha aplicação.
Ele é uma adaptação melhorada que eu fiz para o meu portifólio no módulo [Config.](https://github.com/H4ad/H4ad.github.io/tree/develop/backend/src/modules/config)

## Como funciona

Basicamente, se você quiser acessar as variáveis de ambiente tipadas, você importa o módulo `EnvModule` e depois coloque no seu `construtror` o serviço `EnvService`.

Um exemplo de utilização pegando o DNS do Sentry:
```TypeScript
/**
 * Construtor padrão
 */
constructor(
  private readonly env: EnvService,
) {
  console.log(`O dns do Sentry é: ${ this.env.SENTRY_DNS }`);
}
```

## Adicionar mais env

Por padrão, eu coloquei as variáveis para configuração do banco de dados, de rotas bases e porte, e até mesmo uma para guardar o DNS do Sentry.

Mas para adicionar, você precisa ir no arquivo `models/dotenv.ts` e adicionar lá a sua variável, após isso, vá em `services/env.service.ts` e adicione dentro do método `validate` na variável `rule` uma validação para a sua variável de ambiente utilizando o `envalid`.

Prontinho, agora sua variável está adicionada e ainda possui tipagem.
