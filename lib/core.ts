export type Ok<V> = [V, undefined]
export type Err<E extends Error = Error> = [undefined, E]
export type Result<V, E extends Error = Error> = Ok<V> | Err<E>

export const ok = <V>(value: V): Ok<V> => [value, undefined]
export const err = <E extends Error>(error: E): Err<E> => [undefined, error]
