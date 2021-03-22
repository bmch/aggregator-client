import formatMoney from "lib/formatMoney";
import { useState } from 'react'
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from 'react'

const FilterPrices = ({ bounds }) => {
	const router = useRouter()
	const CheckBoxSelect = styled.label`
	display:block;
	`;
	const boundsStrings = bounds.filter((option => option[2] > 0)).map(option => `${option[1]}-${option[0]}`)

	const initialState = boundsStrings.reduce((options, option) => ({
		...options,
		[option]: false
	}), {})

	const [formState, setFormState] = useState(initialState)

	useEffect(() => {
		if (!router.isReady) return;
		if (router.query.road_bikes_under) {
			const priceRangesArr = router.query.road_bikes_under.split(",");
			const selectedOptions = { ...initialState }
			priceRangesArr.forEach(priceRange => {
				if (selectedOptions.hasOwnProperty(priceRange)) {
					selectedOptions[priceRange] = true
				}
			})
			setFormState(selectedOptions)
		}
	}, [router.isReady]);


	const createUrlQueryParamsFromState = () => {
		let result = []
		for (const [key, value] of Object.entries(formState)) {
			if (value) {
				result.push(key)
			}
		}
		let str = result.join(',')
		return str
	}

	useEffect(() => {
		const pathAndQueryParams = { pathname: '/', query: router.query }

		// if any option(s) are selected
		if (createUrlQueryParamsFromState().length) {
			pathAndQueryParams.query.road_bikes_under = createUrlQueryParamsFromState()
		} else {
			delete pathAndQueryParams.query.road_bikes_under
		}

		router.push(pathAndQueryParams,
			undefined,
			{ scroll: false, shallow: true }
		);

	}, [formState]);



	const handleCheckboxChange = changeEvent => {
		const { name } = changeEvent.target;
		setFormState({
			...formState,
			[name]: !formState[name]
		});
	};

	const createCheckbox = val => {
		if (val[2] > 0) return (
			<CheckBoxSelect key={val}>
				{formatMoney(val[0])}-{formatMoney(val[1])} ({val[2]})
				<input
					onChange={handleCheckboxChange}
					name={`${val[1]}-${val[0]}`}
					value={`${val[1]}-${val[0]}`}
					type="checkbox"
					checked={formState[`${val[1]}-${val[0]}`]}
				/>
			</CheckBoxSelect>
		)
	};

	const createCheckboxes = () => bounds.map(createCheckbox);

	return (
		<div>
			<form>
				{createCheckboxes()}
			</form>
		</div>
	);
};

export default FilterPrices;
