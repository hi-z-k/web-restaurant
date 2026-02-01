import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.js';
import '../styles/CartReceipt.css';

const CartReceipt = ({ deliveryFee }) => {
  const { cart, cartTotal } = useContext(CartContext);
  
  const now = new Date();

  const receipt = {
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    items: cart.map(item => ({
      id: item.id,
      label: `${item.count}X ${item.name}`,
      formattedPrice: `${(item.price * item.count).toLocaleString()} ETB`
    })),
    subtotal: `${cartTotal.toLocaleString()} ETB`,
    delivery: `${deliveryFee.toLocaleString()} ETB`,
    total: `${(cartTotal + deliveryFee).toLocaleString()} ETB`
  };

  return (
    <div className="receipt-container">
      <div className="receipt-header">
        <h2 className="receipt-title">Your Order</h2>
        <div className="receipt-meta">
          {receipt.date} &bull; {receipt.time}
        </div>
      </div>

      <div className="receipt-divider"></div>

      <div className="receipt-items">
        {receipt.items.map((item) => (
          <div key={item.id} className="receipt-row">
            <span className="receipt-item-name">{item.label}</span>
            <span className="receipt-item-price">{item.formattedPrice}</span>
          </div>
        ))}
      </div>

      <div className="receipt-divider"></div>

      <div className="receipt-summary">
        <div className="receipt-row">
          <span>SUBTOTAL</span>
          <span>{receipt.subtotal}</span>
        </div>
        <div className="receipt-row">
          <span>DELIVERY FEE</span>
          <span>{receipt.delivery}</span>
        </div>
        <div className="receipt-total-row">
          <span>TOTAL</span>
          <span>{receipt.total}</span>
        </div>
      </div>
    </div>
  );
};

export default CartReceipt;