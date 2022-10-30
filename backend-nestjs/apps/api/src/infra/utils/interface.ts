
export function implementOptionalInterface<T>(): new () => T {
  return class { } as any;
}
