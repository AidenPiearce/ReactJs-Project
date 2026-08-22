import { useState } from "react";
import { formatMoney } from "../../utils/money";
import { cartApi } from "../../services/api";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false)

  const addToCart = async () => {
    await cartApi.add(product.id, quantity);
    await loadCart();
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false)
    }, 1000);
  }

  const SelectQuantity = (event) => {
    const QuantitySelected = Number(event.target.value);
    setQuantity(QuantitySelected)
  }

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image}
          data-testid="product-image"
        />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img
                  data-testid="rating-image"
                  className="product-rating-stars"
                  src={`/ReactJs-Project/images/ratings/rating-${product.rating.stars * 10}.png`}
                />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select value={quantity}
          onChange={SelectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart"
              style={{
                opacity: addedToCart ? 1 : 0,
                transform: addedToCart ? 'scale(1)' : 'scale(0.8)',
                transition: 'opacity 0.15s ease, transform 0.15s ease',
              }}
            >
              <img src="/ReactJs-Project/images/icons/checkmark.png"

              />
              Added
            </div>

      <button className="add-to-cart-button button-primary"
        onClick={addToCart}
        data-testid='add-to-cart-button'
      >
        Add to Cart
      </button>
    </div >
  )
}