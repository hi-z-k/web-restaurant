import { useState, useEffect, useContext } from 'react';
import { fetchMenu } from '../services/api';
import { CartContext } from '../context/CartContext';
import MenuItem from '../components/MenuItem';
import PaginationContainer from '../components/PaginationContainer';
import '../styles/Menu.css';

const Menu = () => {
  const { addToCart, updateCount, cart } = useContext(CartContext);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu()
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="menu-loading">Loading Menu...</div>;
  }

  const menuItemsArray = menuData.map((item) => (
    <MenuItem 
      key={item.id} 
      item={item} 
      addToCart={addToCart}
      updateCount={updateCount}
      cartItem={cart?.find(i => i.id === item.id)}
    />
  ));

  return (
    <section className="menu-section" id="menu">
      <h2 className="menu-title">Our Signature Menu</h2>
      
      <PaginationContainer 
        components={menuItemsArray} 
        itemsPerPage={6} 
      />
    </section>
  );
};

export default Menu;