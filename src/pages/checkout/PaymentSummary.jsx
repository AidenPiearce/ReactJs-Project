import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";
import { ordersApi } from "../../services/api";

export function PaymentSummary({ paymentSummary, loadCart }) {
  const navigate = useNavigate();

  const createOrder = async () => {
    await ordersApi.create();
    await loadCart();
    navigate('/orders');
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>
      {paymentSummary && (
        <>
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.itemCount}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.subtotalCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping & handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.subtotalCents + paymentSummary.shippingCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCents)}
            </div>
          </div>

          <button className="place-order-button button-primary"
            onClick={createOrder}
          >
            Place your order
          </button>
        </>
      )}
    </div>
  );
}