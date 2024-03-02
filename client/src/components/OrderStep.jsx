import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { MdLocalShipping, MdLibraryAddCheck } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";

const steps = [
	{
		name: "Shipping Details",
		icon: <MdLocalShipping className="lg:text-2xl" />,
	},
	{
		name: "Confirm Order",
		icon: <MdLibraryAddCheck className="lg:text-2xl" />,
	},
	{ name: "Payment", icon: <BsBank2 className="lg:text-2xl" /> },
];

function OrderStep({active}) {
	return (
		<Stepper activeStep={active} alternativeLabel>
			{steps.map((label,index) => (
				<Step key={label}>
					<StepLabel
						icon={label.icon}
						sx={{
							".Mui-completed": { color: "green" },

							".Mui-active": { color: "#ff6347" },
						}}
					>
						{label.name}
					</StepLabel>
				</Step>
			))}
		</Stepper>
	);
}

export default OrderStep;
