import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { CheckBoxSelect, CheckboxLabel } from "components/FilterCheckboxes";
import createBrandSelction from "lib/createBrandSelection";
const BrandCheckboxes = ({ queryParam, data, visibleData }) => {
	const router = useRouter();

	const brandSelectionCounts = createBrandSelction(data);
	const initialState = brandSelectionCounts.reduce(
		(options, option): { [key: string]: boolean } => ({
			...options,
			[option[0]]: false,
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
		return (
			<CheckBoxSelect key={val} selected={formState[val[0]]}>
				<CheckboxLabel selected={formState[val[0]]}>
					{val[0]} <span>({val[1]})</span>
					<input
						onChange={handleCheckboxChange}
						name={val[0]}
						value={val[0]}
						type="checkbox"
						checked={formState[val[0]]}
					/>
				</CheckboxLabel>
			</CheckBoxSelect>
		);
	};

	const createCheckboxes = () => brandSelectionCounts.map(createCheckbox);

	return (
		<div>
			<form>
				<ul>{createCheckboxes()}</ul>
			</form>
		</div>
	);
};

export default BrandCheckboxes;
