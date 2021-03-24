import filterSelectorRanges from "lib/createFilterSelectorRanges";
import formatMoney from "lib/formatMoney";
import FilterCheckboxes from "components/FilterCheckboxes";

const PriceFilter = ({ queryParam, data }) => {
	const priceRangeSelectors = filterSelectorRanges(
		data.allBikes,
		"price",
		50000,
		100
	);

	return (
		<>
			<FilterCheckboxes
				bounds={priceRangeSelectors}
				queryParam={queryParam}
				formatUnits={formatMoney}
			/>
		</>
	);
};

export default PriceFilter;
