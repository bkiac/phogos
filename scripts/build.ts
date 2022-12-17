import esbuild from "esbuild"
import {execSync} from "child_process"

esbuild.build({
	external: ["./node_modules/*"],

	entryPoints: ["index.ts"],
	outdir: "dist",

	bundle: true,
	minify: true,
	treeShaking: true,

	platform: "node",

	plugins: [
		{
			name: "typescriptDeclarations",
			setup: (build) => {
				build.onEnd((result) => {
					if (result.errors.length === 0) {
						execSync("tsc")
					}
				})
			},
		},
	],
})
