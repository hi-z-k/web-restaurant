import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.js';

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

  const styles = {
    container: {
      background: 'var(--secondary-bg)',
      color: '#ffffff',
      padding: '50px 30px',
      borderRadius: '4px',
      fontFamily: '"Courier New", Courier, monospace',
      border: '1px solid rgba(147, 112, 219, 0.2)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
      maxWidth: '450px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    title: {
      margin: '0 0 10px 0',
      color: 'var(--main-color)',
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '2.2rem',
      letterSpacing: '2px'
    },
    meta: {
      opacity: 0.5,
      fontSize: '0.8rem',
      letterSpacing: '1px'
    },
    sectionDivider: {
      borderTop: '2px dashed rgba(255,255,255,0.1)',
      margin: '25px 0'
    },
    itemsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      fontSize: '0.9rem',
      lineHeight: '1.4'
    },
    itemName: {
      flex: '1',
      paddingRight: '20px',
      textTransform: 'uppercase'
    },
    itemPrice: {
      whiteSpace: 'nowrap',
      fontWeight: 'bold'
    },
    summarySection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '20px'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: '900',
      fontSize: '1.5rem',
      color: 'var(--main-color)',
      marginTop: '10px',
      paddingTop: '15px',
      borderTop: '1px solid rgba(255,255,255,0.2)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Your Order</h2>
        <div style={styles.meta}>
          {receipt.date} &bull; {receipt.time}
        </div>
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={styles.itemsContainer}>
        {receipt.items.map((item) => (
          <div key={item.id} style={styles.row}>
            <span style={styles.itemName}>{item.label}</span>
            <span style={styles.itemPrice}>{item.formattedPrice}</span>
          </div>
        ))}
      </div>

      <div style={styles.sectionDivider}></div>

      <div style={styles.summarySection}>
        <div style={styles.row}>
          <span>SUBTOTAL</span>
          <span>{receipt.subtotal}</span>
        </div>
        <div style={styles.row}>
          <span>DELIVERY FEE</span>
          <span>{receipt.delivery}</span>
        </div>
        <div style={styles.totalRow}>
          <span>TOTAL</span>
          <span>{receipt.total}</span>
        </div>
      </div>
    </div>
  );
};

export default CartReceipt;