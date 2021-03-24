import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import filterSelectorRanges from "lib/createFilterSelectorRanges";
import FilterCheckboxes from "components/FilterCheckboxes";
import averageWeight from "lib/averageWeight";

const WeightFilter = ({ priceParam, weightParam, data, visibleData }) => {
	const [filterData, setFilterData] = useState(data);
	const router = useRouter();

	useEffect(() => {
		if (!router.query || !router.isReady) {
			setFilterData(data);
			return;
		}

		const hasPriceFilters = !!router.query[priceParam];

		let priceRangesArr;

		hasPriceFilters
			? (priceRangesArr = router.query[priceParam].split(","))
			: null;

		setFilterData({
			...data,
			allBikes: data.allBikes.filter((bike) => {
				return hasPriceFilters
					? priceRangesArr.some((beginAndEnd) => {
							let priceRange = beginAndEnd.split("-");
							return (
								bike.price <= parseFloat(priceRange[0]) &&
								bike.price >= parseFloat(priceRange[1])
							);
					  })
					: true;
			}),
		});
	}, [router.query]);

	const formatWeight = (value) => value.toFixed(2) + "kg";

	const avgWeightsOfVisibleBikes = averageWeight(filterData.allBikes);

	const weightSelectors = filterSelectorRanges(
		avgWeightsOfVisibleBikes,
		"avgWeight",
		0.5,
		0.01
	);

	return (
		<>
			<FilterCheckboxes
				bounds={weightSelectors}
				queryParam={weightParam}
				formatUnits={formatWeight}
			/>
		</>
	);
};

export default WeightFilter;
