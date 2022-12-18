import type {PromiseResult, Result} from "./core"
import {tryCatch, tryCatchAsync} from "./try-catch"

export const wrap =
	<F extends (...args: any[]) => any>(fn: F) =>
	(...args: Parameters<F>): Result<ReturnType<F>> =>
		tryCatch(() => fn(...args))

export const wrapAsync =
	<F extends (...args: any[]) => Promise<any>>(fn: F) =>
	async (...args: Parameters<F>): PromiseResult<Awaited<ReturnType<F>>> =>
		tryCatchAsync(async () => fn(...args))
