import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';

function App() {
  const [cart, setCart] = useState([]);

  // 1. Add to Cart Logic
  const addToCart = (product) => {
    setCart(prev => {
      const isExisting = prev.find(item => item.id === product.id);
      if (isExisting) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // 2. Remove & Update Logic
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#1a2e26]">
        <Navbar 
          cart={cart} 
          removeFromCart={removeFromCart} 
          updateQty={updateQty} 
          clearCart={() => setCart([])} 
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu onAddToCart={addToCart} />} />
            <Route path="/book" element={<Reservations />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;