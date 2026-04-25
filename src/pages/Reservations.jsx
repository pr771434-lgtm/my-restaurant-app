import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaClock, FaPhoneAlt, FaCheck, FaDownload, FaTimes } from 'react-icons/fa';

const Reservations = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    guests: '2 Persons'
  });

  // 1. Handle Form Submission
  const handleConfirm = (e) => {
    e.preventDefault();
    // In real app, you'd save to database here
    setIsConfirmed(true);
  };

  // 2. Bill Download Logic
  const downloadReceipt = () => {
    const receiptText = `
    --- THE BISTRO INDORE ---
    RESERVATION RECEIPT
    ------------------------
    Date: ${bookingDetails.date}
    Time: ${bookingDetails.time}
    Guests: ${bookingDetails.guests}
    Status: CONFIRMED
    ------------------------
    Address: Vidhur Nagar, Indore
    Contact: +91 98765-43210
    ------------------------
    Please show this at the entrance.
    `;
    const element = document.createElement("a");
    const file = new Blob([receiptText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Bistro_Booking_${bookingDetails.date}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  // Pinterest style floating elements logic
  const floatAnim = (x, y, delay) => ({
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    animate: { 
      opacity: 0.4, scale: 1, x: x, y: y,
      transition: { type: "spring", stiffness: 50, delay: delay } 
    },
    hover: {
      y: [y, y - 20, y],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }
  });

  return (
    <div className="min-h-screen bg-[#1a2e26] text-white pt-32 pb-20 px-6 md:px-24 relative overflow-hidden font-sans">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]"></div>
      <motion.img 
        variants={floatAnim(-300, -100, 0.5)} initial="initial" animate="animate" whileHover="hover"
        src="https://www.pngarts.com/files/1/Mint-Leaves-PNG-High-Quality-Image.png" 
        className="absolute w-24 opacity-40 hidden lg:block z-0"
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT SIDE: INFO */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Exclusive Dining Indore
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none">
            Book Your <br /> <span className="text-emerald-500 not-italic">Spot.</span>
          </h1>
          <p className="text-emerald-100/50 text-lg max-w-sm mx-auto lg:mx-0 leading-relaxed font-medium">
            Planning a special evening? Secure your table at Vidhur Nagar's finest 3D kitchen.
          </p>
          <div className="flex justify-center lg:justify-start pt-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[2rem] border border-white/5">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-[#1a2e26] shadow-lg"><FaPhoneAlt size={16} /></div>
              <div><p className="text-[10px] text-gray-500 font-bold uppercase">Call for VIP</p><p className="text-xl font-black italic">+91 98765-43210</p></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1d332a] border border-white/10 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <form className="space-y-6 relative z-10" onSubmit={handleConfirm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-emerald-400 px-2">Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500/50" />
                  <input type="date" required value={bookingDetails.date} onChange={(e)=>setBookingDetails({...bookingDetails, date: e.target.value})} className="w-full bg-[#13221c] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-emerald-400 px-2">Time</label>
                <div className="relative">
                  <FaClock className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500/50" />
                  <input type="time" required value={bookingDetails.time} onChange={(e)=>setBookingDetails({...bookingDetails, time: e.target.value})} className="w-full bg-[#13221c] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-emerald-400 px-2">Guests</label>
              <div className="relative">
                <FaUsers className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500/50" />
                <select value={bookingDetails.guests} onChange={(e)=>setBookingDetails({...bookingDetails, guests: e.target.value})} className="w-full bg-[#13221c] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm appearance-none cursor-pointer">
                  <option>2 Persons</option><option>4 Persons</option><option>6 Persons</option><option>10+ Large Group</option>
                </select>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-emerald-500 text-[#1a2e26] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-lg mt-4">
              Confirm Reservation
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* --- SUCCESS POPUP MODAL --- */}
      <AnimatePresence>
        {isConfirmed && (
          <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-[#1d332a] border border-emerald-500/20 p-8 md:p-12 rounded-[4rem] text-center max-w-sm w-full relative shadow-[0_0_50px_rgba(16,185,129,0.2)]">
              <button onClick={() => setIsConfirmed(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition"><FaTimes size={20} /></button>
              
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                <FaCheck className="text-[#1a2e26] text-3xl" />
              </div>
              
              <h2 className="text-3xl font-black italic mb-2 tracking-tighter">Booking <span className="text-emerald-500">Success!</span></h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Your table for <span className="text-white font-bold">{bookingDetails.guests}</span> on <span className="text-white font-bold">{bookingDetails.date}</span> is reserved.
              </p>

              <div className="space-y-4">
                <button onClick={downloadReceipt} className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                  <FaDownload /> Get Receipt
                </button>
                <button onClick={() => setIsConfirmed(false)} className="w-full bg-emerald-500 text-[#1a2e26] py-4 rounded-2xl font-black uppercase tracking-widest text-[11px]">
                  Back to Website
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reservations;