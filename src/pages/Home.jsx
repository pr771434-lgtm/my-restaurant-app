import { motion } from 'framer-motion';
import { FaPlay, FaUtensils, FaLeaf, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Features Data
  const features = [
    {
      title: "Indori Zaika",
      desc: "Experience the real taste of Indore with our Dal Bafla and chatpata snacks, made with traditional recipes.",
      icon: <FaUtensils className="text-emerald-500 text-2xl" />
    },
    {
      title: "Organic & Fresh",
      desc: "We use 100% organic ingredients and fresh farm produce to ensure every bite is healthy and delicious.",
      icon: <FaLeaf className="text-emerald-500 text-2xl" />
    },
    {
      title: "Super Fast Service",
      desc: "Whether you dine in or order via WhatsApp, we ensure your food reaches you hot and fresh in no time.",
      icon: <FaClock className="text-emerald-500 text-2xl" />
    }
  ];

  return (
    <div className="bg-[#1a2e26] min-h-screen text-white overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 md:px-12 lg:px-24 pt-24 pb-12 lg:py-0">
        
        {/* 1. TEXT CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-30 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[110px] font-black leading-[1.1] lg:leading-[0.85] tracking-tighter italic"
          >
            Delicious <br /> 
            <span className="text-emerald-500 not-italic">Indore.</span>
          </motion.h1>
          
          <p className="text-emerald-100/50 text-base sm:text-lg max-w-sm sm:max-w-md leading-relaxed">
            Premium organic dining with a touch of tradition and 3D visual art. 
            Indore's favorite vegetarian spot in Vidhur Nagar.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Navigates to Menu Page */}
            <button 
              onClick={() => navigate('/menu')}
              className="w-full sm:w-auto bg-emerald-500 text-[#1a2e26] px-10 py-4 rounded-full font-black uppercase text-xs shadow-2xl hover:bg-white transition-all duration-300 active:scale-95"
            >
              Order Now
            </button>
            <button className="flex items-center gap-4 font-bold hover:text-emerald-400 transition-colors text-sm">
              <FaPlay className="text-emerald-500" /> Play Story
            </button>
          </div>
        </div>

        {/* 2. IMAGE CONTENT */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-12 lg:mt-0 min-h-[300px] sm:min-h-[450px] lg:min-h-[600px]">
          <div className="absolute w-[200px] sm:w-[350px] lg:w-[450px] h-[200px] sm:h-[350px] lg:h-[450px] bg-emerald-500/10 rounded-full blur-[60px] sm:blur-[100px] lg:blur-[120px]"></div>
          
          <motion.div 
            initial={{ scale: 0, rotate: -45 }} 
            animate={{ scale: 1, rotate: 0 }} 
            transition={{ type: "spring", stiffness: 40 }} 
            className="relative z-20"
          >
            <img 
              src="/Momos.jpg" 
              className="w-[260px] sm:w-[380px] lg:w-[450px] aspect-square object-cover rounded-full border-[8px] sm:border-[12px] lg:border-[15px] border-[#13221c] shadow-2xl" 
              alt="Indori Momos"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURE SECTION - UPDATED WITH UNIQUE CONTENT */}
      <section className="bg-[#162720] py-20 px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group bg-[#1a2e26] p-8 sm:p-12 rounded-[3rem] border border-white/5 shadow-xl hover:border-emerald-500/30 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-[#1a2e26] transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black italic mb-4 tracking-tight group-hover:text-emerald-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-emerald-100/40 text-sm leading-relaxed group-hover:text-emerald-100/70 transition-colors">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;