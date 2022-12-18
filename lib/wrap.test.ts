import {describe, expect, it} from "vitest"
import {wrap, wrapAsync} from "./wrap"

describe("wrap", () => {
	describe("sync", () => {
		it("should return value", () => {
			const value = 1
			const fn = wrap(() => value)
			const [v, e] = fn()
			expect(v).toBe(value)
			expect(e).toBeUndefined()
		})

		it("should return error", () => {
			const error = new Error("message")
			const fn = wrap(() => {
				throw error
			})
			const [v, e] = fn()
			expect(v).toBeUndefined()
			if (e) {
				expect(e).toBeInstanceOf(Error)
				expect(e.message).toEqual(error.message)
			}
		})
	})

	describe("async", () => {
		it("should return value", async () => {
			const value = 1
			const fn = wrapAsync(async () => value)
			const [v, e] = await fn()
			expect(v).toBe(value)
			expect(e).toBeUndefined()
		})

		it("should return error", async () => {
			const error = new Error("message")
			const fn = wrapAsync(async () => {
				throw error
			})
			const [v, e] = await fn()
			expect(v).toBeUndefined()
			if (e) {
				expect(e).toBeInstanceOf(Error)
				expect(e.message).toEqual(error.message)
			}
		})
	})
})
