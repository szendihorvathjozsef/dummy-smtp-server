import { ParsedMail } from "mailparser";
import { useQuery } from "react-query";

import { AxiosInstance } from "@/shared/axios";
import { ENDPOINTS } from "@/shared/constants";

export const QUERY_KEY = "emails";

async function getEmails() {
	const { data } = await AxiosInstance.get<ParsedMail[]>(ENDPOINTS.fetchEmails);

	return data;
}

export function useEmails() {
	return useQuery({ queryKey: QUERY_KEY, queryFn: getEmails, retry: false });
}
