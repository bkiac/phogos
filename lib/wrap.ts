import type {ErrorHandlerOptions} from "./handle-error"
import {call} from "./call"
import type {Result} from "./core"

// @ts-expect-error TypeScript should be able to infer the type of the returned function
export function wrap<F extends (...args: any[]) => never, E extends Error = Error>(
	fn: F,
	options?: ErrorHandlerOptions<E>,
): (...args: Parameters<F>) => Result<never, E>

export function wrap<F extends (...args: any[]) => Promise<any>, E extends Error = Error>(
	fn: F,
	options?: ErrorHandlerOptions<E>,
): (...args: Parameters<F>) => Promise<Result<Awaited<ReturnType<F>>, E>>

export function wrap<F extends (...args: any[]) => any, E extends Error = Error>(
	fn: F,
	options?: ErrorHandlerOptions<E>,
): (...args: Parameters<F>) => Result<ReturnType<F>, E>

export function wrap<F extends (...args: any[]) => any, E extends Error = Error>(
	fn: F,
	options?: ErrorHandlerOptions<E>,
) {
	return (...args: Parameters<F>) => call(() => fn(...args), options)
}
