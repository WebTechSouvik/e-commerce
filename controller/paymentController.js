import asyncHandler from "../utils/asynchandler.js";
import Apierror from "../utils/customerror.js";
import Stripe from "stripe";

export const createCheckoutSession = asyncHandler(async (req, res) => {
    const { orderItems } = req.body;
    const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

    const customer = await stripe.customers.create({
        name: "souvik ghosh",
        address: {
            line1: "chanditala(panpara)",
            city: "chanditala",
            postal_code: "712702",
            state: "west bengal",
            country: "india",
        },
    });

    const lineItems = orderItems.map((item) => ({
        price_data: {
            currency: "INR",
            product_data: {
                name: item.product.name,
                images: item.product.images.map((image)=>image.url),
            },
            unit_amount: item.product.price*100,
        },
        quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        customer: customer.id,
        line_items: lineItems,
        mode: "payment",
        return_url: "http://localhost:3000/order/sucess",
    });

    res.send({ clientSecret: session.client_secret });
});
