import { FormatDeliveryMoney } from "../../utils/money";
import dayjs from "dayjs";
import { cartApi } from "../../services/api";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {

        const updateDeliveryOption = async () => {
          await cartApi.updateDeliveryOption(cartItem.productId, deliveryOption.id);
          await loadCart();
        };

        return (
          <div key={deliveryOption.id} className="delivery-option"
            onClick={updateDeliveryOption}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => { }}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
                {" ("}
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).fromNow()}
                {")"}
              </div>
              <div className="delivery-option-price">
                {FormatDeliveryMoney(deliveryOption.priceCents)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}