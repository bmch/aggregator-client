export default function calculateAvgScore(reviews): number {
	const averages = reviews.map((element) => {
		const scoreArr = element.score.split("/");
		return parseFloat(scoreArr[0]) / parseInt(scoreArr[1]);
	});

	return Math.round(
		(averages.reduce(function (sum, value) {
			return sum + value;
		}, 0) /
			averages.length) *
			100
	);
}
