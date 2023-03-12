import cli from "cli";

import { createExpressServer } from "./create-express-server.mjs";
import { createMailServer } from "./create-mail-server.mjs";

const nextCli = cli.enable("catchall").enable("status");

const config = nextCli.parse({
	"smtp-port": ["s", "SMTP port to listen on", "number", 1025],
	"smtp-ip": [false, "IP Address to bind SMTP service to", "ip", "0.0.0.0"],
	"http-port": ["h", "HTTP port to listen on", "number", 1080],
	"http-ip": [false, "IP Address to bind HTTP service to", "ip", "0.0.0.0"],
	allowList: [
		"w",
		"Only accept e-mails from these adresses. Accepts multiple e-mails comma-separated",
		"string",
	],
	max: ["m", "Max number of e-mails to keep", "number", 100],
	auth: ["a", "Enable Authentication", "string"],
	headers: [false, "Enable headers in responses"],
});

const allowList = config.allowList?.split(",") ?? [];

let users: null | Record<string, string> = null;

if (config.auth && !/.+:.+/.test(config.auth)) {
	cli.error(
		"Please provide authentication details in USERNAME:PASSWORD format",
	);
	console.log(process.exit(1));
}

if (config.auth) {
	const authConfig = config.auth.split(":");
	users = {};
	users[authConfig[0]] = authConfig[1];
}

const mailServer = createMailServer({
	allowList,
	headers: config.headers,
	debug: cli.debug,
	info: cli.info,
	max: config.max,
});

mailServer.on("error", err => {
	cli.error(err.message);
});

mailServer.listen(config["smtp-port"], config["smtp-ip"]);

const expressServer = createExpressServer({ users });

expressServer.listen(config["http-port"], config["http-ip"], () => {
	cli.info(
		"HTTP server listening on http://" +
			config["http-ip"] +
			":" +
			config["http-port"],
	);
});

cli.info(
	"SMTP server listening on " + config["smtp-ip"] + ":" + config["smtp-port"],
);
