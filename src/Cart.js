import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './cartSlice';

const Cart = ({ products }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
  
    const handleAddItem = (item) => {
      dispatch(addItem(item));
    };
  
    const handleRemoveItem = (itemId) => {
      dispatch(removeItem({ id: itemId }));
    };
  
    const handleUpdateQuantity = (id, quantity) => {
      dispatch(updateQuantity({ id, quantity }));
    };
  
    const calculateTotalPrice = () => {
      return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <div>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {cart.items.find(item => item.id === product.id)?.quantity || 0}</p>
              <button onClick={() => handleAddItem(product)}>Add to Cart</button>
              <button onClick={() => handleRemoveItem(product.id)}>Remove from Cart</button>
              <input
                type="number"
                value={cart.items.find(item => item.id === product.id)?.quantity || 0}
                onChange={(e) => handleUpdateQuantity(product.id, e.target.value)}
              />
            </div>
          </li>
        ))}
      </ul>
      <p>Total Price: ${calculateTotalPrice()}</p>
    </div>
  );
};

export default Cart;

