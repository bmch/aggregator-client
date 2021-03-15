export default function formatDate(isoString: string): string {
	const formatDate = new Date(isoString);
	const options: Intl.DateTimeFormatOptions = {
		year: "2-digit",
		month: "short",
		day: "numeric",
	};
	return formatDate.toLocaleDateString("en-GB", options);
}
