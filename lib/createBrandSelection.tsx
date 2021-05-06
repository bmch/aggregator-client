export default function createBrandSelection(data) {
	const brandCounts = {};
	data.allBikes.forEach((bike) => {
		if (!brandCounts[bike.brand.name]) {
			brandCounts[bike.brand.name] = 1;
		} else brandCounts[bike.brand.name]++;
	});

	let uniqueBrands = [];
	for (const [key, value] of Object.entries(brandCounts)) {
		uniqueBrands.push([key, value]);
	}
	return uniqueBrands.sort((a, b) => {
		if (a[0] < b[0]) {
			return -1;
		}
		if (a[0] > b[0]) {
			return 1;
		}
	});
}
