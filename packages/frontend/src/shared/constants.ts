import { removeTrailingSlash } from "./helper";

export const BASE_URL = import.meta.env.DEV
	? "http://localhost:1080"
	: removeTrailingSlash(`${window.location.origin}${window.location.pathname}`);

export const ENDPOINTS = {
	fetchEmails: "/api/emails",
};
