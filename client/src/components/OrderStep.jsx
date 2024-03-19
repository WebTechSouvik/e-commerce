import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { GiConfirmed } from "react-icons/gi";
import { MdLocalShipping, MdLibraryAddCheck } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";



function OrderStep({active,steps}) {

const style={
	"& .Mui-completed":{
		"&.MuiSvgIcon-root":{color:"green"},
		"&.MuiStepLabel-iconContainer":{color:"green"},
		"& .MuiStepConnector-line":{borderColor:"green"}
		
	},
	"& .Mui-active":{
		"&.MuiSvgIcon-root":{color:"#ff6347"},
		"&.MuiStepLabel-iconContainer":{color:"#ff6347"},
		"& .MuiStepConnector-line":{borderColor:"green"}
	}
}


	return (
		<Stepper activeStep={active}  alternativeLabel  sx={style}>
			{steps.map((label,index) => (
				<Step key={label.name} >
					<StepLabel
						// icon={label.icon||<GiConfirmed className="lg:text-2xl"/>}
						{...(label.icon && {icon:label.icon}) }

						
					>
						{label.name}
					</StepLabel>
				</Step>
			))}
		</Stepper>
	);
}

export default OrderStep;
