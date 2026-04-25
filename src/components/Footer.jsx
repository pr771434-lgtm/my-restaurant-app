import { motion } from 'framer-motion';
// Food related icons use kar rahe hain (FaUtensils, FaPizzaSlice etc.)
import { FaInstagram, FaFacebookF, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight, FaUtensils, FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-[#1a2e26] pt-24 pb-12 text-gray-300">
      
      {/* --- 1. MOCKUP STYLE CURVE DIVIDER --- */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[99%]">
        <svg 
          className="relative block w-full h-[80px] md:h-[130px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" 
            fill="#1a2e26"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- 2. FOODIE BRANDING --- */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-4">
            <FaUtensils className="text-emerald-500 text-2xl" />
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black italic text-white tracking-tighter"
            >
              The Bistro <span className="text-emerald-500">Kitchen</span>
            </motion.h2>
            <FaLeaf className="text-emerald-500 text-2xl" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base italic font-medium">
            "Indore ka asli swad, organic masalo aur dher saare pyaar ke saath. <br /> 
            Pure Veg. Pure Love."
          </p>
        </div>

        {/* --- 3. MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/5 pt-16">
          
          {/* Column 1: Foodie Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.4em] border-l-4 border-emerald-500 pl-3">Quick Bites</h3>
            <ul className="space-y-4 text-sm font-semibold">
              <li><a href="/menu" className="hover:text-emerald-400 transition-all flex items-center gap-2 underline decoration-emerald-500/30 underline-offset-4">Today's Special Menu</a></li>
              <li><a href="/book" className="hover:text-emerald-400 transition-all flex items-center gap-2 underline decoration-emerald-500/30 underline-offset-4">Book A Dinner Table</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-all flex items-center gap-2 underline decoration-emerald-500/30 underline-offset-4">Our Organic Story</a></li>
            </ul>
          </div>

          {/* Column 2: Newsletter (Foodie Style) */}
          <div className="space-y-8 text-center">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest">Wanna get offers?</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email for discounts..."
                className="w-full py-4 px-6 rounded-full bg-[#13221c] border border-white/10 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm text-white italic"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 text-[#1a2e26] p-3 rounded-full hover:bg-white hover:scale-110 transition-all shadow-lg">
                <FaArrowRight size={14} />
              </button>
            </div>
            {/* Social Connect */}
            <div className="flex justify-center space-x-8">
              <FaInstagram size={24} className="hover:text-emerald-400 cursor-pointer transition-all hover:-translate-y-1" />
              <FaFacebookF size={22} className="hover:text-emerald-400 cursor-pointer transition-all hover:-translate-y-1" />
            </div>
          </div>

          {/* Column 3: Contact (Indore Location) */}
          <div className="md:text-right space-y-6">
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.4em] border-r-4 border-emerald-500 pr-3">Visit Kitchen</h3>
            <div className="space-y-4 text-sm font-semibold">
              <p className="flex items-center md:justify-end gap-3 hover:text-emerald-400 transition-colors">
                +91 98765-43210 <FaPhoneAlt size={14} className="text-emerald-500" />
              </p>
              <div className="flex items-start md:justify-end gap-3 text-gray-400 leading-relaxed">
                <p>Near Holkar Science College, <br /> Vidhur Nagar, Indore (M.P.)</p>
                <FaMapMarkerAlt size={18} className="text-emerald-500 mt-1" />
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. BOTTOM BAR --- */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">
          <p>© 2026 THE BISTRO FOODS • MADE IN INDORE</p>
          <div className="flex space-x-10 mt-6 md:mt-0 font-extrabold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Design by Prashant Rajput</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;