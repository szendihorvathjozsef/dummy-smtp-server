import { Attachment } from "mailparser";

export function openAttachment(attachment: Attachment) {
	const byteArray = new Uint8Array(attachment.content.data);
	const file = new Blob([byteArray], { type: attachment.contentType });
	const fileURL = URL.createObjectURL(file);
	window.open(fileURL);
}

export function removeTrailingSlash(url: string) {
	return url.replace(/\/$/, "");
}
