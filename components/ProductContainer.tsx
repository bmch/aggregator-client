import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Products from "components/Products";
import PriceFilter from "components/PriceFilter";
import WeightFilter from "components/WeightFilter";
import SortSelector from "components/SortSelector";
import SelectorButtons from "components/SelectorButtons";
import averageWeight from "lib/averageWeight";
import calculateAvgScore from "lib/calculateAvgScore";

const SelectorContainer = styled.div`
	display: flex;
	background: #eeeeee;
`;

const sortSelection = [
	{ value: "price-asc", content: "Price: Low to High" },
	{ value: "price-desc", content: "Price: High to Low" },
	{ value: "review-desc", content: "Rating" },
	{ value: "weight-asc", content: "Weight: Low to High" },
	{ value: "weight-desc", content: "Weight: High to Low" },
	{ value: "date-desc", content: "Release Date" },
];

const DownTriangle = styled.span`
	transform: rotate(45deg);
	font-size: 0.95rem;
	display: inline-block;
	margin-left: 0.7rem;
	position: absolute;
	//border: 1px solid blue;
`;
const ProductContainer = ({ data }) => {
	const PRICE_PARAM = "road_bikes_under";
	const WEIGHT_PARAM = "light_kg_road_bikes";

	const avgWeightsOfBikes = averageWeight(data.allBikes);

	const [visibleData, setVisibleData] = useState(data);
	const router = useRouter();

	useEffect(() => {
		if (!router.query || !router.isReady) {
			setVisibleData(data);
			return;
		}

		const hasPriceFilters = !!router.query[PRICE_PARAM];
		const hasWeightFilters = !!router.query[WEIGHT_PARAM];
		const hasSort = !!router.query.sort;

		let priceRangesArr;
		let weightRangesArr;
		let sort;

		hasPriceFilters
			? (priceRangesArr = (router.query[PRICE_PARAM] as string).split(","))
			: null;
		hasWeightFilters
			? (weightRangesArr = (router.query[WEIGHT_PARAM] as string).split(","))
			: null;
		hasSort ? (sort = router.query.sort) : null;

		if (
			hasSort &&
			sortSelection.some((val) => val.value === router.query.sort)
		) {
			sort = router.query.sort;
		}

		setVisibleData({
			...data,
			allBikes: data.allBikes
				.filter((bike) => {
					return (
						(hasPriceFilters
							? priceRangesArr.some((beginAndEnd) => {
									let priceRange = beginAndEnd.split("-");
									return (
										bike.price <= parseFloat(priceRange[0]) &&
										bike.price >= parseFloat(priceRange[1])
									);
							  })
							: true) &&
						(hasWeightFilters
							? weightRangesArr.some((beginAndEnd) => {
									let weightRange = beginAndEnd.split("-");
									const { avgWeight } = avgWeightsOfBikes.find(
										(b) => b.id == bike.id
									);
									return (
										avgWeight <= parseFloat(weightRange[0]) &&
										avgWeight >= parseFloat(weightRange[1])
									);
							  })
							: true)
					);
				})
				.sort((a, b) => {
					switch (sort) {
						case "price-asc":
							return a.price - b.price;
						case "price-desc":
							return b.price - a.price;
						case "weight-asc":
						case "weight-desc":
							const aWeight = avgWeightsOfBikes.find((bike) => bike.id == a.id);
							const bWeight = avgWeightsOfBikes.find((bike) => bike.id == b.id);
							if (sort == "weight-asc")
								return aWeight.avgWeight - bWeight.avgWeight;
							if (sort == "weight-desc")
								return bWeight.avgWeight - aWeight.avgWeight;

						case "review-desc":
							const scoreA = calculateAvgScore(a.review);
							const scoreB = calculateAvgScore(b.review);
							return scoreB - scoreA;

						case "date-desc":
					}
				}),
		});
	}, [router.query]);

	const [selector, setSelector] = useState(null);

	const handleSelectorChange = (value) => {
		if (value === selector) {
			setSelector(null);
			return;
		}
		setSelector(value);
	};
	return (
		<>
			<SelectorButtons handleSelectorChange={handleSelectorChange} />
			<SelectorContainer>
				{selector === "price" && (
					<PriceFilter
						priceParam={PRICE_PARAM}
						weightParam={WEIGHT_PARAM}
						data={data}
						avgWeightsOfBikes={avgWeightsOfBikes}
					/>
				)}
				{selector === "weight" && (
					<WeightFilter
						priceParam={PRICE_PARAM}
						weightParam={WEIGHT_PARAM}
						data={data}
						visibleData={visibleData}
					/>
				)}
				{selector === "sort" && (
					<SortSelector
						data={data}
						visibleData={visibleData}
						sortSelection={sortSelection}
					/>
				)}
			</SelectorContainer>
			<Products data={visibleData} />
		</>
	);
};

export default ProductContainer;
