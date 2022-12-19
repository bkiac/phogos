import {type Result, ok} from "./core"
import {type ErrorHandlerOptions, handleError} from "./handle-error"
import {resolve} from "./resolve"

const isPromise = <V>(value: V | Promise<V>): value is Promise<V> =>
	value instanceof Promise || Object.prototype.toString.call(value) === "[object Promise]"

export function call<V extends Promise<any>, E extends Error = Error>(
	fn: () => V,
	options?: ErrorHandlerOptions<E>,
): Promise<Result<Awaited<V>, E>>

export function call<V, E extends Error = Error>(fn: () => V, options?: ErrorHandlerOptions<E>): Result<V, E>

export function call<V, E extends Error = Error>(fn: () => V | Promise<V>, options?: ErrorHandlerOptions<E>) {
	try {
		const v = fn()
		if (isPromise(v)) {
			return resolve<V, E>(v, options)
		}
		return ok(v)
	} catch (e: unknown) {
		return handleError<E>(e, options)
	}
}

export function callSync<V, E extends Error = Error>(fn: () => V, options?: ErrorHandlerOptions<E>): Result<V, E> {
	return call(fn, options)
}

export async function callAsync<V, E extends Error = Error>(
	fn: () => Promise<V>,
	options?: ErrorHandlerOptions<E>,
): Promise<Result<V, E>> {
	return call(fn, options)
}
