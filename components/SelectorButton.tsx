import styled from "styled-components";

const DownTriangle = styled.span`
	transform: rotate(45deg);
	font-size: 0.95rem;
	display: inline-block;
	margin-left: 1.1rem;
	position: absolute;
`;

const UpTriangle = styled.span`
	transform: rotate(45deg) translate(0.3rem, 0.3rem);
	font-size: 0.95rem;
	display: inline-block;
	margin-left: 1rem;
	position: absolute;
`;

const StyleButton = styled.button`
	background: white;
	border-radius: 6px;
	border: 1px solid #c2c2c2;
	font-size: 1.6rem;
	position: relative;
	display: inline-block;
	padding-right: 2.9rem;
	padding-left: 1.2rem;
	padding-top: 0.7rem;
	padding-bottom: 0.7rem;
	margin: 1rem;

	${({ selected }) =>
		selected &&
		`
    border:1px solid rgb(231,118,0)!important;
    color:rgb(231,118,0);
  `};
`;

const Capitalize = styled.span`
	text-transform: capitalize;
`;

const SelectorButton = ({ handleSelectorChange, selector, value }) => {
	return (
		<StyleButton
			selected={selector === value}
			onClick={() => handleSelectorChange(value)}>
			<Capitalize>{value}</Capitalize>
			{selector !== value && <DownTriangle>&#9698;</DownTriangle>}
			{selector === value && <UpTriangle>&#9700;</UpTriangle>}
		</StyleButton>
	);
};

export default SelectorButton;
