import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import Page from "components/Page";
import Nav from "components/Nav";

function MyApp({ Component, pageProps }) {
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={apolloClient}>
			<Page>
				<Nav />
				<Component {...pageProps} />
			</Page>
		</ApolloProvider>
	);
}

export default MyApp;
