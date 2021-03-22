export default function filterSelectors(data, property, increment: number, unit = 100): number[][] {
	const extractedData = data.map((bike) => bike[property]);
	extractedData.sort((a, b) => a - b);
	const lowestBound = Math.floor(extractedData[0] / increment) * increment;
	const bounds = [];
	let lowerParam = lowestBound;
	let upperParam = lowestBound + increment - unit;

	while (lowerParam <= parseFloat(extractedData[extractedData.length - 1])) {
		let count = 0;

		for (let i = 0; i < extractedData.length; i++) {
			if (extractedData[i] >= lowerParam && extractedData[i] <= upperParam) {
				count++;
			}
			if (extractedData[i] > upperParam) break;
		}

		bounds.push([lowerParam, upperParam, count]);
		lowerParam += increment;
		upperParam += increment;
	}

	return bounds;
}
