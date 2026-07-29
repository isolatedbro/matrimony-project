import { useState } from "react";
// import Razorpay from "razorpay";
import styles from "./Payment.module.css";

const API_URL = import.meta.env.VITE_API_URL;
const Payment = () => {
  const token = localStorage.getItem("token");
    console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);
    const [success, setSuccess] = useState(null);
//   const [response, setResponse] = useState({});

  const payment = { item: `premium` };
  const createOrder = async () => {
    const res = await fetch(`${API_URL}/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payment),
    });

    const order = await res.json();
    // setResponse(order);
    console.log("ORDER", order);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      handler: async (response) => {
        const res = await fetch(`${API_URL}/payment/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const result = await res.json();
        console.log("AFTER VERIFICATION", result);
        setSuccess(result.success);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div className={styles.container}>
        {success === null && <button className={styles.buyButton} onClick={createOrder}>
          Buy
        </button>}
        {success === true && <h2>Payment verified</h2>}
        {success === false && <h2>Payment failed</h2>}
      </div>
    </>
  );
};

export default Payment;
