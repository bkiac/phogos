# ergol

Go-like error handling implemented for TypeScript

[TypeScript >=v4.6
is required to use control flow analysis for destructured discriminated unions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-6.html#control-flow-analysis-for-destructured-discriminated-unions)

## Documentation

### Import

```ts
import {r} from "ergol"
// or import * as ergol from "ergol"
// or import {ergol} from "ergol"
```

### Methods

Use result type with `ok` and `err` convenience methods

```ts
function foo(v: number): r.Result<number> {
	return v % 2 ? r.ok(1) : r.err(new Error("odd number"))
}

const [value, err] = foo()
if (!err) {
	const v = value // `v` is number
}
```

Execute an existing function with `exec` to get a result array

```ts
function bar(): number {
	return 1
}
const [value, err] = r.exec(bar)
```

Wrap an existing function, call the returned function to get a result array

```ts
const bazz = r.wrap(bar)
const [value, err] = bazz()
```

### Panic

Throw panic if something is really wrong

```ts
function listen(): r.Result<void> {
	if (Math.random() < 0.5) {
		throw new r.Panic("connection lost")
	}
	return r.ok(undefined)
}

// Panic instance won't be caught, `err` is always `undefined`
const [value, err] = listen()
```

Use `catchPanic` option to customize panic handling

```ts
r.exec(fn, {
	catchPanic: true, // `false` by default
})
```

Use `preprocess` option to process errors

```ts
r.exec(fn, {
	preprocess: (error: unknown) => {
		if (error instanceof IOError) {
			return new Panic(error.message)
		}
		if (error instanceof Error) {
			return error
		}
		return new Error("unknown error")
	},
})
```

Use `override` option to completely override default error handling

```ts
r.exec(fn, {
	override: (error: unknown) => {
		if (error instanceof HTTPError) {
			// Won't be caught
			throw new Error(error.message)
		}
		return r.err()
	},
})
```
