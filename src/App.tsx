import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Page Load Animation
function PageLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#3d4852] flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img src="/eth-ankara-logo.png" alt="ETH ANKARA" className="w-32 h-32 mx-auto" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-white mb-2 tracking-wider"
        >
          ETH ANKARA
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/50"
        >
          May 23-24, 2026
        </motion.p>
      </div>
    </motion.div>
  );
}

// Navigation
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Hackathon', href: '#hackathon' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'Team', href: '/team' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#3d4852]/95 backdrop-blur-md' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="text-white font-semibold text-lg tracking-wider">
            ETH ANKARA
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => link.href.startsWith('/') ? window.location.href = link.href : scrollToSection(link.href)}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('#tickets')}
              className="px-6 py-2.5 bg-white text-[#3d4852] font-medium rounded-md hover:bg-white/90 transition-colors text-sm"
            >
              Get Tickets
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DialogContent className="bg-[#3d4852] border-0 w-[90vw] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Menu</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => link.href.startsWith('/') ? window.location.href = link.href : scrollToSection(link.href)}
                className="text-left text-lg text-white/60 hover:text-white transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollToSection('#tickets')} className="bg-white text-[#3d4852] font-medium py-3 rounded-md mt-4">
              Get Tickets
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#3d4852]">
      <div className="absolute inset-0">
        <img src="/hero-ankara-new.png" alt="" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3d4852]/40 via-transparent to-[#3d4852]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <img src="/eth-ankara-logo.png" alt="ETH ANKARA" className="w-40 h-40 mx-auto mb-6" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-2 tracking-wider"
        >
          ETH ANKARA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm text-white/40 tracking-widest uppercase mb-6"
        >
          Produced by TEDÜ Blockchain
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl text-white/70 mb-4"
        >
          May 23-24, 2026 — Ankara, Turkey
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg text-white/50 max-w-2xl mx-auto mb-10"
        >
          Turkey's premier Ethereum hackathon and community gathering. 
          Two days of building, learning, and connecting in the heart of Anatolia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={() => document.querySelector('#tickets')?.scrollIntoView({ behavior: 'smooth' })} 
            className="px-8 py-3.5 bg-white text-[#3d4852] font-medium rounded-md hover:bg-white/90 transition-colors inline-flex items-center justify-center">
            Register Now
            <ArrowRight size={18} className="ml-2" />
          </button>
          <button onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })} 
            className="px-8 py-3.5 border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-12 mt-16"
        >
          {[
            { value: '500+', label: 'Hackers' },
            { value: 'TBA', label: 'Prizes' },
            { value: '20+', label: 'Speakers' },
            { value: '48h', label: 'Of Building' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-[#4a5568]">
      <div className="absolute inset-0 opacity-20">
        <img src="/cini-pattern.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-4 block">
            About
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Where Ethereum meets Anatolia
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            ETH Ankara is more than a hackathon — it's a celebration of the Ethereum community in Turkey. 
            Join us for two days of intense building, inspiring talks, and meaningful connections.
          </p>
          <p className="text-white/60 text-lg leading-relaxed">
            Whether you're a seasoned developer, a curious newcomer, or a blockchain enthusiast, 
            there's something for everyone. Learn from industry leaders, collaborate with talented builders, 
            and be part of the future of Web3.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Hackathon Section
function HackathonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section id="hackathon" ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-[#374151]">
      <div className="absolute inset-0 opacity-30">
        <img src="/hackathon-code.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-4 block">
              Hackathon
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Build the future
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              48 hours to bring your ideas to life. Smart contracts, dApps, DeFi protocols — 
              build whatever you can imagine with mentorship from industry experts.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-2xl font-bold text-white mb-1">Yakında Duyurulacak</div>
                <div className="text-white/50">Ödül Havuzu</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">48h</div>
                <div className="text-white/50">To Build</div>
              </div>
            </div>

            <button onClick={() => setDialogOpen(true)} 
              className="px-8 py-3.5 bg-white text-[#374151] font-medium rounded-md hover:bg-white/90 transition-colors">
              Apply for Hackathon
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <img src="/ankara-cat.png" alt="" className="w-64 h-64 opacity-80" />
          </motion.div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#374151] border-0">
          <DialogHeader>
            <DialogTitle className="text-white">Hackathon Registration</DialogTitle>
            <DialogDescription className="text-white/50">
              Applications will open soon. Follow us on Twitter for updates.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}

// Speakers Section
function SpeakersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section id="speakers" ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-[#2d3748]">
      <div className="absolute inset-0 opacity-20">
        <img src="/mozaik-lamba.png" alt="" className="w-full h-full object-contain opacity-30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-4 block">
            Speakers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Learn from the best
          </h2>
          <p className="text-white/60 text-lg mb-12">
            Industry leaders, protocol engineers, and founders sharing their expertise. 
            Speaker lineup coming soon.
          </p>

          <div className="flex justify-center gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20" />
              </div>
            ))}
          </div>

          <button onClick={() => setDialogOpen(true)} 
            className="px-8 py-3.5 border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors">
            Suggest a Speaker
          </button>
        </motion.div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#2d3748] border-0">
          <DialogHeader>
            <DialogTitle className="text-white">Suggest a Speaker</DialogTitle>
            <DialogDescription className="text-white/50">
              Speaker nominations will open soon.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}

// Schedule Section
function ScheduleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeDay, setActiveDay] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section id="schedule" ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-[#1a202c]">
      <div className="absolute inset-0 opacity-30">
        <img src="/ebru-art.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-4 block">
            Schedule
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Two days of events
          </h2>

          <div className="flex justify-center gap-4 mb-8">
            {[
              { day: 1, label: 'Day 1 — May 23' },
              { day: 2, label: 'Day 2 — May 24' },
            ].map(({ day, label }) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeDay === day 
                    ? 'bg-white text-[#1a202c]' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="text-white/50 mb-8">
            Full schedule will be announced soon.
          </p>

          <button onClick={() => setDialogOpen(true)} 
            className="px-8 py-3.5 border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors inline-flex items-center gap-2">
            <Clock size={18} />
            Get Notified
          </button>
        </motion.div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1a202c] border-0">
          <DialogHeader>
            <DialogTitle className="text-white">Schedule Updates</DialogTitle>
            <DialogDescription className="text-white/50">
              Subscribe to our newsletter for updates.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}

// Sponsors Section
function SponsorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section id="sponsors" ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-[#2d3748]">
      <div className="absolute inset-0 opacity-15">
        <img src="/anitkabir-silhouette.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-4 block">
            Sponsors
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Partner with us
          </h2>
          <p className="text-white/60 text-lg mb-12">
            Join leading protocols and organizations in supporting the Ethereum ecosystem in Turkey.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { name: 'Platinum', spots: 3 },
              { name: 'Gold', spots: 5 },
              { name: 'Silver', spots: 8 },
            ].map((tier) => (
              <div key={tier.name} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{tier.spots}</div>
                <div className="text-white/50 text-sm">{tier.name}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setDialogOpen(true)} 
            className="px-8 py-3.5 border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors">
            Become a Sponsor
          </button>
        </motion.div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#2d3748] border-0">
          <DialogHeader>
            <DialogTitle className="text-white">Sponsorship</DialogTitle>
            <DialogDescription className="text-white/50">
              Bize ulaşın: blockchain@tedu.edu.tr
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}

// Tickets Section
function TicketsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tickets" ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-[#4a5568]">
      <div className="absolute inset-0 opacity-20">
        <img src="/cini-pattern.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-4 block">
            Tickets
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Reserve your spot
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Early bird tickets available soon. Student discounts available.
          </p>

          <div className="flex flex-col items-center gap-4 justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white/70 font-medium rounded-md">
              <Clock size={18} />
              Bilet satışları yakında duyurulacak
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer ref={ref} className="bg-[#1a202c] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Stay updated
            </h3>
            <p className="text-white/50 mb-6">
              Get the latest news on speakers, schedule, and ticket releases.
            </p>
            
            {subscribed ? (
              <p className="text-cyan-400">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border-0 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
                <button type="submit" className="px-6 py-3 bg-white text-[#1a202c] font-medium rounded-md hover:bg-white/90 transition-colors">
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              <a href="mailto:blockchain@tedu.edu.tr" className="block text-white/50 hover:text-cyan-400 transition-colors">
                blockchain@tedu.edu.tr
              </a>
              <a href="https://x.com/ethankaraxyz" target="_blank" rel="noopener noreferrer" className="block text-white/50 hover:text-cyan-400 transition-colors">
                Twitter / X
              </a>
              <a href="https://t.me/ethankara" target="_blank" rel="noopener noreferrer" className="block text-white/50 hover:text-cyan-400 transition-colors">
                Telegram
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/30 text-sm">
            © 2026 ETH ANKARA. All rights reserved.
          </p>
          <a href="#" className="text-white/30 hover:text-white text-sm transition-colors">
            Code of Conduct
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <div className="min-h-screen">
          <Navigation />
          <main>
            <HeroSection />
            <AboutSection />
            <HackathonSection />
            <SpeakersSection />
            <ScheduleSection />
            <SponsorsSection />
            <TicketsSection />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
