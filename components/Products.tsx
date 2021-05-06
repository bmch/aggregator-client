import { gql } from "@apollo/client";
import styled from "styled-components";
import Product from "./Product";

export const ALL_PRODUCTS_QUERY = gql`
	query ALL_PRODUCTS_QUERY {
		allBikes {
			id
			name
			price
			description
			brand {
				name
			}
			photo {
				id
				image {
					publicUrlTransformed
				}
			}
			weight {
				size_in_cm
				weight_in_kg
			}
			review {
				publication {
					name
				}
				id
				score
				date
				author
			}
		}
	}
`;

const ProductsListStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 1.8rem;
	@media only screen and (max-width: 1000px) {
		grid-template-columns: 1fr;
	}
`;

const Products = ({ data }) => {
	return (
		<div>
			<ProductsListStyles>
				{data.allBikes.length &&
					data.allBikes.map((bike) => <Product key={bike.id} product={bike} />)}
			</ProductsListStyles>
		</div>
	);
};

export default Products;
