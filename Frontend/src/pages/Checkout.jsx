import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import MapPicker from '../components/MapPicker';
import CartReceipt from '../components/CartReceipt';
import '../styles/Checkout.css';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [location, setLocation] = useState({ lat: 9.0396, lng: 38.7630 });
    const [addInfo, setAddInfo] = useState('');
    const deliveryFee = 50;

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
        <div className="checkout-empty-message">
            <h2 className="checkout-section-title">Your cart is empty.</h2>
        </div>
    );

    return (
        <div className="checkout-page">
            <div className="checkout-receipt-section">
                <h2 className="checkout-section-title">Order Summary</h2>
                <CartReceipt cart={cart} deliveryFee={deliveryFee} />
            </div>

            <div className="checkout-map-section">
                <h2 className="checkout-section-title">Delivery Point</h2>
                <div className="checkout-map-wrapper">
                    <MapPicker location={location} setLocation={setLocation} />
                </div>
            </div>

            <div className="checkout-info-section">
                <h2 className="checkout-section-title">Additional Info</h2>
                <label className="checkout-label">Order Preferences & Instructions</label>
                <textarea
                    className="checkout-textarea"
                    placeholder="Allergy requests, delivery notes, or kitchen preferences..."
                    value={addInfo}
                    onChange={(e) => setAddInfo(e.target.value)}
                />
            </div>

            <div className="checkout-button-section">
                <button onClick={handlePlaceOrder} className="checkout-btn">
                    CONFIRM ORDER
                </button>
            </div>
        </div>
    );
};

export default Checkout;