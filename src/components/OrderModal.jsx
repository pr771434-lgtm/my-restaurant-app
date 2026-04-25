import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const OrderModal = ({ isOpen, onClose, itemName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-[2.5rem] p-8 relative shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
            <X size={24} />
          </button>

          <h2 className="text-2xl font-black text-gray-900 mb-2">Order Now</h2>
          <p className="text-gray-500 mb-6 text-sm">You are ordering: <span className="text-emerald-500 font-bold">{itemName}</span></p>

          <form className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">Quantity</label>
              <select className="w-full p-4 mt-1 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none">
                <option>1 Plate</option>
                <option>2 Plates</option>
                <option>Full Party Pack</option>
              </select>
            </div>
            
            <input type="text" placeholder="Your Table Number or Address" className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none" />
            
            <input type="tel" placeholder="Mobile Number" className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none" />

            <button type="button" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg mt-4">
              Confirm My Order
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderModal;