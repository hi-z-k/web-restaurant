import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/MenuItem.css';

const MenuItem = ({ item }) => {
  const { cart, addToCart, updateCount } = useContext(CartContext);
  const cartItem = cart.find((i) => i.id === item.id);
  const count = cartItem ? cartItem.count : 0;

  return (
    <div className="menu-item-card">
      <div className="menu-item-image-wrapper">
        <img src={item.image} alt={item.name} className="menu-item-img" />
      </div>
      
      <div className="menu-item-content">
        <div className="menu-item-info">
          <h3 className="menu-item-name">{item.name}</h3>
          <p className="menu-item-ingredients">{item.ingredients}</p>
        </div>

        <div className="menu-item-action">
          <p className="menu-item-price">{item.price} ETB</p>
          
          {count === 0 ? (
            <button className="menu-item-add-btn" onClick={() => addToCart(item)}>
              Add to Order
            </button>
          ) : (
            <div className="menu-item-qty-controls">
              <button className="menu-item-qty-btn" onClick={() => updateCount(item.id, -1)}>-</button>
              <span className="menu-item-qty-count">{count}</span>
              <button className="menu-item-qty-btn" onClick={() => updateCount(item.id, 1)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;