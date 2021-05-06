import PriceFilter from "components/PriceFilter";
import WeightFilter from "components/WeightFilter";
import SortSelector from "components/SortSelector";
import BrandFilter from "components/BrandFilter";
import styled from "styled-components";

const SelectorContainer = styled.div`
	display: flex;
	background: #eeeeee;
`;

const FilterList = ({
	selector,
	priceParam,
	weightParam,
	data,
	avgWeightsOfBikes,
	sortSelection,
	visibleData,
}) => {
	return (
		<SelectorContainer>
			{selector === "price" && (
				<PriceFilter
					priceParam={priceParam}
					weightParam={weightParam}
					data={data}
					avgWeightsOfBikes={avgWeightsOfBikes}
				/>
			)}
			{selector === "weight" && (
				<WeightFilter
					priceParam={priceParam}
					weightParam={weightParam}
					data={data}
					visibleData={visibleData}
				/>
			)}
			{selector === "brand" && (
				<BrandFilter
					priceParam={priceParam}
					avgWeightsOfBikes={avgWeightsOfBikes}
					weightParam={weightParam}
					data={data}
					visibleData={visibleData}
					brandParam="brand"
				/>
			)}

			{selector === "sort" && (
				<SortSelector
					data={data}
					visibleData={visibleData}
					sortSelection={sortSelection}
				/>
			)}
		</SelectorContainer>
	);
};

export default FilterList;
