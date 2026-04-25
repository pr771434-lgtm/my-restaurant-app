import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaSearch, FaWhatsapp, FaLeaf, FaShoppingBag, FaStar } from 'react-icons/fa';

const menuData = [
  // STARTERS (6)
  { id: 1, category: "Starters", name: "Paneer Tikka", price: 280, img: "src/assets/Paneer Tikka.jpg", desc: "Charcoal grilled cottage cheese with secret spices." },
  { id: 2, category: "Starters", name: "Crispy Corn", price: 220, img: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=500", desc: "Golden fried corn tossed in tangy Indori masala." },
  { id: 3, category: "Starters", name: "Hara Bhara Kabab", price: 240, img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=500", desc: "Healthy spinach and green pea patties." },
  { id: 4, category: "Starters", name: "Cheese Chilli Toast", price: 190, img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500", desc: "Crunchy bread topped with melted cheese and chillies." },
  { id: 5, category: "Starters", name: "Veg Spring Rolls", price: 210, img: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=500", desc: "Crispy rolls filled with sautéed vegetables." },
  { id: 6, category: "Starters", name: "Mushroom Duplex", price: 260, img: "src/assets/Mushroom Duplex.jpg", desc: "Stuffed mushrooms fried to perfection." },

  // MAIN COURSE (7)
  { id: 7, category: "Main Course", name: "Indori Dal Bafla", price: 350, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=500", desc: "The pride of Indore. Served with ghee, dal, and chutneys." },
  { id: 8, category: "Main Course", name: "Paneer Butter Masala", price: 320, img: "src/assets/Paneer Butter Masala ( Step by step paneer Makhani) - Ruchiskitchen.jpg", desc: "Rich and creamy tomato-based cottage cheese gravy." },
  { id: 9, category: "Main Course", name: "Veg Maratha", price: 290, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=500", desc: "Spicy vegetable koftas in a thick red gravy." },
  { id: 10, category: "Main Course", name: "Dal Tadka", price: 180, img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=500", desc: "Yellow lentils tempered with ghee and red chillies." },
  { id: 11, category: "Main Course", name: "Malai Kofta", price: 310, img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=500", desc: "Soft paneer balls in a silky white cashew gravy." },
  { id: 12, category: "Main Course", name: "Kadhai Paneer", price: 300, img: "src/assets/Kadai Paneer.jpg", desc: "Cottage cheese with bell peppers and ground spices." },
  { id: 13, category: "Main Course", name: "Veg Biryani", price: 280, img: "src/assets/Vegetable Dum Biryani (In oven).jpg", desc: "Aromatic basmati rice cooked with garden veggies." },

  // FAST FOOD (5)
  { id: 14, category: "Fast Food", name: "Cheese Sandwich", price: 180, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=500", desc: "Double layered cheesy goodness with local herbs." },
  { id: 15, category: "Fast Food", name: "Veg Burger", price: 150, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500", desc: "Classic veggie patty with secret mayo." },
  { id: 16, category: "Fast Food", name: "Peri Peri Fries", price: 120, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500", desc: "Crispy fries dusted with hot peri peri spice." },
  { id: 17, category: "Fast Food", name: "White Sauce Pasta", price: 230, img: "src/assets/download (16).jpg", desc: "Penne pasta in a creamy cheesy sauce." },
  { id: 18, category: "Fast Food", name: "Veg Manchurian", price: 200, img: "src/assets/Easy Veg Manchurian.jpg", desc: "Deep fried veg balls in a tangy soy ginger sauce." },

  // DRINKS (2)
  { id: 19, category: "Drinks", name: "Masala Chai", price: 40, img: "src/assets/Mashala chai.jpg", desc: "Authentic ginger and cardamom milk tea." },
  { id: 20, category: "Drinks", name: "Indori Lassi", price: 80, img: "src/assets/download (17).jpg", desc: "Thick creamy curd drink topped with malai." },
];

const Menu = ({ onAddToCart }) => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [flyingItem, setFlyingItem] = useState(null);

  const handleAdd = (item, e) => {
    const rect = e.target.getBoundingClientRect();
    setFlyingItem({ x: rect.left, y: rect.top, img: item.img });
    onAddToCart(item);
    setTimeout(() => setFlyingItem(null), 1200); 
  };

  const categories = ["All", "Starters", "Main Course", "Fast Food", "Drinks"];
  const filteredItems = menuData.filter(item => 
    (filter === "All" || item.category === filter) &&
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1a2e26] text-white pt-28 pb-20 px-4 md:px-24">
      
      {/* SLOW FLYING POPUP WITH ZOOM */}
      <AnimatePresence>
        {flyingItem && (
          <motion.img
            initial={{ x: flyingItem.x, y: flyingItem.y, scale: 0.6, opacity: 1 }}
            animate={{ 
              x: [flyingItem.x, window.innerWidth/2, window.innerWidth - 60], 
              y: [flyingItem.y, window.innerHeight/2, 30],
              scale: [0.6, 1.4, 0.1], // Zoom In then Zoom Out
              opacity: [1, 1, 0]
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            src={flyingItem.img}
            className="fixed w-20 h-20 rounded-full z-[1000] object-cover border-4 border-emerald-500 shadow-2xl"
          />
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto text-center mb-10 scale-90 md:scale-100">
        <span className="text-emerald-500 font-bold tracking-[0.2em] uppercase text-[10px]">Premium Menu</span>
        <h1 className="text-4xl md:text-7xl font-black italic mt-2 tracking-tighter">Indori <span className="text-emerald-500 not-italic">Flavors.</span></h1>

        <div className="mt-8 flex flex-col md:flex-row items-center gap-4 justify-center px-2">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50 text-xs" />
            <input 
              type="text" placeholder="What are you craving?" onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#13221c] border border-white/5 rounded-full py-3 md:py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs md:text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2">
            {categories.map((cat) => (
              <button 
                key={cat} onClick={() => setFilter(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-[10px] font-bold border ${filter === cat ? 'bg-emerald-500 text-[#1a2e26]' : 'border-white/10 hover:border-emerald-500/50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GRID SCALED DOWN FOR MOBILE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {filteredItems.map((item) => (
          <motion.div
            layout key={item.id}
            whileHover={{ y: -8 }}
            className="bg-[#1d332a] rounded-[2rem] md:rounded-[3rem] p-4 md:p-5 border border-white/5 shadow-2xl group"
          >
            <div className="relative aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#13221c] mb-4">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-2 right-2 bg-emerald-500 text-[#1a2e26] px-3 py-1 rounded-full text-[10px] font-black shadow-lg italic">
                ₹{item.price}
              </div>
            </div>

            <div className="space-y-2 px-1">
              <div className="flex items-center gap-1">
                <FaLeaf className="text-emerald-500 text-[8px]" />
                <span className="text-[8px] font-bold text-emerald-500/60 uppercase tracking-widest">{item.category}</span>
              </div>
              <h3 className="text-lg md:text-xl font-black italic tracking-tight">{item.name}</h3>
              <p className="text-gray-500 text-[10px] line-clamp-2 leading-relaxed h-8">{item.desc}</p>
              
              <div className="flex gap-2 pt-3">
                <button 
                  onClick={(e) => handleAdd(item, e)}
                  className="flex-1 bg-emerald-500 text-[#1a2e26] py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <FaShoppingBag size={12} /> ADD
                </button>
                <button 
                  onClick={() => window.open(`https://wa.me/91XXXXXXXXXX?text=Order: ${item.name}`, '_blank')}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-[#1a2e26] transition-all"
                >
                  <FaWhatsapp size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Menu;