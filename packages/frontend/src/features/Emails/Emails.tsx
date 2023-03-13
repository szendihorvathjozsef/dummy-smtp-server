import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	CircularProgress,
	Container,
	Stack,
	Text,
} from "@chakra-ui/react";
import { MdAutorenew } from "react-icons/md";
import { useQueryClient } from "react-query";

import EmailList from "./components/EmailList";
import { QUERY_KEY, useEmails } from "./use-emails";

const Emails = () => {
	const emails = useEmails();
	const queryClient = useQueryClient();

	async function handleRefresh() {
		await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
	}

	console.log(emails.isFetching);

	return (
		<>
			<Stack
				px="4"
				bgColor="blue.100"
				as="header"
				direction="row"
				alignItems="center"
			>
				<Text flex="1" as="h1" fontSize="6xl">
					Your emails
				</Text>
				<Button
					isDisabled={emails.isLoading}
					onClick={handleRefresh}
					leftIcon={<MdAutorenew />}
				>
					Refresh
				</Button>
			</Stack>
			<Container maxW="container.lg">
				<main>
					{emails.data && <EmailList emails={emails.data} />}
					{emails.error && (
						<Alert status="error">
							<AlertIcon />
							<AlertTitle>Your emails couldn&apos;t be loaded.</AlertTitle>
							<AlertDescription>Please, try it again later.</AlertDescription>
						</Alert>
					)}
					{emails.isFetching && (
						<CircularProgress isIndeterminate color="green.300" />
					)}
				</main>
			</Container>
		</>
	);
};

export default Emails;
