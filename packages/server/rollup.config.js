import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

const config = defineConfig([
	{
		input: "dist/index.js",
		output: {
			file: "dist/index.js",
			format: "cjs",
			sourcemap: true,
		},
		external: [
			"cli",
			"date-fns",
			"express",
			"express-basic-auth",
			"mailparser",
			"smtp-server",
		],
		plugins: [typescript()],
	},
]);

export default config;
