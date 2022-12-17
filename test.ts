import {describe, expect, it} from "vitest"
import {ph} from "./index"

class CustomError extends Error {}

// The two tests marked with concurrent will be run in parallel
describe("phogos", () => {
	it("should return value", () => {
		const value = 1
		const [v, err] = ph.ok(value)
		expect(v).toEqual(value)
		expect(err).toBeUndefined()
	})

	it("should return error", () => {
		const error = new Error("message")
		const [v, err] = ph.err(error)
		expect(v).toBeUndefined()
		expect(err).toBeInstanceOf(Error)
		expect(err.message).toEqual(error.message)
	})

	it("should return custom error", () => {
		const error = new CustomError("custom message")
		const [v, err] = ph.err(error)
		expect(v).toBeUndefined()
		expect(err).toBeInstanceOf(CustomError)
		expect(err.message).toEqual(error.message)
	})

	it("should return value from tryCatch", () => {
		const value = 1
		const [v, err] = ph.tryCatch(() => value)
		expect(v).toBe(value)
		expect(err).toBeUndefined()
	})

	it("should return error from tryCatch", () => {
		const error = new Error("message")
		const [v, err] = ph.tryCatch<number>(() => {
			throw error
		})
		expect(v).toBeUndefined()
		if (err) {
			expect(err).toBeInstanceOf(Error)
			expect(err.message).toEqual(error.message)
		}
	})

	it("should return value from tryCatchAsync", async () => {
		const value = 1
		const [v, err] = await ph.tryCatchAsync(async () => value)
		expect(v).toBe(value)
		expect(err).toBeUndefined()
	})

	it("should return error from tryCatchAsync", async () => {
		const error = new Error("message")
		const [v, err] = await ph.tryCatchAsync<number>(() => {
			throw error
		})
		expect(v).toBeUndefined()
		if (err) {
			expect(err).toBeInstanceOf(Error)
			expect(err.message).toEqual(error.message)
		}
	})

	it("should return value from wrapTryCatch", () => {
		const value = 1
		const fn = ph.wrapTryCatch(() => value)
		const [v, err] = fn()
		expect(v).toBe(value)
		expect(err).toBeUndefined()
	})

	it("should return value from wrapTryCatchAsync", async () => {
		const value = 1
		const fn = ph.wrapTryCatchAsync(async () => value)
		const [v, err] = await fn()
		expect(v).toBe(value)
		expect(err).toBeUndefined()
	})
})
