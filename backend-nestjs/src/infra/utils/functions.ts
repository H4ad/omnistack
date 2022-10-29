/**
 * Método que verifica se o valor é nulo ou indefinido
 *
 * @param value O valor a ser verificado
 */
export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

/**
 * Método que verifica se o valor enviado é um valor válido ( ou seja, não nulo ou indefinido )
 *
 * @param value O valor a ser verificado
 */
export function isValid(value: any): boolean {
  return !isNullOrUndefined(value);
}
