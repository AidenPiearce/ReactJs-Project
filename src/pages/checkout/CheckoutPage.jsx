import { useEffect, useState } from "react";
import "./CheckoutHeader.css";
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { FormatDeliveryMoney } from "../../utils/money";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { deliveryOptionsApi, paymentSummaryApi } from "../../services/api";

dayjs.extend(relativeTime);

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDelivertyOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const data = await deliveryOptionsApi.getAll();
      setDelivertyOptions(data);
    };
    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummaryData = async () => {
      const data = await paymentSummaryApi.get();
      setPaymentSummary(data);
    };
    fetchPaymentSummaryData();
  }, [cart])

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/ReactJs-Project/Local/cart-favicon.png" />
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