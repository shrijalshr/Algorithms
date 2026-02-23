import { motion as Motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-200">
               {/* Placeholder for cafe image */}
               <img
                 src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                 alt="Mozzo Cafe Interior"
                 className="w-full h-full object-cover"
               />
            </div>
            {/* Accent box */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#C8A97E] rounded-full -z-10 opacity-50 blur-2xl"></div>
          </Motion.div>

          <Motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-bold text-[#4A3B32] mb-6">A Cozy Corner in Chaos</h2>
            <p className="text-lg text-[#333333]/80 mb-6 leading-relaxed">
              Nestled in the bustling market of Biratnagar, Mozzo Cafe is your sanctuary. We believe in the power of a good cup of coffee to pause time.
            </p>
            <p className="text-lg text-[#333333]/80 mb-6 leading-relaxed">
              Whether you&apos;re here for our diverse menu—ranging from Japanese delights to local favorites—or just to hang out with friends, you&apos;ll feel right at home.
            </p>
            <p className="text-[#4A3B32] font-medium italic">
              — And say hi to Simba, our resident cat manager! 🐾
            </p>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
