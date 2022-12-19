import {type Result, ok} from "./core"
import {type ErrorHandlerOptions, handleError} from "./handle-error"

export const resolve = <V, E extends Error = Error>(
	value: Promise<V>,
	options?: ErrorHandlerOptions<E>,
): Promise<Result<V, E>> => value.then(ok).catch((e: unknown) => handleError<E>(e, options))
