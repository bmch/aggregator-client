import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

export const CheckBoxSelect = styled.li`
	color: #2c2b2b;
	display: block;
	cursor: pointer;
	background: white;
	width: 20rem;
	:hover {
		background: #dee9f8;
	}
	border-radius: 0.5rem;
	margin: 0.8rem;
	padding: 0.2rem 0.8rem 0.2rem 0.8rem;
	${({ selected }) =>
		selected &&
		`
		color:white;
		font-weight: 900;
		font-size:1.5rem;
    background: #2E70CF;
	:hover {
		background: #2E70CF;
	}
  `};
`;

export const CheckboxLabel = styled.label`
	margin: 0;
	width: 100%;
	display: block;
	cursor: inherit;
	input {
		cursor: inherit;
		-webkit-appearance: none;
		-moz-appearance: none;
		-o-appearance: none;
		appearance: none;
	}
	span {
		color: #918b8b;
		${({ selected }) =>
			selected &&
			`
		color:white;
		font-weight: 900;
		font-size:1.5rem;
  `};
	}
`;

const FilterCheckboxes = ({ bounds, queryParam, formatUnits }) => {
	const router = useRouter();

	const boundsStrings = bounds
		.filter((option) => option[2] > 0)
		.map((option) => `${option[1]}-${option[0]}`);

	const initialState = boundsStrings.reduce(
		(options, option) => ({
			...options,
			[option]: false,
		}),
		{}
	);

	const [formState, setFormState] = useState(initialState);

	// create form state from url query params
	useEffect(() => {
		if (!router.isReady) return;
		if (router.query[queryParam]) {
			const filterRangesArr = (router.query[queryParam] as string).split(",");
			const selectedOptions = { ...initialState };
			filterRangesArr.forEach((filterRange) => {
				if (selectedOptions.hasOwnProperty(filterRange)) {
					selectedOptions[filterRange] = true;
				}
			});
			setFormState(selectedOptions);
		}
	}, [router.isReady]);

	const createUrlQueryParamsFromState = () => {
		let result = [];
		for (const [key, value] of Object.entries(formState)) {
			if (value) {
				result.push(key);
			}
		}
		let str = result.join(",");
		return str;
	};

	useEffect(() => {
		const pathAndQueryParams = { pathname: "/", query: router.query };

		// if any option(s) are selected
		if (createUrlQueryParamsFromState().length) {
			pathAndQueryParams.query[queryParam] = createUrlQueryParamsFromState();
		} else {
			delete pathAndQueryParams.query[queryParam];
		}

		router.push(pathAndQueryParams, undefined, {
			scroll: false,
			shallow: true,
		});
	}, [formState]);

	const handleCheckboxChange = (changeEvent) => {
		const { name } = changeEvent.target;
		setFormState({
			...formState,
			[name]: !formState[name],
		});
	};

	const createCheckbox = (val) => {
		if (val[2] > 0 || formState[`${val[1]}-${val[0]}`])
			return (
				<CheckBoxSelect key={val} selected={formState[`${val[1]}-${val[0]}`]}>
					<CheckboxLabel selected={formState[`${val[1]}-${val[0]}`]}>
						{formatUnits(val[0])}-{formatUnits(val[1])} <span>({val[2]})</span>
						<input
							onChange={handleCheckboxChange}
							name={`${val[1]}-${val[0]}`}
							value={`${val[1]}-${val[0]}`}
							type="checkbox"
							checked={formState[`${val[1]}-${val[0]}`]}
						/>
					</CheckboxLabel>
				</CheckBoxSelect>
			);
	};

	const createCheckboxes = () => bounds.map(createCheckbox);

	return (
		<div>
			<form>
				<ul>{createCheckboxes()}</ul>
			</form>
		</div>
	);
};

export default FilterCheckboxes;
