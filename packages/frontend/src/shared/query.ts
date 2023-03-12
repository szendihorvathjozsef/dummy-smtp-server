import { QueryClient } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: { queries: { cacheTime: 36000 } },
});

export default queryClient;
