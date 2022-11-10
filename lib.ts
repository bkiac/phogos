export type Ok<T> = {
	value: T
	ok: true
}

export type Err = {
	err: Error
	ok: false
}

export type Result<T> = Ok<T> | Err

export type PromiseResult<T> = Promise<Result<T>>

export const ok = <T>(value: T): Ok<T> => ({ok: true, value})
export const err = <T extends Error>(error?: T): Err => ({
	ok: false,
	err: error ?? new Error(),
})

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
