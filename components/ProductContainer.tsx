import { useState, useEffect } from "react";
import Products from "components/Products";
import FilterPrices from "components/FilterPrices";
import filterBounds from "lib/filterBounds";
import { useRouter } from "next/router";

const ProductContainer = ({ data }) => {

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
	const bounds = filterBounds(data.allBikes, 50000);

	return (
		<div>
			<FilterPrices bounds={bounds} />
			<Products data={visibleData} />
		</div>
	);
};

export default ProductContainer;
