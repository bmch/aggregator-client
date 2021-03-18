import { useState, useEffect } from "react";
import Products from "components/Products";
import SortFilterData from "components/SortFilterData";
import filterBounds from "lib/filterBounds";
import { useRouter } from "next/router";

const ProductContainer = ({ data }) => {
	// work out ranges and counts for select options
	const router = useRouter();
	let priceRangesArr;

	if (router.query.road_bikes_under) {
		priceRangesArr = router.query.road_bikes_under.split("%2C");
	}

	const [visibleData, setVisibleData] = useState(data);
	const bounds = filterBounds(data.allBikes, 50000);

	useEffect(() => {
		if (!priceRangesArr) {
			setVisibleData(data); // will need fixed when more filters are added
			return;
		}

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
	}, [priceRangesArr]);

	return (
		<div>
			<SortFilterData priceRangesArr={priceRangesArr} bounds={bounds} />
			<Products data={visibleData} />
		</div>
	);
};

export default ProductContainer;
