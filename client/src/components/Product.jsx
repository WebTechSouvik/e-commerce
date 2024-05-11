import React from "react";
import StarRatings from "react-star-ratings";
import {Link} from  "react-router-dom"

const Product = ({product}) => {
const {name,price,images,_id}=product
	// console.log(product)
	return (
		<Link to={`/product/${_id}`}className="lg:h-[350px] h-[250px] text-sm lg:text-lg flex items-start  flex-col gap-3 rounded-xl font-['Poppins'] font-bold  pl-5 hover:-translate-y-3 transition-all duration-300 ease-out group">
		<div className="w-full h-1/2">
			<img src={images[0]?.url} className="w-full h-full aspect object-contain mix-blend-darken"/>
			</div>
			<p className=" text-left text-sm w-full truncate lg:text-lg">{name}</p>
			<StarRatings starSpacing='1px' rating={product.avgRating} starDimension={window.screen.width>=1024?"20px":"15px"} starRatedColor='#ff6347'/>
			<p>${price}</p>
	
		</Link>
	);
};

export default Product;
