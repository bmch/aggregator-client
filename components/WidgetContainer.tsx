import { useState } from "react";
import SelectorButtons from "components/SelectorButtons";
import FilterList from "components/FilterList";

const WidgetContainer = ({
	priceParam,
	weightParam,
	data,
	visibleData,
	avgWeightsOfBikes,
	sortSelection,
}) => {
	const [selector, setSelector] = useState(null);

	const handleSelectorChange = (value) => {
		if (value === selector) {
			setSelector(null);
			return;
		}
		setSelector(value);
	};

	return (
		<div>
			<SelectorButtons
				selector={selector}
				handleSelectorChange={handleSelectorChange}
			/>
			<FilterList
				selector={selector}
				priceParam={priceParam}
				weightParam={weightParam}
				data={data}
				visibleData={visibleData}
				avgWeightsOfBikes={avgWeightsOfBikes}
				sortSelection={sortSelection}
			/>
		</div>
	);
};

export default WidgetContainer;
