import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import MenuItem from '../components/MenuItem';
import PaginationContainer from '../components/PaginationContainer';

const Menu = () => {
  const { addToCart, updateCount, cart } = useContext(CartContext);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/menu')
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const styles = {
    section: { 
      padding: '100px 12%', 
      background: 'var(--bg-color)' 
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '30px' 
    },
    title: { 
      fontFamily: '"Bebas Neue", cursive', 
      fontSize: '3.5rem', 
      textAlign: 'center', 
      color: '#fff', 
      marginBottom: '50px' 
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '50px',
      gap: '15px'
    },
    pageBtn: {
      padding: '10px 20px',
      background: 'var(--secondary-bg)',
      color: '#fff',
      border: '1px solid var(--main-color)',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: '0.3s'
    },
    activeBtn: {
      background: 'var(--main-color)',
      color: '#fff',
      padding: '10px 20px',
      border: '1px solid var(--main-color)',
      borderRadius: '4px',
      fontWeight: 'bold'
    }
  };

  if (loading) return <div style={{ textAlign: 'center', color: '#fff', padding: '100px' }}>Loading Menu...</div>;

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
    <section style={styles.section} id="menu">
      <h2 style={styles.title}>Our Signature Menu</h2>
      
      <PaginationContainer 
        components={menuItemsArray} 
        itemsPerPage={6} 
      />
    </section>
);
};

export default Menu;