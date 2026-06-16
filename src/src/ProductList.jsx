import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const categories = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", cost: 15, image: "url1" },
        { name: "Spider Plant", cost: 12, image: "url2" },
        { name: "Peace Lily", cost: 18, image: "url3" },
        { name: "Boston Fern", cost: 14, image: "url4" },
        { name: "Rubber Plant", cost: 20, image: "url5" },
        { name: "Aloe Vera", cost: 10, image: "url6" }
      ]
    },
    {
      category: "Succulents",
      plants: [
        { name: "Echeveria", cost: 8, image: "url7" },
        { name: "Jade Plant", cost: 10, image: "url8" },
        { name: "Zebra Plant", cost: 9, image: "url9" },
        { name: "Burro's Tail", cost: 12, image: "url10" },
        { name: "String of Pearls", cost: 15, image: "url11" },
        { name: "Panda Plant", cost: 11, image: "url12" }
      ]
    },
    {
      category: "Pet Friendly",
      plants: [
        { name: "Parlor Palm", cost: 16, image: "url13" },
        { name: "Calathea", cost: 22, image: "url14" },
        { name: "Money Tree", cost: 25, image: "url15" },
        { name: "African Violet", cost: 14, image: "url16" },
        { name: "Cast Iron Plant", cost: 18, image: "url17" },
        { name: "Areca Palm", cost: 30, image: "url18" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart({ ...addedToCart, [plant.name]: true });
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#28a745', color: 'white' }}>
        <div>
          <a href="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/plants" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Plants</a>
        </div>
        <div>
          <a href="/cart" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>
            Cart 🛒 ({totalItems})
          </a>
        </div>
      </nav>

      <div className="product-list" style={{ padding: '20px' }}>
        {categories.map((cat, index) => (
          <div key={index} style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#333' }}>{cat.category}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {cat.plants.map((plant, pIndex) => (
                <div key={pIndex} style={{ border: '1px solid #ddd', padding: '15px', width: '220px', textAlign: 'center', borderRadius: '8px' }}>
                  <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', backgroundColor: '#f4f4f4' }} />
                  <h3 style={{ fontSize: '1.2rem' }}>{plant.name}</h3>
                  <p style={{ color: '#555', fontWeight: 'bold' }}>${plant.cost}</p>
                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                    style={{ 
                      backgroundColor: addedToCart[plant.name] ? '#ccc' : '#28a745', 
                      color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px',
                      cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer' 
                    }}
                  >
                    {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
