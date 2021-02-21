/**
 * Método que retorna uma lista de erros
 */
export function getCrudErrors({ status, error }: any): string[] {
  if (status >= 500 && status <= 599)
    return ['Ocorreu um erro interno, por favor, tente novamente.'];

  if (!Array.isArray(error.message)) {
    if (typeof error.message === 'string' && error.message.includes('Cannot'))
      return ['A rota especificada não foi encontrada, por favor, contate os administradores se o erro persistir.'];

    return [error.message || 'Ocorreu um erro inesperado, por favor, contate os administradores se o erro persistir.'];
  }

  // @ts-ignore
  return error.message.map(({ constraints }) => constraints && Object.values(constraints) || [])
    .reduce((acc, actual) => [...acc, ...actual] as string[]);
}
