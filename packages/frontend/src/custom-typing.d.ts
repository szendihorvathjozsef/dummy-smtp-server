import type {
	ParsedMail as OGParsedMail,
	Attachment as OGAttachment,
} from "mailparser";

declare module "mailparser" {
	export interface ParsedMail extends Omit<OGParsedMail, "date"> {
		date: string;
	}

	export interface Attachment extends Omit<OGAttachment, "content"> {
		content: { data: number };
	}
}

export {};
