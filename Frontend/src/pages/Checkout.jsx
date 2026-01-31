import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.count, 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const styles = {
    container: {
      padding: '40px 12%',
      color: '#fff',
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: '40px',
      minHeight: '80vh'
    },
    header: {
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '2.5rem',
      marginBottom: '30px',
      gridColumn: '1 / -1'
    },
    section: {
      background: 'var(--secondary-bg)',
      padding: '30px',
      borderRadius: '12px',
      border: '1px solid rgba(147, 112, 219, 0.15)',
      height: 'fit-content'
    },
    sectionTitle: {
      marginBottom: '20px',
      color: 'var(--main-color)'
    },
    formGroup: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    input: {
      padding: '12px',
      borderRadius: '6px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: '#1a1a2e',
      color: '#fff',
      fontSize: '1rem'
    },
    summaryScroll: {
      maxHeight: '300px',
      overflowY: 'auto',
      marginBottom: '20px'
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      fontSize: '0.95rem',
      color: 'rgba(255, 255, 255, 0.8)'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'var(--main-color)'
    },
    btn: {
      width: '100%',
      padding: '15px',
      background: 'var(--main-color)',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '1.3rem',
      marginTop: '20px',
      transition: '0.3s'
    },
    emptyContainer: {
      textAlign: 'center',
      padding: '100px 12%',
      color: '#fff'
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    alert('Order Received! We are preparing your food.');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h2 style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '3rem' }}>Your Cart is Empty</h2>
        <p>Add some delicious items to get started.</p>
        <Link to="/menu">
          <button style={{ ...styles.btn, width: '200px' }}>Go to Menu</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Complete Your Order</h1>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Delivery Information</h3>
        <form onSubmit={handleOrder}>
          <div style={styles.formGroup}>
            <label>Full Name</label>
            <input style={styles.input} type="text" required placeholder="Abebe Bikila" />
          </div>
          <div style={styles.formGroup}>
            <label>Phone Number</label>
            <input style={styles.input} type="tel" required placeholder="+251 9..." />
          </div>
          <div style={styles.formGroup}>
            <label>Detailed Address</label>
            <textarea 
              style={{ ...styles.input, minHeight: '100px', resize: 'vertical' }} 
              required 
              placeholder="Bole, Around Edna Mall..." 
            />
          </div>
          <button type="submit" style={styles.btn}>Place Order</button>
        </form>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Order Summary</h3>
        <div style={styles.summaryScroll}>
          {cart.map(item => (
            <div key={item.id} style={styles.summaryItem}>
              <span>{item.count}x {item.name}</span>
              <span>{item.price * item.count} ETB</span>
            </div>
          ))}
        </div>
        
        <div style={styles.summaryItem}>
          <span>Subtotal</span>
          <span>{subtotal} ETB</span>
        </div>
        <div style={styles.summaryItem}>
          <span>Delivery Fee</span>
          <span>{deliveryFee} ETB</span>
        </div>
        <div style={styles.totalRow}>
          <span>Total</span>
          <span>{total} ETB</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;