export default function averageWeight(arr) {
	return arr.map((bike) => {
		let sumOfWeights = 0;
		let avgWeight = 0;
		if (bike.weight && bike.weight.length) {
			sumOfWeights = bike.weight.reduce(
				(accum, val) => accum + parseFloat(val.weight_in_kg),
				0
			);
			avgWeight = sumOfWeights / bike.weight.length;
		}
		return { avgWeight: avgWeight.toFixed(2), id: bike.id };
	});
}
