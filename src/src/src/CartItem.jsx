import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert("Coming Soon");
  };

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '15px', margin: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px' }}>
            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', backgroundColor: '#f4f4f4' }} />
            <div style={{ flex: 1, marginLeft: '20px' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
              <p style={{ margin: '0' }}>Unit Price: ${item.cost}</p>
              <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>Total: ${item.cost * item.quantity}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '20px' }}>
              <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', fontSize: '1.2rem', cursor: 'pointer' }}>-</button>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
            </div>
            <button onClick={() => handleRemove(item)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
        <button onClick={() => window.location.href = '/plants'} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button onClick={handleCheckout} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
