'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'our story', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Coaches', href: '#coaches' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation - Absolute positioned like FreeGame */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-medium tracking-tight">
            AKHARA
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-sm"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 py-8"
          >
            <div className="flex flex-col items-center gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-white/70 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - FreeGame Style */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Full Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop={true}
            playsInline
            poster="/hero-poster.jpg"
            className="w-full h-full object-cover opacity-50"
            onEnded={(e) => {
              const video = e.currentTarget;
              video.currentTime = 0;
              video.play();
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Gradient fade to black at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
        </div>

        {/* Hero Content - Centered like FreeGame */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]"
          >
            Own The
            <br />
            <span className="text-stroke">Mat</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-base md:text-lg text-white/80 max-w-xl mx-auto font-light leading-relaxed"
          >
            Get the training you need to take charge of how your wrestling journey unfolds — from coaches who know it best.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-white/30"
          />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Champions Are Made Here
            </h2>
            <p className="text-white/60 text-lg max-w-3xl mx-auto font-light">
              Akhara of Champions is more than a wrestling club — it&apos;s a family dedicated to developing
              world-class wrestlers through discipline, technique, and mental fortitude.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '500+', label: 'Athletes Trained' },
              { number: '50+', label: 'National Medals' },
              { number: '10+', label: 'World Competitors' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/40 uppercase tracking-wider text-xs">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 md:py-32 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our Programs</h2>
            <p className="text-white/60 text-lg max-w-2xl font-light">
              Training programs designed for all skill levels — from beginners taking their first steps
              to elite athletes preparing for international competition.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Youth Development',
                description: 'Building foundational skills and love for the sport in young wrestlers ages 6-12.',
                features: ['Basic techniques', 'Physical conditioning', 'Sportsmanship values'],
              },
              {
                title: 'High Performance',
                description: 'Advanced training for competitive wrestlers aiming for provincial and national success.',
                features: ['Competition preparation', 'Video analysis', 'Strength & conditioning'],
              },
              {
                title: 'Elite Program',
                description: 'World-class training for athletes pursuing international competition.',
                features: ['Personalized coaching', 'Mental performance', 'Recovery protocols'],
              },
              {
                title: 'Women\'s Wrestling',
                description: 'Dedicated program supporting the growth of women in wrestling.',
                features: ['All skill levels', 'Supportive environment', 'Competition pathway'],
              },
              {
                title: 'Private Sessions',
                description: 'One-on-one coaching for accelerated skill development.',
                features: ['Custom curriculum', 'Flexible scheduling', 'Rapid improvement'],
              },
              {
                title: 'Summer Camps',
                description: 'Intensive training camps during school breaks.',
                features: ['Guest coaches', 'Full-day training', 'Team building'],
              },
            ].map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black border border-white/10 p-8 hover:border-white/30 transition-colors duration-300 group"
              >
                <h3 className="text-xl font-semibold mb-3 group-hover:text-white/80 transition-colors">
                  {program.title}
                </h3>
                <p className="text-white/50 mb-6 text-sm font-light">
                  {program.description}
                </p>
                <ul className="space-y-2">
                  {program.features.map((feature) => (
                    <li key={feature} className="text-white/40 text-sm flex items-center gap-2 font-light">
                      <span className="w-1 h-1 bg-white/40 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <blockquote className="text-2xl md:text-4xl font-light italic text-white/70 mb-8 leading-relaxed">
            &quot;Wrestling teaches you that the only limits are the ones you set for yourself.&quot;
          </blockquote>
          <cite className="text-white/40 not-italic uppercase tracking-wider text-sm">
            — Akhara Philosophy
          </cite>
        </motion.div>
      </section>

      {/* Coaches Section */}
      <section id="coaches" className="py-24 md:py-32 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our Coaches</h2>
            <p className="text-white/60 text-lg max-w-2xl font-light">
              Learn from coaches who have competed at the highest levels and are dedicated to
              developing the next generation of champions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Coach Name 1',
                role: 'Head Coach',
                credentials: 'Olympic Team Coach, National Champion',
              },
              {
                name: 'Coach Name 2',
                role: 'Technical Director',
                credentials: 'World Championship Medalist',
              },
              {
                name: 'Coach Name 3',
                role: 'Youth Program Lead',
                credentials: 'National Team Member, NCCP Certified',
              },
            ].map((coach, index) => (
              <motion.div
                key={coach.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center">
                  <span className="text-white/30 text-sm">Photo</span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{coach.name}</h3>
                <p className="text-white/50 text-sm uppercase tracking-wider mb-2">{coach.role}</p>
                <p className="text-white/40 text-sm font-light">{coach.credentials}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 md:py-32 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Training Schedule</h2>
            <p className="text-white/60 text-lg font-light">
              Join us on the mat. All sessions held at our main facility.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { day: 'Monday', time: '6:00 PM - 8:00 PM', program: 'Youth & Beginners' },
              { day: 'Tuesday', time: '7:00 PM - 9:00 PM', program: 'High Performance' },
              { day: 'Wednesday', time: '6:00 PM - 8:00 PM', program: 'Women\'s Program' },
              { day: 'Thursday', time: '7:00 PM - 9:00 PM', program: 'High Performance' },
              { day: 'Friday', time: '6:00 PM - 8:00 PM', program: 'Open Mat' },
              { day: 'Saturday', time: '10:00 AM - 12:00 PM', program: 'All Levels' },
            ].map((session, index) => (
              <motion.div
                key={session.day}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between py-4 border-b border-white/10"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium w-28">{session.day}</span>
                  <span className="text-white/40 font-light">{session.time}</span>
                </div>
                <span className="text-white/60 font-light">{session.program}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Get In Touch</h2>
            <p className="text-white/60 text-lg font-light">
              Ready to start your wrestling journey? Contact us today.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-white/50 focus:outline-none transition-colors font-light"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-white/50 focus:outline-none transition-colors font-light"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-white/50 focus:outline-none transition-colors font-light"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full bg-transparent border border-white/20 px-4 py-3 focus:border-white/50 focus:outline-none transition-colors resize-none font-light"
            />
            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-medium uppercase tracking-wider hover:bg-white/90 transition-colors"
            >
              Send Message
            </button>
          </motion.form>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="font-medium mb-2">Location</h4>
              <p className="text-white/40 text-sm font-light">Toronto, Ontario</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Email</h4>
              <p className="text-white/40 text-sm font-light">info@akharawrestling.com</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Phone</h4>
              <p className="text-white/40 text-sm font-light">(416) XXX-XXXX</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-medium">AKHARA</div>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              Instagram
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              Facebook
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              YouTube
            </a>
          </div>
          <p className="text-white/30 text-sm font-light">
            © 2025 Akhara of Champions. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
