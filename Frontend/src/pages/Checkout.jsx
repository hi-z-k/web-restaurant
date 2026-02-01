import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../services/api';
import MapPicker from '../components/MapPicker';
import CartReceipt from '../components/CartReceipt';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [location, setLocation] = useState({ lat: 9.0396, lng: 38.7630 });
    const [addInfo, setAddInfo] = useState('');
    const deliveryFee = 50;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const summaryStr = cart.map(i => `${i.count}x ${i.name}`).join(', ');
        const totalAmount = cart.reduce((acc, i) => acc + i.price * i.count, 0) + deliveryFee;

        const orderData = {
            date: new Date().toISOString().split('T')[0].replace(/-/g, ''),
            customerName: "Guest User", 
            itemsSummary: summaryStr,
            total: totalAmount,
            status: 'active',
            coordinates: location,
            preferences: addInfo
        };

        try {
            await createOrder(orderData);
            alert("Order successfully placed!");
            clearCart();
            navigate('/');
        } catch (error) {
            alert("Error placing order: " + error.message);
        }
    };

    if (cart.length === 0) return (
        <div style={{ textAlign: 'center', padding: '100px', color: '#fff' }}>
            <h2>Your cart is empty.</h2>
        </div>
    );

    return (
        <div style={{ padding: '60px 10%', display: 'grid', gap: '30px', color: '#fff', maxWidth: '1400px', margin: '0 auto' }}>
            <CartReceipt cart={cart} deliveryFee={deliveryFee} />
            <MapPicker location={location} setLocation={setLocation} />
            <textarea 
                style={{ width: '100%', padding: '15px', borderRadius: '8px' }}
                value={addInfo} 
                onChange={(e) => setAddInfo(e.target.value)} 
                placeholder="Additional instructions..."
            />
            <button onClick={handlePlaceOrder} style={{ padding: '20px', background: 'orange', cursor: 'pointer' }}>
                CONFIRM ORDER
            </button>
        </div>
    );
};

export default Checkout;