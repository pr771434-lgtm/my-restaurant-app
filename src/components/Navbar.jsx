import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaBars, FaTimes, FaTrash, FaPlus, FaMinus, FaDownload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ cart, removeFromCart, updateQty, clearCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Bill Download Logic
  const downloadBill = () => {
    const billText = `
    --- THE BISTRO INDORE RECEIPT ---
    Date: ${new Date().toLocaleString()}
    ---------------------------------
    ${cart.map(item => `${item.name} x${item.qty} - ₹${item.price * item.qty}`).join('\n    ')}
    ---------------------------------
    TOTAL AMOUNT: ₹${total}
    ---------------------------------
    Thank you for your order!
    `;
    const element = document.createElement("a");
    const file = new Blob([billText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Bistro_Order_Bill.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] px-4 md:px-24 py-4 md:py-6 flex justify-between items-center bg-[#1a2e26]/90 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="text-xl md:text-2xl font-black text-white italic">THE <span className="text-emerald-500 not-italic">BISTRO</span></Link>

        <ul className="hidden md:flex space-x-12 text-[11px] font-bold uppercase tracking-widest text-gray-300">
          <li><Link to="/" className="hover:text-emerald-400 transition">Home</Link></li>
          <li><Link to="/menu" className="hover:text-emerald-400 transition">Menu</Link></li>
          <li><Link to="/book" className="hover:text-emerald-400 transition">Reservations</Link></li>
        </ul>

        <div className="flex items-center gap-6">
          <div onClick={() => setShowCart(true)} className="relative cursor-pointer group">
            <FaShoppingBag className="text-white text-xl group-hover:text-emerald-500 transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-[10px] w-5 h-5 rounded-full flex items-center justify-center text-[#1a2e26] font-black animate-bounce">
                {cart.length}
              </span>
            )}
          </div>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU DRAWER --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 bg-[#1a2e26] z-[150] md:hidden flex flex-col items-center justify-center space-y-8 font-black text-3xl italic">
             <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
             <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
             <Link to="/book" onClick={() => setIsOpen(false)} className="text-emerald-500">Book Table</Link>
             <FaTimes className="mt-10 text-gray-500" onClick={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CART DRAWER --- */}
      <AnimatePresence>
        {showCart && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            // Yahan background color upgrade kiya hai
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#1a2e26] z-[200] shadow-2xl p-6 flex flex-col border-l border-white/10"
          >
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              {/* Heading ka color aur style upgrade */}
              <h2 className="text-2xl font-black italic text-white tracking-tighter">
                Your <span className="text-emerald-500">Cart</span>
              </h2>
              <FaTimes className="cursor-pointer text-gray-500 hover:text-white transition-colors" onClick={() => setShowCart(false)} />
            </div>

            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 opacity-20">
                  <FaShoppingBag size={80} />
                  <p className="font-bold mt-4">Cart is empty</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all">
                  <img src={item.img} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-gray-100">{item.name}</h4>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-3 bg-[#13221c] px-3 py-1 rounded-full border border-white/5">
                        <FaMinus onClick={() => updateQty(item.id, -1)} className="text-[10px] text-white-500 cursor-pointer hover:text-emerald-500" />
                        <span className="text-xs font-black w-4 text-center">{item.qty}</span>
                        <FaPlus onClick={() => updateQty(item.id, 1)} className="text-[10px] text-white-500 cursor-pointer hover:text-emerald-500" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between">
                    <p className="text-emerald-500 font-black text-sm">₹{item.price * item.qty}</p>
                    <FaTrash onClick={() => removeFromCart(item.id)} className="text-red-500/30 hover:text-red-500 cursor-pointer ml-auto text-xs transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-xl font-black italic text-white px-2">
                  <span>Subtotal</span>
                  <span className="text-emerald-500 font-black">₹{total}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={downloadBill} className="bg-white/5 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10 transition-all text-xs">
                    <FaDownload /> Get Bill
                  </button>
                  <button onClick={() => { alert("Order Confirmed!"); clearCart(); setShowCart(false); }} className="bg-emerald-500 text-[#1a2e26] py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;