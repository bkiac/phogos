import {describe, it, expect} from "vitest"
import {call} from "./call"

describe("call", () => {
	describe("sync", () => {
		it("should return value", () => {
			const value = 1
			const [v, e] = call(() => value)
			expect(v).toBe(value)
			expect(e).toBeUndefined()
		})

		it("should return error", () => {
			const error = new Error("message")
			const [v, e] = call<number>(() => {
				throw error
			})
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
			const [v, e] = await call(async () => value)
			expect(v).toBe(value)
			expect(e).toBeUndefined()
		})

		it("should return error", async () => {
			const error = new Error("message")
			const [v, e] = await call(async () => {
				throw error
			})
			expect(v).toBeUndefined()
			if (e) {
				expect(e).toBeInstanceOf(Error)
				expect(e.message).toEqual(error.message)
			}
		})
	})
})
