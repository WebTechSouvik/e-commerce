import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import OrderStep from "../../components/OrderStep.jsx";
import { createOrderSteps } from "../../constant/orderConstant.js";
import Metadata from "../../components/Metadata.jsx";

const stripePromise = loadStripe("pk_test_51OrjwrSBnPFKEk3agmFX98ZCvdQBbpUIOWmCoCUtdtshBqtYCBvZei0c8W9iGMGz8rZFnCV9fxho582gVHc0vaAJ00MS4k8da3");

const PaymentPage = () => {
	const { stripeClientKey } = useSelector((state) => state.order);
	return (
		<>
			<Metadata tittle="Payment - Ecommerce" />
			<div className="mt-[100px]">
				<OrderStep active={2} steps={createOrderSteps} />
				{stripeClientKey && (
					<div className="mt-12">
						<EmbeddedCheckoutProvider
							stripe={stripePromise}
							options={{ clientSecret: stripeClientKey }}
						>
							<EmbeddedCheckout />
						</EmbeddedCheckoutProvider>
					</div>
				)}
			</div>
		</>
	);
};

export default PaymentPage;
