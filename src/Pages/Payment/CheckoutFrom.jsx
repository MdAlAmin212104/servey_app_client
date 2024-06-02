import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../hook/useAuth";
import { useEffect, useState } from "react";
import useAxiosCommon from "../../hook/useAxiosCommon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutFrom = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  useEffect(() => {
    axiosCommon.post("/create_payment_intent", { price: 24 }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosCommon]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError("[error]", error.message);
      console.log(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment system
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirmation error");
    } else {
      console.log("paymentIntent intent", paymentIntent);
    }

    if (paymentIntent.status == "succeeded") {
      console.log("transaction id", paymentIntent.id);
      setTransactionId(paymentIntent.id);

      // save payment information to database
      const payment = {
        email: user?.email,
        price: 24,
        transactionId: paymentIntent.id,
        date: new Date(), // utc data convert. use moment.js
      };

      const res = await axiosCommon.post("/payment", payment);
      console.log(res.data);
      if(res.data?.paymentResult.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your payment was successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/')
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm btn-primary my-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
        <p className="text-red-500">{error}</p>
        {
        transactionId && <p className="text-green-500">Transaction Id : {transactionId}</p>
        }
    </div>
  );
};

export default CheckoutFrom;
