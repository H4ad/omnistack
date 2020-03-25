/**
 * O tipo que representa um decorador customizado
 */
export declare type NestCustomDecorator = <TFunction extends Function, Y>(
  target: TFunction | Object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void;
