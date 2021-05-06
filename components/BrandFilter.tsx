import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import BrandCheckboxes from "components/BrandCheckboxes";

const BrandFilter = ({
	data,
	visibleData,
	brandParam,
	priceParam,
	weightParam,
	avgWeightsOfBikes,
}) => {
	const [filterData, setFilterData] = useState(data);
	const router = useRouter();

	useEffect(() => {
		if (!router.query || !router.isReady) {
			setFilterData(data);
			return;
		}

		const hasPriceFilters = !!router.query[priceParam];
		const hasWeightFilters = !!router.query[weightParam];

		let priceRangesArr;
		let weightRangesArr;

		hasPriceFilters
			? (priceRangesArr = (router.query[priceParam] as string).split(","))
			: null;
		hasWeightFilters
			? (weightRangesArr = (router.query[weightParam] as string).split(","))
			: null;

		setFilterData({
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
			<BrandCheckboxes
				queryParam={brandParam}
				data={filterData}
				visibleData={visibleData}
			/>
		</>
	);
};

export default BrandFilter;
