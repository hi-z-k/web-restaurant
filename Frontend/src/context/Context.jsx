import { AuthProvider } from './AuthProvider';
import { RestaurantProvider } from './RestaurantProvider';
import { CartProvider } from './CartProvider';

const Context = ({ children }) => {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </RestaurantProvider>
    </AuthProvider>
  );
};

export default Context;