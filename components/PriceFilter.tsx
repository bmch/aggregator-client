import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import filterSelectorRanges from "lib/createFilterSelectorRanges";
import formatMoney from "lib/formatMoney";
import FilterCheckboxes from "components/FilterCheckboxes";

const PriceFilter = ({ priceParam, weightParam, data, avgWeightsOfBikes }) => {
	const [filterData, setFilterData] = useState(data);
	const router = useRouter();

	useEffect(() => {
		if (!router.query || !router.isReady) {
			setFilterData(data);
			return;
		}
		const hasWeightFilters = !!router.query[weightParam];
		if (!hasWeightFilters) {
			setFilterData(data);
		} else {
			const weightRangesArr = router.query[weightParam].split(",");

			setFilterData({
				...data,
				allBikes: data.allBikes.filter((bike) => {
					return weightRangesArr.some((beginAndEnd) => {
						let weightRange = beginAndEnd.split("-");
						const { avgWeight } = avgWeightsOfBikes.find(
							(b) => b.id == bike.id
						);
						return (
							avgWeight <= parseFloat(weightRange[0]) &&
							avgWeight >= parseFloat(weightRange[1])
						);
					});
				}),
			});
		}
	}, [router.query]);

	const priceRangeSelectors = filterSelectorRanges(
		filterData.allBikes,
		"price",
		50000,
		100
	);

	return (
		<>
			<FilterCheckboxes
				bounds={priceRangeSelectors}
				queryParam={priceParam}
				formatUnits={formatMoney}
			/>
		</>
	);
};

export default PriceFilter;
