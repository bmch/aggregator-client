import { useState, useEffect } from "react";
import Products from "components/Products";
import FilterPrices from "components/FilterPrices";
import filterSelectorRanges from "lib/createFilterSelectorRanges";
import { useRouter } from "next/router";

const ProductContainer = ({ data }) => {

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
		if (!router.query.road_bikes_under || !router.isReady) {
			setVisibleData(data);
			return;
		}
		if (router.query.road_bikes_under) {
			let priceRangesArr = router.query.road_bikes_under.split(",");
			setVisibleData({
				...data,
				allBikes: data.allBikes.filter((bike) => {
					return priceRangesArr.some((beginAndEnd) => {
						let priceRange = beginAndEnd.split("-");
						return (
							bike.price <= parseInt(priceRange[0]) &&
							bike.price >= parseInt(priceRange[1])
						);
					});
				}),
			});
		}
	}, [router.query]);


	const [visibleData, setVisibleData] = useState(data);


	const priceRangeSelectors = filterSelectorRanges(data.allBikes, 'price', 50000, 100);
	const weightBounds = filterSelectorRanges(avgWeightsOfBikes, 'avgWeight', 0.5, 0.01)


	return (
		<div>
			<FilterPrices bounds={priceRangeSelectors} />
			<Products data={visibleData} />
		</div>
	);
};

export default ProductContainer;
