import formatMoney from "lib/formatMoney";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

const SortFilterData = ({ bounds, priceRangesArr }) => {
	const CheckBoxSelect = styled.div``;
	const router = useRouter();

	const handleInputChange = (e) => {
		const { value } = e.target;

		if (!priceRangesArr) {
			// router.push(
			// 	{
			// 		pathname: "/",
			// 		query: { road_bikes_under: value },
			// 	},
			// 	undefined,
			// 	{ scroll: false, shallow: false }
			// );
			// return;

			router.query.road_bikes_under = value;
			console.log("router is ", router);
			router.push(router);
			return;
		}

		// const indexOfTarget = priceRangesArr.indexOf(value);

		// // if priceRangeArr already contains the value selected
		// // remove it and update the query string

		// if (indexOfTarget !== -1) {
		// 	priceRangesArr.splice(indexOfTarget, 1);
		// 	// if array length is now 0
		// 	if (!priceRangesArr.length) {
		// 		router.push(
		// 			{
		// 				pathname: "/",
		// 				// you need to keep other queries and remove road_bikes_under
		// 				// query: { road_bikes_under: value },
		// 			},
		// 			undefined,
		// 			{ scroll: false, shallow: false }
		// 		);
		// 	}

		// 	// join this array if length > 1? ? ?

		// 	const priceRangesJoined = priceRangesArr.join("%2C");
		// 	if (priceRangesArr.length) {
		// 		router.push(
		// 			{
		// 				pathname: "/",
		// 				query: { road_bikes_under: priceRangesJoined },
		// 			},
		// 			undefined,
		// 			{ scroll: false, shallow: false }
		// 		);
		// 	}
		// } else {
		// 	priceRangesArr.push(value);
		// 	router.push(
		// 		{
		// 			pathname: "/",
		// 			query: { road_bikes_under: priceRangesArr.join("%2C") },
		// 		},
		// 		undefined,
		// 		{ scroll: false, shallow: false }
		// 	);
		// }
	};

	return (
		<div>
			test test
			<form>
				{bounds.map((val, index) => {
					if (val[2] > 0) {
						return (
							<CheckBoxSelect key={index + ""}>
								{/* <Link
									href={{
										pathname: "/",
										query: { road_bikes_under: `${val[1]}-${val[0]}` },
									}}> */}
								<label>
									{formatMoney(val[0])}-{formatMoney(val[1])} ({val[2]})
									<input
										onChange={handleInputChange}
										name={`${val[1]}-${val[0]}`}
										value={`${val[1]}-${val[0]}`}
										type="checkbox"
										checked={
											priceRangesArr &&
											priceRangesArr.includes(`${val[1]}-${val[0]}`)
										}
									/>
								</label>
								{/* </Link> */}
							</CheckBoxSelect>
						);
					}
				})}
			</form>
		</div>
	);
};

export default SortFilterData;
