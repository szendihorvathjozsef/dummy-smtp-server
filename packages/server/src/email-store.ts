import type { ParsedMail } from "mailparser";

let emails: ParsedMail[] = [];

export const EmailStore = {
	get: () => emails,
	insert: (nextEmails: ParsedMail[]) => {
		emails = [...nextEmails, ...emails];
	},
	removeLast: () => {
		emails = emails.slice(0, -1);
	},
	clear: () => {
		emails = [];
	},
};
