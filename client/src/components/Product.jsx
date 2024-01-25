import React from "react";
import StarRatings from "react-star-ratings";
import {Link} from  "react-router-dom"

const Product = ({product}) => {
const {name,price,images,_id}=product
	console.log(product)
	return (
		<Link to={`/product/${_id}`}className="min-w-[23%]  h-[350px] flex items-start  flex-col gap-3 rounded-xl font-['Poppins'] font-bold  pl-5 hover:-translate-y-3 transition-all duration-300 ease-out group">
		<div className="w-full h-4/6">
			<img src={images[0]} className="w-full h-full aspect object-contain mix-blend-darken"/>
			</div>
			<p>{name}</p>
			<StarRatings starSpacing='1px' rating={2} starDimension='20px' starRatedColor='#ff6347'/>
			<p>${price}</p>
	
		</Link>
	);
};

export default Product;
