import { Accordion } from "@chakra-ui/react";
import { ParsedMail } from "mailparser";
import * as React from "react";

import EmailItem from "./EmailItem";

type Props = {
	emails: ParsedMail[];
};

const EmailList = ({ emails }: Props) => {
	return (
		<Accordion allowMultiple>
			{emails.map(email => (
				<EmailItem key={email.date} email={email} />
			))}
		</Accordion>
	);
};

export default React.memo(EmailList);
