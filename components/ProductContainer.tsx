import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Products from "components/Products";
import PriceFilter from "components/PriceFilter";
import WeightFilter from "components/WeightFilter";
import averageWeight from "lib/averageWeight";

const SelectorContainer = styled.div`
	display: flex;
`;

const ProductContainer = ({ data }) => {
	const PRICE_PARAM = "road_bikes_under";
	const WEIGHT_PARAM = "light_kg_road_bikes";

	const [visibleData, setVisibleData] = useState(data);

	const router = useRouter();

	const avgWeightsOfBikes = averageWeight(data.allBikes);

	useEffect(() => {
		if (!router.query || !router.isReady) {
			setVisibleData(data);
			return;
		}
		setVisibleData(data);

		const hasPriceFilters = !!router.query[PRICE_PARAM];
		const hasWeightFilters = !!router.query[WEIGHT_PARAM];

		let priceRangesArr;
		let weightRangesArr;

		hasPriceFilters
			? (priceRangesArr = router.query[PRICE_PARAM].split(","))
			: null;
		hasWeightFilters
			? (weightRangesArr = router.query[WEIGHT_PARAM].split(","))
			: null;

		setVisibleData({
			...data,
			allBikes: data.allBikes.filter((bike) => {
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
			}),
		});
	}, [router.query]);

	return (
		<>
			<SelectorContainer>
				<PriceFilter queryParam={PRICE_PARAM} data={visibleData} />
				<WeightFilter
					queryParam={WEIGHT_PARAM}
					data={data}
					visibleData={visibleData}
				/>
			</SelectorContainer>
			<Products data={visibleData} />
		</>
	);
};

export default ProductContainer;
