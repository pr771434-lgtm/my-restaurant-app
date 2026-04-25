import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const Home = () => {
  // Animation settings
  const floatEffect = (x, y, d) => ({
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    animate: { 
      opacity: 1, scale: 1, x: x, y: y, 
      transition: { type: "spring", stiffness: 50, delay: d } 
    }
  });

  return (
    // overflow-x-hidden zaroori hai taaki mobile par horizontal scroll na aaye
    <div className="bg-[#1a2e26] min-h-screen text-white overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 md:px-12 lg:px-24 pt-24 pb-12 lg:py-0">
        
        {/* 1. TEXT CONTENT: Auto-aligns for mobile/desktop */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-30 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            // Mobile: 4xl, Tablet: 6xl, Desktop: 8xl, Large Screen: 110px
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[110px] font-black leading-[1.1] lg:leading-[0.85] tracking-tighter italic"
          >
            Delicious <br /> 
            <span className="text-emerald-500 not-italic">Indore.</span>
          </motion.h1>
          
          <p className="text-emerald-100/50 text-base sm:text-lg max-w-sm sm:max-w-md leading-relaxed">
            Premium organic dining with a touch of tradition and 3D visual art. 
            Indore's favorite vegetarian spot.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-emerald-500 text-[#1a2e26] px-10 py-4 rounded-full font-black uppercase text-xs shadow-2xl hover:bg-white transition-all duration-300">
              Order Now
            </button>
            <button className="flex items-center gap-4 font-bold hover:text-emerald-400 transition-colors text-sm">
              <FaPlay className="text-emerald-500" /> Play Story
            </button>
          </div>
        </div>

        {/* 2. IMAGE CONTENT: Auto-scales based on screen height/width */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-12 lg:mt-0 min-h-[300px] sm:min-h-[450px] lg:min-h-[600px]">
          
          {/* Background Glow - Scales automatically */}
          <div className="absolute w-[200px] sm:w-[350px] lg:w-[450px] h-[200px] sm:h-[350px] lg:h-[450px] bg-emerald-500/10 rounded-full blur-[60px] sm:blur-[100px] lg:blur-[120px]"></div>
          
          <motion.div 
            initial={{ scale: 0, rotate: -45 }} 
            animate={{ scale: 1, rotate: 0 }} 
            transition={{ type: "spring", stiffness: 40 }} 
            className="relative z-20"
          >
            <img 
              src="src/assets/so yummy momo 🥟🥟🥟🥟🥟🥟🥟🥟🥟.jpg" 
              // Responsive Width: Mobile: 260px, Tablet: 380px, Desktop: 450px
              className="w-[260px] sm:w-[380px] lg:w-[450px] aspect-square object-cover rounded-full border-[8px] sm:border-[12px] lg:border-[15px] border-[#13221c] shadow-2xl" 
              alt="Indori Momos"
            />
          </motion.div>

          {/* Floating Ingredients - Hidden on very small screens to avoid overlap */}
          <motion.img 
            variants={floatEffect(120, -120, 0.5)} initial="initial" animate="animate" 
            src="https://www.pngarts.com/files/3/Tomato-PNG-Transparent-Image.png" 
            className="absolute w-10 sm:w-16 lg:w-20 z-30 hidden sm:block" 
          />
          <motion.img 
            variants={floatEffect(-130, 100, 0.7)} initial="initial" animate="animate" 
            src="https://www.pngarts.com/files/3/Red-Chilli-PNG-Download-Image.png" 
            className="absolute w-14 sm:w-20 lg:w-24 z-30 hidden sm:block" 
          />
        </div>
      </section>

      {/* 3. FEATURE SECTION - Using Auto-Grid */}
      <section className="bg-[#162720] py-20 px-6 md:px-24">
        {/* Grid: 1 column on Mobile, 3 on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#1a2e26] p-8 sm:p-12 rounded-[3rem] border border-white/5 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl mb-6"></div>
              <h3 className="text-xl font-bold mb-4">Quality Service</h3>
              <p className="text-emerald-100/40 text-sm">Experience the best Indori hospitality with our organic food.</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;