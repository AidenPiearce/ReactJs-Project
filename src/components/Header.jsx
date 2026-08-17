import { useState } from "react";
import "./header.css";
import { NavLink, useNavigate } from "react-router";

export function Header({ cart }) {
  let totalQuantity = 0;
  const [search, setSearch] = useState('')

  const navigate = useNavigate();





  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src="Local/logo-white.png" />
            <img className="mobile-logo" src="Local/mobile-logo-white.png" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                navigate(`/?search=${search}`)

              }
            }}
          />

          <button className="search-button"
            onClick={() => {
              navigate(`/?search=${search}`)
            }}

          >
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
