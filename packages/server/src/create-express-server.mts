import { join } from "node:path";

import express from "express";
import basicAuth from "express-basic-auth";

import { EmailStore } from "./email-store.mjs";
import { emailFilter } from "./helpers.mjs";

interface ExpressServerOptions {
	users: Record<string, string> | null;
	staticDir?: string;
}

const resolveBuildDir = (dir = "dist/frontend") => join(import.meta.url, dir);

export function createExpressServer({
	users,
	staticDir,
}: ExpressServerOptions) {
	const app = express();

	app.use((_req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept",
		);
		next();
	});

	if (users && Object.keys(users).length > 0) {
		app.use(basicAuth({ users, challenge: true }));
	}

	app.use(express.static(resolveBuildDir(staticDir)));

	app.get("/api/emails", (req, res) => {
		const mails = EmailStore.get();
		res.json(mails.filter(emailFilter(req.query)));
	});

	app.delete("/api/emails", (_req, res) => {
		EmailStore.clear();
		res.send();
	});

	return app;
}
