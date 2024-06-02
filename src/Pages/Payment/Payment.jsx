import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "./CheckoutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_Publishable_key);
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutFrom/>
        </Elements>
    );
};

export default Payment;