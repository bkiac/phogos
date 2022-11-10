import esbuild from "esbuild"

esbuild.buildSync({
	entryPoints: ["index.ts"],
	bundle: true,
	platform: "node",
	external: ["./node_modules/*"],
	outfile: "dist/index.js",
})
