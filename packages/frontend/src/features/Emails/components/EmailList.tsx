import { Accordion, Alert, AlertIcon, AlertTitle, Box } from "@chakra-ui/react";
import { ParsedMail } from "mailparser";
import * as React from "react";

import EmailItem from "./EmailItem";

type Props = {
	emails: ParsedMail[];
};

const EmailList = ({ emails }: Props) => {
	if (emails.length === 0) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" h="100%">
				<Alert w="20rem" status="warning">
					<AlertIcon />
					<AlertTitle>There is no email sent.</AlertTitle>
				</Alert>
			</Box>
		);
	}

	return (
		<Accordion allowMultiple>
			{emails.map(email => (
				<EmailItem key={email.date} email={email} />
			))}
		</Accordion>
	);
};

export default React.memo(EmailList);
