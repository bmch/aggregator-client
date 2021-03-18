import React from "react";
import formatDate from "lib/formatDate";

const MiniReviews = ({ reviews }) => {
	return (
		<div>
			{reviews.map((review) => {
				return (
					<div key={review.id}>
						{review.score} {review.publication.name} {formatDate(review.date)}
					</div>
				);
			})}
		</div>
	);
};

export default MiniReviews;
