/**
 * Método que auxilia em implementar uma interface sem declarar explicitamente os membros na classe implementada.
 *
 * Eu uso porque eu precisava ter uma tipagem na classe, que eu adicionava os valores das propriedades depois
 * e não queria declarar todas as propriedades novamente na classe, ou adicionar sempre que houvesse uma mudança,
 * e assim, eu consigo de forma dinamica adicionar variáveis de ambiente e acessar ela com um valor tipado.
 */
export function implementOptionalInterface<T>(): new () => T {
  return class { } as any;
}
