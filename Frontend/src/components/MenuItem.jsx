import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const MenuItem = ({ item }) => {
  const { cart, addToCart, updateCount } = useContext(CartContext);
  const cartItem = cart.find((i) => i.id === item.id);
  const count = cartItem ? cartItem.count : 0;
  const { user } = useContext(AuthContext);

  const styles = {
    card: {
      background: 'var(--secondary-bg)',
      borderRadius: '12px',
      border: '1px solid rgba(147, 112, 219, 0.15)',
      textAlign: 'center',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '420px',
    },
    imageContainer: {
      width: '100%',
      aspectRatio: '16 / 9',
      overflow: 'hidden',
      background: '#1a1a2e',
      flexShrink: 0
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    content: {
      padding: '20px',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    infoSection: {
      marginBottom: '15px',
    },
    name: {
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '1.6rem',
      color: '#fff',
      marginBottom: '8px',
      display: '-webkit-box',
      WebkitLineClamp: '1',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    ingredients: {
      fontSize: '0.85rem',
      color: 'var(--main-color)',
      fontStyle: 'italic',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: '3',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      minHeight: '3.6em'
    },
    actionArea: {
      marginTop: 'auto'
    },
    price: {
      color: '#fff',
      fontSize: '1.3rem',
      fontWeight: '700',
      marginBottom: '10px'
    },
    btn: {
      padding: '12px 20px',
      background: 'var(--main-color)',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '1.1rem',
      width: '100%'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px'
    },
    qtyBtn: {
      padding: '5px 15px',
      background: 'var(--main-color)',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1.2rem'
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={item.image} alt={item.name} style={styles.img} />
      </div>

      <div style={styles.content}>
        <div style={styles.infoSection}>
          <h3 style={styles.name}>{item.name}</h3>
          <p style={styles.ingredients}>{item.ingredients}</p>
        </div>

        <div style={styles.actionArea}>
          <p style={styles.price}>{item.price} ETB</p>

          {user && (
            count === 0 ? (
              <button style={styles.btn} onClick={() => addToCart(item)}>
                Add to Order
              </button>
            ) : (
              <div style={styles.controls}>
                <button style={styles.qtyBtn} onClick={() => updateCount(item.id, -1)}>-</button>
                <span style={{ color: '#fff', fontSize: '1.2rem', minWidth: '20px' }}>{count}</span>
                <button style={styles.qtyBtn} onClick={() => updateCount(item.id, 1)}>+</button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;