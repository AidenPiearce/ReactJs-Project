import "./OrdersPage.css";
import { Header } from "../components/Header";
import { Link } from "react-router";
import { useEffect, useState, Fragment } from "react";
import { FormatDeliveryMoney } from "../utils/money";
import { OrdersGrid } from "./OrdersGrid";
import { ordersApi } from "../services/api";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function call() {
      const data = await ordersApi.getAll(true);
      setOrders(data);
    }
    call();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="/ReactJs-Project/Local/orders-favicon.png" />
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}