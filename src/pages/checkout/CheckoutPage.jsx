import axios from "axios";
import { useEffect, useState } from "react";
import "./CheckoutHeader.css";
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { FormatDeliveryMoney } from "../../utils/money";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

dayjs.extend(relativeTime);

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDelivertyOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDelivertyOptions(response.data);
    };
    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummaryData = async () => {
      let response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    fetchPaymentSummaryData();
  }, [cart])

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/Local/cart-favicon.png" />
      <CheckoutHeader paymentSummary={paymentSummary} />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} loadCart={loadCart} deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
