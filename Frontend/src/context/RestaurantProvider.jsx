import { RestaurantContext } from './RestaurantContext.js';

export const RestaurantProvider = ({ children }) => {
  const config = {
    name: "Hizkeal Cafe",
    tagline: "Crafting memories, one plate at a time.",
    email: "helloworld@gmail.com"
  };

  return (
    <RestaurantContext.Provider value={config}>
      {children}
    </RestaurantContext.Provider>
  );
};