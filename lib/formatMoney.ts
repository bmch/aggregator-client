export default function formatMoney(amount = 0) {
	const options = {
		style: "currency",
		currency: "GBP",
		minimumFractionDigits: 2,
	};

	amount /= 100;
	amount % 1 === 0 ? (options.minimumFractionDigits = 0) : null;

	const formatter = new Intl.NumberFormat("en-US", options);

	return formatter.format(amount);
}
