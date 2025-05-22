import { Link } from "react-router-dom";
import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import icon from "../assets/icons/Untitled design (2).png";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: Instagram,
      href: "/",
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    {
      icon: Twitter,
      href: "/",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: Linkedin,
      href: "/",
      label: "LinkedIn",
      color: "hover:text-blue-500",
    },
    {
      icon: Github,
      href: "/",
      label: "GitHub",
      color: "hover:text-purple-400",
    },
  ];

  const footerSections = [
    {
      title: "Products",
      links: [
        { name: "Overview", href: "/" },
        { name: "Solutions", href: "/" },
        { name: "Pricing", href: "/" },
        { name: "Customers", href: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/" },
        { name: "Investor Relations", href: "/" },
        { name: "Jobs", href: "/" },
        { name: "Press", href: "/" },
        { name: "Blog", href: "/" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact", href: "/" },
        { name: "Documentation", href: "/" },
        { name: "Chat", href: "/" },
        { name: "FAQ", href: "/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/" },
        { name: "Privacy Policy", href: "/" },
        { name: "Cookie Settings", href: "/" },
      ],
    },
  ];

  return (
    <div className="print:hidden relative">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}

      {/* Main Footer */}
      <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="relative z-10 border-b border-white/10">
          <div className="max-w-screen-2xl px-6 md:px-8 mx-auto py-16">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30 mb-6">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 text-sm font-medium">
                    Stay Connected
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
                  Join Our Newsletter
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  Get the latest updates, exclusive offers, and insights
                  delivered straight to your inbox.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  />
                  <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Footer Content */}
        <footer className="relative z-10 max-w-screen-2xl px-6 md:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 pt-16 lg:pt-20 mb-16">
            {/* Brand Section */}
            <div className="col-span-full lg:col-span-2">
              <div className="mb-8">
                <Link
                  to="/"
                  className="inline-flex items-center text-3xl md:text-4xl font-bold group"
                  aria-label="Shoishob logo"
                >
                  <div className="relative mr-3">
                    <img
                      src={icon}
                      alt="Shoishob"
                      className="h-16 w-16 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300">
                    Shoishob
                  </span>
                </Link>
              </div>

              <p className="text-slate-400 leading-relaxed mb-8 max-w-md">
                We encourage you to explore our website or reach out to our
                dedicated team. We are eager to provide you with detailed
                information, answer any questions you may have, and assist you
                in discovering the unique aspects of our organization.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                  <span>hello@shoishob.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                  <span>123 Innovation Street, Tech City</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <Link
                    key={label}
                    to={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-400 ${color} transition-all duration-300 hover:border-current hover:bg-slate-700/50 hover:scale-110 group`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, sectionIndex) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                  {section.title}
                </h3>
                <nav className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <div key={link.name}>
                      <Link
                        to={link.href}
                        className="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                        style={{
                          animationDelay: `${
                            (sectionIndex * section.links.length + linkIndex) *
                            100
                          }ms`,
                        }}
                      >
                        <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                          {link.name}
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-800 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>© {currentYear} Shoishob. All rights reserved.</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>by</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-medium">
                  Tarek Sabbir
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
