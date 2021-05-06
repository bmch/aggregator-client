import SelectorButton from "components/SelectorButton";

const SelectorButtons = ({ handleSelectorChange, selector }) => {
	return (
		<div>
			<SelectorButton
				handleSelectorChange={handleSelectorChange}
				selector={selector}
				value="price"
			/>
			<SelectorButton
				handleSelectorChange={handleSelectorChange}
				selector={selector}
				value="weight"
			/>
			<SelectorButton
				handleSelectorChange={handleSelectorChange}
				selector={selector}
				value="brand"
			/>
			<SelectorButton
				handleSelectorChange={handleSelectorChange}
				selector={selector}
				value="sort"
			/>
		</div>
	);
};

export default SelectorButtons;
