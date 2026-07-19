import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="glass-panel rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden"
        >
          {/* Subtle top glare */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-purple-400 mb-8 tracking-tighter text-glow">
              E L V A T E
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-2xl text-blue-100/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            A graceful intersection of AI and fashion, curated for modern living. Step into the virtual mirror.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-center"
          >
            <button className="px-10 py-5 glass-panel-glow text-white rounded-full font-medium text-lg uppercase tracking-widest transform transition-all duration-300 hover:scale-105 hover:bg-white/10 cursor-pointer flex items-center gap-4">
              Enter Boutique
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
