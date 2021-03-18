export default function filterBounds(data, increment: number): number[][] {
	const prices = data.map((bike) => bike.price);
	prices.sort((a, b) => a - b);

	// increments will be 500.00 (50000 pennies)
	const lowestBound = Math.floor(prices[0] / increment) * increment;
	const bounds = [];
	let lowerParam = lowestBound;
	let upperParam = lowestBound + increment - 100;

	while (upperParam < prices[prices.length - 1]) {
		let count = 0;

		for (let i = 0; i < prices.length; i++) {
			if (prices[i] >= lowerParam && prices[i] <= upperParam) {
				count++;
			}
			if (prices[i] > upperParam) break;
		}

		bounds.push([lowerParam, upperParam, count]);
		lowerParam += increment;
		upperParam += increment;
	}

	return bounds;
}
