
export const errorhaldeler=(err,req,res,next)=>{
	res.status(err.statusCode||500).json({
		message:err.message||"internal server error",
		status:err.status||"error"
	})

}