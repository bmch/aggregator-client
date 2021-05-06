import styled from "styled-components";
import formatMoney from "lib/formatMoney";
import formatName from "lib/formatName";
import MiniReviews from "components/MiniReviews";
import calculateAvgScore from "lib/calculateAvgScore";

const Card = styled.div`
	background: white;
	padding: 5rem 3rem 5rem 3rem;
	cursor: pointer;
	font-size: 1.7rem;
	overflow: hidden;

	img {
		height: 32rem;
		display: block;
		margin-left: auto;
		margin-right: auto;
		transition: all 0.3s ease 0s;
		:hover {
			transform: scale(1.03);
		}
	}
`;
const Capitalize = styled.div`
	text-transform: capitalize;
`;

export default function Product({ product }) {
	const avgScore = calculateAvgScore(product.review);

	return (
		<Card>
			<img
				src={product?.photo?.image?.publicUrlTransformed}
				alt={product.name}
			/>
			<div>{formatMoney(product.price)}</div>
			<Capitalize>{formatName(product.name)}</Capitalize>
			<div>Average Score {avgScore}%</div>
			<MiniReviews reviews={product.review}></MiniReviews>
			<div>{product.brand.name}</div>
		</Card>
	);
}
