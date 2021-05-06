import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Products from "components/Products";
import averageWeight from "lib/averageWeight";
import calculateAvgScore from "lib/calculateAvgScore";
import WidgetContainer from "components/WidgetContainer";

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
	const PRICE_PARAM = "price_range";
	const WEIGHT_PARAM = "bike_weight_kg";
	const BRAND_PARAM = "brand";

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
		const hasBrandFilters = !!router.query[BRAND_PARAM];

		let priceRangesArr;
		let weightRangesArr;
		let brandsArr;
		let sort;

		hasPriceFilters
			? (priceRangesArr = (router.query[PRICE_PARAM] as string).split(","))
			: null;
		hasWeightFilters
			? (weightRangesArr = (router.query[WEIGHT_PARAM] as string).split(","))
			: null;
		hasBrandFilters
			? (brandsArr = (router.query[BRAND_PARAM] as string).split(","))
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
							: true) &&
						(hasBrandFilters
							? brandsArr.some((brand) => {
									return bike.brand.name === brand;
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

	return (
		<>
			<WidgetContainer
				priceParam={PRICE_PARAM}
				weightParam={WEIGHT_PARAM}
				data={data}
				visibleData={visibleData}
				avgWeightsOfBikes={avgWeightsOfBikes}
				sortSelection={sortSelection}
			/>
			<Products data={visibleData} />
		</>
	);
};

export default ProductContainer;
