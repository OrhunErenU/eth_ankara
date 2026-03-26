import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Twitter, Github, Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Can Yilmaz',
    role: 'Event Lead',
    image: '/team-1.jpg',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Zeynep Kaya',
    role: 'Operations',
    image: '/team-2.jpg',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Emre Demir',
    role: 'Technical Lead',
    image: '/team-3.jpg',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Ada Sahin',
    role: 'Marketing',
    image: '/team-4.jpg',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
];

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group text-center"
    >
      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white/10">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      
      <h3 className="text-lg font-semibold text-white">{member.name}</h3>
      <p className="text-white/50 text-sm mb-3">{member.role}</p>
      
      <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {member.twitter && (
          <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors">
            <Twitter size={16} />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors">
            <Github size={16} />
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 transition-colors">
            <Linkedin size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Team() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <div className="min-h-screen bg-[#3d4852]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#3d4852]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="text-white font-semibold text-lg tracking-wider">
            ETH ANKARA
          </a>
          <a href="/" className="text-white/50 hover:text-white transition-colors inline-flex items-center gap-2 text-sm">
            <ArrowLeft size={16} />
            Back to home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-4 block">
            Team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet the team
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            The passionate builders behind ETH ANKARA. We're on a mission to bring the Ethereum community together in Turkey's capital.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white/5 rounded-xl p-10 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Want to join the team?
            </h2>
            <p className="text-white/50 mb-8">
              We're always looking for passionate volunteers to help make ETH ANKARA unforgettable.
            </p>
            <a href="mailto:hello@ethankara.xyz" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#3d4852] font-medium rounded-md hover:bg-white/90 transition-colors">
              Get in touch
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/30 text-sm">
          <p>© 2026 ETH ANKARA. All rights reserved.</p>
          <a href="/" className="hover:text-white transition-colors">
            Back to home
          </a>
        </div>
      </footer>
    </div>
  );
}
