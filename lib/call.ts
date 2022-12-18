import {type Result, ok, type PromiseResult} from "./core"
import {type ErrorHandlerOptions, handleError} from "./handle-error"

export const call = <V, E extends Error = Error>(fn: () => V, options?: ErrorHandlerOptions<E>): Result<V, E> => {
	try {
		return ok(fn())
	} catch (e: unknown) {
		return handleError<E>(e, options)
	}
}

export const callAsync = async <V, E extends Error = Error>(
	fn: () => Promise<V>,
	options?: ErrorHandlerOptions<E>,
): PromiseResult<V, E> => {
	try {
		return ok(await fn())
	} catch (e: unknown) {
		return handleError<E>(e, options)
	}
}
