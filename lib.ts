export type Ok<V> = [V, undefined]
export type Err<E = Error> = [undefined, E]
export type Result<V, E = Error> = Ok<V> | Err<E>
export type PromiseResult<T> = Promise<Result<T>>

export const ok = <T>(value: T): Ok<T> => [value, undefined]
export const err = <T extends Error>(error: T): Err => [undefined, error]

export const tryCatch = <T>(fn: () => T): Result<T> => {
	try {
		const value = fn()
		return ok(value)
	} catch (e: unknown) {
		return err(e as Error)
	}
}
export const tc = tryCatch

export const wrapTryCatch =
	<F extends (...args: any[]) => any>(fn: F) =>
	(...args: Parameters<F>): Result<ReturnType<F>> =>
		tryCatch(() => fn(...args))
export const wtc = wrapTryCatch

export const tryCatchAsync = async <T>(
	fn: () => Promise<T>,
): PromiseResult<T> => {
	try {
		const value = await fn()
		return ok(value)
	} catch (e: unknown) {
		return err(e as Error)
	}
}

export const wrapTryCatchAsync =
	<F extends (...args: any[]) => Promise<any>>(fn: F) =>
	async (...args: Parameters<F>): PromiseResult<Awaited<ReturnType<F>>> =>
		tryCatchAsync(async () => fn(...args))
export const wtca = wrapTryCatchAsync
