import dayjs from "dayjs";
import { Fragment } from "react";
import { Link } from "react-router";
import { OrdersHeader } from "./OrdersHeader";
import axios from "axios"

export function OrdersGrid({ orders, loadCart }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {



        return (
          <div key={order.id} className="order-container">
            <OrdersHeader order={order} />

            <div className="order-details-grid">
              {order.products.map((orderProduct) => {

                const addToCart = async () => {

                  await axios.post('/api/cart-items/', {
                    productId: orderProduct.productId,
                    quantity: 1
                  });
                  await loadCart();
                  console.log('loadCart();')
                }

                return (
                  <Fragment key={orderProduct.productId}>
                    <div className="product-image-container">
                                          <img src={`/ReactJs-Project/${orderProduct.product.image}`} />
                                        </div>

                    <div className="product-details">
                      <div className="product-name">{orderProduct.name}</div>
                      <div className="product-delivery-date">
                        Arriving on:
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                          "MMMM D",
                        )}
                      </div>
                      <div className="product-quantity">
                        Quantity: {orderProduct.quantity}
                      </div>
                      <button className="buy-again-button button-primary">
                                              <img
                                                className="buy-again-icon"
                                                src="/ReactJs-Project/images/icons/buy-again.png"
                                              />
                                              <span className="buy-again-message"
                                                onClick={addToCart}
                                              >Add to Cart</span>
                                            </button>
                    </div>

                    <div className="product-actions">
                      <Link
                        to={`/tracking/${order.id}/${orderProduct.product.id}`}
                      >
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </Link>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
