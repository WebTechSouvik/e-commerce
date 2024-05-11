import React from "react";
import { Avatar } from "@mui/material";
import StarRatings from "react-star-ratings";
import Profile from "../images/Profile.png";

const Review = ({review}) => {
	return (
		<div className="flex flex-col justify-center gap-4  py-3 lg:px-3">
			<Avatar alt="Remy Sharp" src={review?.owner?.avtar?.url?review.owner.avtar.url:Profile} />
			<StarRatings
				starSpacing="1px"
				rating={review.rating}
				starDimension="20px"
				starRatedColor="#ff6347"
			/>
			<div className="text-pretty">{review.description}</div>
		</div>
	);
};

export default Review;
