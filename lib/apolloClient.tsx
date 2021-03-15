const uri = "http://localhost:3000/api/graphql";
import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
export const APOLLO_STATE_PROP_NAME = "apolloStaticCache";

let apolloClient;

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === "undefined", // set to true for SSR
		link: new HttpLink({ uri }),
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient();
	if (initialState) {
		const existingCache = _apolloClient.extract();
		_apolloClient.cache.restore({ ...existingCache, ...initialState });
	}
	if (typeof window === "undefined") return _apolloClient;
	if (!apolloClient) apolloClient = _apolloClient;
	return _apolloClient;
}

export function addApolloState(client, pageProps) {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
	}
	return pageProps;
}

export function useApollo(initialState) {
	const store = useMemo(() => initializeApollo(initialState), [initialState]);
	return store;
}
