import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Sun,
  Moon,
  Menu,
  X,
  Code2,
  Shield,
  Briefcase,
  User,
  GraduationCap,
  Award,
  Mail,
  FolderGit2,
} from 'lucide-react';

const Navbar = ({ profile }) => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Track scroll position for navbar styling & active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (!isHomePage) return;

      const sections = [
        'hero',
        'about',
        'skills',
        'projects',
        'education',
        'experience',
        'certificates',
        'contact',
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { name: 'About', href: '#about', icon: User, section: 'about' },
    { name: 'Skills', href: '#skills', icon: Code2, section: 'skills' },
    { name: 'Projects', href: '#projects', icon: FolderGit2, section: 'projects' },
    { name: 'Education', href: '#education', icon: GraduationCap, section: 'education' },
    { name: 'Experience', href: '#experience', icon: Briefcase, section: 'experience' },
    { name: 'Certificates', href: '#certificates', icon: Award, section: 'certificates' },
    { name: 'Contact', href: '#contact', icon: Mail, section: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    if (!isHomePage) {
      // If not on home, let react-router navigate to /#section
      return;
    }
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group focus:outline-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            K
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Kundan
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = isHomePage && activeSection === link.section;
            return (
              <a
                key={link.name}
                href={isHomePage ? link.href : `/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Side Utility Actions */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle theme mode"
          >
            {isDark ? (
              <Sun size={18} className="text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={18} className="text-indigo-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Admin Dashboard / Login Button */}
          <Link
            to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border border-indigo-200 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition"
            title="Admin Dashboard"
          >
            <Shield size={14} />
            <span>{isAuthenticated ? 'Admin' : 'Admin Login'}</span>
          </Link>

          {/* Contact Me CTA */}
          <a
            href={isHomePage ? '#contact' : '/#contact'}
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-md shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            Hire Me
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-1 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = isHomePage && activeSection === link.section;
            return (
              <a
                key={link.name}
                href={isHomePage ? link.href : `/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={18} className="text-indigo-500" />
                <span>{link.name}</span>
              </a>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <Shield size={14} />
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}</span>
            </Link>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
