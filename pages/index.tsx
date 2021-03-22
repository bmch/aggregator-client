import { initializeApollo, addApolloState } from "lib/apolloClient";
import ProductContainer from "components/ProductContainer";
import { ALL_PRODUCTS_QUERY } from "components/Products";

const IndexPage = ({ data }) => {
	return <ProductContainer data={data} />;
};

export async function getStaticProps() {
	const apolloClient = await initializeApollo();

	const { data, errors } = await apolloClient.query({
		query: ALL_PRODUCTS_QUERY,
	});

	if (errors) {
		console.error(errors);
		throw new Error(
			"Errors were detected in GraphQL query inside getStaticProps function"
		);
	}
	return addApolloState(apolloClient, {
		props: { data },
		revalidate: 1,
	});
}

export default IndexPage;
