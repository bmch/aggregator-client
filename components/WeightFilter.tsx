import filterSelectorRanges from "lib/createFilterSelectorRanges";
import FilterCheckboxes from "components/FilterCheckboxes";
import averageWeight from "lib/averageWeight";

const WeightFilter = ({ queryParam, data, visibleData }) => {
	const formatWeight = (value) => value.toFixed(2) + "kg";

	const avgWeightsOfVisibleBikes = averageWeight(visibleData.allBikes);

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
				queryParam={queryParam}
				formatUnits={formatWeight}
			/>
		</>
	);
};

export default WeightFilter;
