import { isAfter, isBefore, toDate } from "date-fns";
import {
	AddressObject,
	Headers,
	ParsedMail,
	simpleParser,
	Source,
} from "mailparser";

interface ParseEmailOptions {
	useHeaders: boolean;
}

interface EmailFilterOptions {
	since?: Date;
	until?: Date;
	to?: string;
	from?: string;
}

export function formatHeaders(headers: Headers) {
	const result: Record<string, unknown> = {};
	for (const [key, value] of headers) {
		result[key] = value;
	}
	return result;
}

export function parseEmail(stream: Source, { useHeaders }: ParseEmailOptions) {
	return simpleParser(stream).then(email => {
		if (useHeaders) {
			email.headers = formatHeaders(email.headers) as any;
		} else {
			// @ts-ignore
			delete email.headers;
		}
		return email;
	});
}

function matchesEmailAddress(
	compare: string,
	recievers?: AddressObject | AddressObject[],
) {
	if (!recievers) {
		return false;
	}

	if (Array.isArray(recievers)) {
		return recievers.every(reciever =>
			reciever.value.every(v => v.address === compare),
		);
	}

	return recievers.value.every(v => v.address === compare);
}

export function emailFilter({ since, until, from, to }: EmailFilterOptions) {
	return (email: ParsedMail) => {
		if (since || until) {
			const date = toDate(email.date ?? new Date());
			if (since && isBefore(date, since)) {
				return false;
			}
			if (until && isAfter(date, until)) {
				return false;
			}
		}

		if (to && matchesEmailAddress(to, email.to)) {
			return false;
		}

		if (from && matchesEmailAddress(from, email.to)) {
			return false;
		}

		return true;
	};
}
