You'll need
[TypeScript >=v4.6](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-6.html#control-flow-analysis-for-destructured-discriminated-unions)
to use destructured discriminated unions in control flow

## Examples

```ts
function foo(): phogos.Result<number> {
	return phogos.ok(1)
}

const [value, err] = foo()
if (!err) {
	const v = value
}

function bar(): number {
	return 1
}

const [value2, err2] = phogos.call(bar, {
	preprocess: (error: unknown) => {
		if (error instanceof IOError) {
			return new Panic(error.message)
		}
		return new Error("error message")
	},
})

const bazz = phogos.wrap(bar)
const [value3, err3] = bazz()
```
