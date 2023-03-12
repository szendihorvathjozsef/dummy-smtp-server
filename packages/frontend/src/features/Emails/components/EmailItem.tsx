import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	List,
	ListItem,
} from "@chakra-ui/react";
import { format, formatDistanceToNow } from "date-fns";
import { ParsedMail } from "mailparser";

import { openAttachment } from "@/shared/helper";

type Props = {
	email: ParsedMail;
};

const EmailItem = ({ email }: Props) => {
	const from = email.from;
	const to = Array.isArray(email.to) ? email.to[0] : email.to;

	return (
		<AccordionItem>
			<h2>
				<AccordionButton>
					<Box flex="1">
						<Box display="flex" pb={2}>
							<Box as="span" flex="1" textAlign="left">
								{from?.value[0].name || from?.value[0].address}
							</Box>
							<Box as="span" flex="1" textAlign="left">
								{to?.value[0]?.name || to?.value[0].address}
							</Box>
						</Box>
						<Box as="p" textAlign="left">
							{email.subject}
						</Box>
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>
				<List>
					<ListItem>
						<strong>From:&nbsp;</strong>
						<span
							dangerouslySetInnerHTML={{ __html: email.from?.html ?? "" }}
						/>
					</ListItem>
					<ListItem>
						<strong>To:&nbsp;</strong>
						<span dangerouslySetInnerHTML={{ __html: to?.html ?? "" }} />
					</ListItem>
					<ListItem>
						<strong>Date:&nbsp;</strong>
						<span title={format(new Date(email.date ?? ""), "PPPP")}>
							{formatDistanceToNow(new Date(email.date ?? ""), {
								addSuffix: true,
							})}
						</span>
					</ListItem>
					<ListItem>
						<strong>Subject:&nbsp;</strong>
						{email.subject}
					</ListItem>
					<ListItem hidden={email.attachments.length === 0}>
						<b>Attachments: </b>
						<div>
							{email.attachments.map(attachment => (
								<Button
									size="sm"
									className="mr-1"
									onClick={() => openAttachment(attachment)}
									key={attachment.checksum}
								>
									{attachment.filename}
								</Button>
							))}
						</div>
					</ListItem>
				</List>
				<Box
					pt={2}
					className="email-content"
					dangerouslySetInnerHTML={{
						__html: email.html || email.textAsHtml || "",
					}}
				/>
			</AccordionPanel>
		</AccordionItem>
	);
};

export default EmailItem;
