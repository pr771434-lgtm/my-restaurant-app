import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaBars, FaTimes, FaTrash, FaPlus, FaMinus, FaDownload, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ cart, removeFromCart, updateQty, clearCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gst = (total * 0.05).toFixed(2);
  const grandTotal = (total + parseFloat(gst)).toFixed(2);

  // Professional Download Logic
  const downloadBill = () => {
    const billHTML = `
========================================
         THE BISTRO - INDORE
    Premium Organic 3D Kitchen
    Vidhur Nagar, Indore (M.P.)
========================================
DATE: ${new Date().toLocaleString()}
----------------------------------------
ITEM            QTY    PRICE    TOTAL
----------------------------------------
${cart.map(item => {
  const name = item.name.padEnd(15).slice(0, 15);
  const qty = item.qty.toString().padEnd(6);
  const price = `₹${item.price}`.padEnd(8);
  const itemTotal = `₹${item.price * item.qty}`;
  return `${name} ${qty} ${price} ${itemTotal}`;
}).join('\n')}
----------------------------------------
SUBTOTAL:               ₹${total}
GST (5%):               ₹${gst}
----------------------------------------
GRAND TOTAL:            ₹${grandTotal}
========================================
      THANK YOU FOR ORDERING!
    Visit again for Indori Zaika.
========================================`;

    const element = document.createElement("a");
    const file = new Blob([billHTML], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Bistro_Bill_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] px-4 md:px-24 py-4 md:py-6 flex justify-between items-center bg-[#1a2e26]/90 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="text-xl md:text-2xl font-black text-white italic tracking-tighter">
          THE <span className="text-emerald-500 not-italic">BISTRO</span>
        </Link>

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

      {/* --- CART DRAWER --- */}
      <AnimatePresence>
        {showCart && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#1a2e26] z-[200] shadow-2xl p-6 flex flex-col border-l border-white/10">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <h2 className="text-2xl font-black italic text-white">Your <span className="text-emerald-500">Cart</span></h2>
              <FaTimes className="cursor-pointer text-gray-500 hover:text-white" onClick={() => setShowCart(false)} />
            </div>

            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 opacity-20"><FaShoppingBag size={80} /><p className="font-bold mt-4">Cart is empty</p></div>
              ) : cart.map(item => (
                <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                  <img src={item.img} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-gray-100">{item.name}</h4>
                    <div className="flex items-center gap-3 mt-2 bg-[#13221c] w-fit px-3 py-1 rounded-full border border-white/5">
                      <FaMinus onClick={() => updateQty(item.id, -1)} className="text-[10px] cursor-pointer hover:text-emerald-500" />
                      <span className="text-xs font-black">{item.qty}</span>
                      <FaPlus onClick={() => updateQty(item.id, 1)} className="text-[10px] cursor-pointer hover:text-emerald-500" />
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between">
                    <p className="text-emerald-500 font-black text-sm">₹{item.price * item.qty}</p>
                    <FaTrash onClick={() => removeFromCart(item.id)} className="text-red-500/30 hover:text-red-500 cursor-pointer ml-auto text-xs" />
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-xl font-black italic px-2"><span>Total</span><span className="text-emerald-500">₹{total}</span></div>
                <button onClick={() => { setShowBillModal(true); setShowCart(false); }} className="w-full bg-emerald-500 text-[#1a2e26] py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20">
                  Confirm Order & View Bill
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- STYLISH BILL CARD MODAL --- */}
      <AnimatePresence>
        {showBillModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <motion.div initial={{ scale: 0.8, y: 100, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.8, y: 100, opacity: 0 }} className="bg-white text-[#1a2e26] w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl font-mono relative">
              
              {/* Receipt Top */}
              <div className="bg-emerald-500 p-8 text-center">
                <div className="w-12 h-12 bg-[#1a2e26] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"><FaCheck className="text-emerald-500" /></div>
                <h2 className="text-2xl font-black italic">THE BISTRO</h2>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-70">Authentic Indori Taste</p>
              </div>

              {/* Receipt Body */}
              <div className="p-8 space-y-4 relative">
                {/* Side Punch Holes Decoration */}
                <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-around opacity-20">
                  {[...Array(8)].map((_, i) => <div key={i} className="w-4 h-4 bg-black rounded-full"></div>)}
                </div>

                <div className="text-center border-b border-dashed border-gray-300 pb-4">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Official Receipt</p>
                  <p className="text-[11px] font-bold">{new Date().toLocaleString()}</p>
                </div>

                <div className="space-y-3 max-h-40 overflow-y-auto no-scrollbar px-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-[13px] font-medium">
                      <span>{item.name} <span className="text-gray-400">x{item.qty}</span></span>
                      <span className="font-bold">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-gray-300 pt-4 space-y-2">
                  <div className="flex justify-between text-xs text-gray-500"><span>Subtotal</span><span>₹{total}</span></div>
                  <div className="flex justify-between text-xs text-gray-500"><span>GST (5%)</span><span>₹{gst}</span></div>
                  <div className="flex justify-between text-lg font-black border-t-2 border-black pt-2 mt-2">
                    <span>TOTAL</span><span className="text-emerald-600">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 space-y-3">
                  <button onClick={downloadBill} className="w-full bg-[#1a2e26] text-white py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all">
                    <FaDownload /> DOWNLOAD PDF
                  </button>
                  <button onClick={() => { setShowBillModal(false); clearCart(); }} className="w-full border-2 border-[#1a2e26] py-4 rounded-2xl font-bold text-xs uppercase tracking-widest">
                    Close
                  </button>
                </div>
              </div>

              {/* Zig-Zag Edge */}
              <div className="flex w-full overflow-hidden h-3">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="min-w-[20px] h-3 bg-white" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(180deg)' }}></div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;