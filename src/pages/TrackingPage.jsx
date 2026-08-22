import { Header } from "../components/Header.jsx";
import { Link, useParams } from "react-router";
import "./tracking.css";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration)
import "./TrackingPage.css"

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams()
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,

      );

      setOrder(response.data);

    }
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return null;
  }


  function findProduct() {
    return order.products.find((product) => product.productId === productId);
  }

  const product = findProduct();
  const productData = product.product;



  function progressBar() {

    const total = product.estimatedDeliveryTimeMs - order.orderTimeMs
    const timePassed = dayjs().valueOf() - order.orderTimeMs
    const progress = Math.min(Math.max((timePassed / total) * 100, 0), 100);
    return progress
  }



  const progress = progressBar();

  function ArrivalText() {
    if (progress >= 100) {
      return (
        <div className="delivery-date">
          Delivered
        </div>
      )

    } else {
      return (
        <div className="delivery-date">
          Arriving on{" "}
          {dayjs(product.estimatedDeliveryTimeMs).format("dddd MMMM D")}
        </div>
      )
    }
  }

  let isPreparing;
  let isShipped;
  let isDelivered;

  if (progress < 33) { isPreparing = progress }
  if (progress >= 33 && progress < 100) { isShipped = progress }
  if (progress === 100) { isDelivered = progress }




  return (
    <>
      <title>Tracking</title>
            <link rel="icon" type="image/svg+xml" href="/ReactJs-Project/Local/orders-favicon.png" />

            <Header cart={cart} />
            <div className="tracking-page">
              <div className="order-tracking">
                <Link className="back-to-orders-link link-primary" to="/orders">
                  View all orders
                </Link>


                <ArrivalText />

                <div className="product-info">{productData.name}</div>

                <div className="product-info">Quantity: {productData.quantity}</div>

                <img className="product-image" src={`/ReactJs-Project/${productData.image}`} />

          <div className="progress-labels-container">
            <div className={`progress-label  ${isPreparing && 'current-status'}`}>Preparing</div>
            <div className={`progress-label ${isShipped && 'current-status'}`} >Shipped</div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} ></div>
          </div>
        </div>
      </div >
    </>
  );
}
