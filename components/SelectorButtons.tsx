import styled from "styled-components";

const DownTriangle = styled.span`
	transform: rotate(45deg);
	font-size: 0.95rem;
	display: inline-block;
	margin-left: 0.7rem;
	position: absolute;
	//border: 1px solid blue;
`;

const SelectorButtons = ({ handleSelectorChange }) => {
	return (
		<div>
			<button
				style={{
					position: "relative",
					display: "inline-block",
					paddingRight: "2.5rem",
				}}
				onClick={() => handleSelectorChange("price")}>
				Price
				<DownTriangle>&#9698;</DownTriangle>
			</button>
			<button onClick={() => handleSelectorChange("weight")}>Weight</button>
			<button onClick={() => handleSelectorChange("sort")}>Sort</button>
		</div>
	);
};

export default SelectorButtons;
