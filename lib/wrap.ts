import type {PromiseResult, Result} from "./core"
import type {ErrorHandlerOptions} from "./handle-error"
import {call, callAsync} from "./call"

export const wrap =
	<F extends (...args: any[]) => any, E extends Error = Error>(fn: F, options?: ErrorHandlerOptions<E>) =>
	(...args: Parameters<F>): Result<ReturnType<F>> =>
		call(() => fn(...args), options)

export const wrapAsync =
	<F extends (...args: any[]) => Promise<any>, E extends Error = Error>(fn: F, options?: ErrorHandlerOptions<E>) =>
	async (...args: Parameters<F>): PromiseResult<Awaited<ReturnType<F>>> =>
		callAsync(async () => fn(...args), options)
