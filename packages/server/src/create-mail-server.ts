import type { ParsedMail } from "mailparser";
import { SMTPServer } from "smtp-server";
import { EmailStore } from "./email-store";
import { parseEmail } from "./helpers";

interface CreateMailServerOptions {
	allowList: unknown[];
	headers: unknown[];
	max: number;
	info: (msg: string) => void;
	debug: (msg: string) => void;
}

export function createMailServer({
	allowList,
	headers,
	max,
	info,
	debug,
}: CreateMailServerOptions) {
	const mails: ParsedMail[] = [];

	return new SMTPServer({
		authOptional: true,
		onMailFrom(address, _session, cb) {
			if (allowList.length == 0 || allowList.indexOf(address.address) !== -1) {
				cb();
			} else {
				cb(new Error("Invalid email from: " + address.address));
			}
		},
		onAuth(auth, _session, callback) {
			info("SMTP login for user: " + auth.username);
			callback(null, {
				user: auth.username,
			});
		},
		onData(stream, _session, callback) {
			parseEmail(stream, { useHeaders: !!headers }).then(mail => {
				debug(JSON.stringify(mail, null, 2));

				EmailStore.insert([mail]);

				//trim list of emails if necessary
				while (mails.length > max) {
					EmailStore.removeLast();
				}

				callback();
			}, callback);
		},
	});
}
