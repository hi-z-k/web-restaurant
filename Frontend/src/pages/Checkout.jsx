import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import MapPicker from '../components/MapPicker';
import CartReceipt from '../components/CartReceipt';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [location, setLocation] = useState({ lat: 9.0396, lng: 38.7630 });
    const [addInfo, setAddInfo] = useState('');
    const deliveryFee = 50;

    const styles = {
        page: {
            padding: '60px 10%',
            display: 'grid',
            gridTemplateAreas: `
        "receipt map"
        "receipt info"
        "receipt button"
      `,
            gridTemplateColumns: '1fr 1.5fr',
            gridTemplateRows: 'auto auto auto',
            gap: '30px',
            color: '#fff',
            maxWidth: '1400px',
            margin: '0 auto',
            alignItems: 'start'
        },
        receiptSection: { gridArea: 'receipt', position: 'sticky', top: '100px' },
        mapSection: { gridArea: 'map' },
        infoSection: {
            gridArea: 'info',
            background: 'var(--secondary-bg)',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.05)'
        },
        buttonSection: { gridArea: 'button' },
        sectionTitle: {
            fontFamily: '"Bebas Neue", cursive',
            fontSize: '2rem',
            marginBottom: '15px',
            color: 'var(--main-color)'
        },
        mapWrapper: { height: '350px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' },
        label: { display: 'block', marginBottom: '10px', color: '#ccc' },
        textarea: {
            width: '100%', padding: '15px', background: '#0a0a1a', color: '#fff',
            border: '1px solid #444', borderRadius: '8px', minHeight: '100px',
            fontSize: '1rem', fontFamily: 'inherit', resize: 'none', outline: 'none'
        },
        btn: {
            width: '100%', padding: '20px', background: 'var(--main-color)', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: 'pointer',
            fontFamily: '"Bebas Neue", cursive', fontSize: '1.6rem', transition: '0.3s ease'
        },
        emptyMessage: { textAlign: 'center', padding: '100px', color: '#fff' }
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        const orderData = {
            items: cart,
            coordinates: location,
            preferences: addInfo,
            summary: {
                subtotal: cart.reduce((acc, i) => acc + i.price * i.count, 0),
                fee: deliveryFee,
                finalTotal: cart.reduce((acc, i) => acc + i.price * i.count, 0) + deliveryFee
            }
        };

        console.log("Finalizing Order:", orderData);
        alert("Order successfully placed!");
        clearCart();
        navigate('/');
    };

    if (cart.length === 0) return (
        <div style={styles.emptyMessage}>
            <h2 style={styles.sectionTitle}>Your cart is empty.</h2>
        </div>
    );

    return (
        <div style={styles.page}>
            <div style={styles.receiptSection}>
                <h2 style={styles.sectionTitle}>Order Summary</h2>
                <CartReceipt cart={cart} deliveryFee={deliveryFee} />
            </div>

            <div style={styles.mapSection}>
                <h2 style={styles.sectionTitle}>Delivery Point</h2>
                <div style={styles.mapWrapper}>
                    <MapPicker location={location} setLocation={setLocation} />
                </div>
            </div>

            <div style={styles.infoSection}>
                <h2 style={styles.sectionTitle}>Additional Info</h2>
                <label style={styles.label}>Order Preferences & Instructions</label>
                <textarea
                    style={styles.textarea}
                    placeholder="Allergy requests, delivery notes, or kitchen preferences..."
                    value={addInfo}
                    onChange={(e) => setAddInfo(e.target.value)}
                />
            </div>

            <div style={styles.buttonSection}>
                <button onClick={handlePlaceOrder} style={styles.btn}>
                    CONFIRM ORDER
                </button>
            </div>
        </div>
    );
};

export default Checkout;