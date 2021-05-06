import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import styled from "styled-components";
import { CheckBoxSelect } from "components/FilterCheckboxes";

const SortSelector = ({ data, visibleData, sortSelection }) => {
	const router = useRouter();

	const [formState, setFormState] = useState(null);

	// create form state from url query params
	useEffect(() => {
		if (!router.isReady) return;
		if (
			router.query.sort &&
			sortSelection.some((val) => val.value === router.query.sort)
		) {
			setFormState(router.query.sort);
		}
	}, [router.isReady]);

	useEffect(() => {
		const pathAndQueryParams = { pathname: "/", query: router.query };
		// if a sort value is selected
		if (formState) {
			pathAndQueryParams.query.sort = formState;
		} else {
			delete pathAndQueryParams.query.sort;
		}

		router.push(pathAndQueryParams, undefined, {
			scroll: false,
			shallow: true,
		});
	}, [formState]);

	const handleChange = (value) => {
		setFormState(value);
	};

	const createOptions = (val) => {
		return (
			<CheckBoxSelect
				onClick={() => handleChange(val.value)}
				selected={formState === val.value}>
				{val.content}
			</CheckBoxSelect>
		);
	};

	const createSelection = () => sortSelection.map(createOptions);

	return (
		<div>
			<ul>{createSelection()}</ul>
		</div>
	);
};

export default SortSelector;
