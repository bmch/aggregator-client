import { useState, useEffect } from "react";
import Products from "components/Products";
import filterSelectorRanges from "lib/createFilterSelectorRanges";
import { useRouter } from "next/router";
import formatMoney from "lib/formatMoney";
import FilterCheckboxes from "./FilterCheckboxes";

const ProductContainer = ({ data }) => {
	const PRICE_PARAM = 'road_bikes_under'
	const WEIGHT_PARAM = 'light_kg_road_bikes'

	const avgWeightsOfBikes = data.allBikes.map(bike => {
		let sumOfWeights = 0;
		let avgWeight = 0;
		if (bike.weight && bike.weight.length) {
			sumOfWeights = bike.weight.reduce((accum, val) => accum + parseFloat(val.weight_in_kg), 0)
			avgWeight = sumOfWeights / bike.weight.length
		}
		return { avgWeight: avgWeight.toFixed(2), id: bike.id }
	})


	const router = useRouter();

	useEffect(() => {
		if (!router.query || !router.isReady) {
			setVisibleData(data);
			return;
		}
		if (router.query[PRICE_PARAM]) {
			let priceRangesArr = router.query[PRICE_PARAM].split(",");
			setVisibleData({
				...data,
				allBikes: data.allBikes.filter((bike) => {
					return priceRangesArr.some((beginAndEnd) => {
						let priceRange = beginAndEnd.split("-");
						return (
							bike.price <= parseFloat(priceRange[0]) &&
							bike.price >= parseFloat(priceRange[1])
						);
					});
				}),
			});
		}


		if (router.query[WEIGHT_PARAM]) {
			let weightRangesArr = router.query[WEIGHT_PARAM].split(",");
			setVisibleData({
				...data,
				allBikes: data.allBikes.filter((bike) => {
					return weightRangesArr.some((beginAndEnd) => {
						let weightRange = beginAndEnd.split("-");

						const { avgWeight } = avgWeightsOfBikes.find(b => b.id == bike.id)

						return (
							avgWeight <= parseFloat(weightRange[0]) &&
							avgWeight >= parseFloat(weightRange[1])
						);
					});
				}),
			});
		}


	}, [router.query]);


	const [visibleData, setVisibleData] = useState(data);


	const priceRangeSelectors = filterSelectorRanges(data.allBikes, 'price', 50000, 100);
	const weightSelectors = filterSelectorRanges(avgWeightsOfBikes, 'avgWeight', 0.5, 0.01)
	const formatWeight = (value) => value.toFixed(2)
	return (
		<div>
			<FilterCheckboxes
				bounds={priceRangeSelectors}
				queryParam={PRICE_PARAM}
				formatUnits={formatMoney}
			/>
			<FilterCheckboxes
				bounds={weightSelectors}
				queryParam={WEIGHT_PARAM}
				formatUnits={formatWeight}
			/>
			<Products data={visibleData} />
		</div>
	);
};

export default ProductContainer;
