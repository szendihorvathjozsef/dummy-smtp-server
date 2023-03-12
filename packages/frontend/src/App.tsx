import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";

import { Emails } from "./features/Emails";
import queryClient from "./shared/query";

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<Emails />
			</ChakraProvider>
		</QueryClientProvider>
	);
};

export default App;
