import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X, Home, Tv, Film, TrendingUp, Bookmark } from 'lucide-react';

const NeonNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'TV Shows', href: '/tv-shows', icon: Tv },
    { name: 'Movies', href: '/movies', icon: Film },
    { name: 'New & Popular', href: '/new-popular', icon: TrendingUp },
    { name: 'My List', href: '/my-list', icon: Bookmark },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleNavClick = (href) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`neon-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="neon-brand cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-black font-bold text-2xl shadow-[0_0_20px_var(--neon-primary)]">
              S
            </div>
            STREAMFLIX
          </div>

          {/* Desktop Navigation */}
          <ul className="neon-nav hidden lg:flex">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`neon-nav-link ${
                    location.pathname === item.href ? 'active' : ''
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="neon-search hidden md:block">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, people, genres..."
                    className="neon-search-input"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-cyan-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-cyan-400 hover:text-white transition-all hover:shadow-[0_0_20px_var(--neon-primary)]"
                >
                  <Search className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="relative text-cyan-400 hover:text-white transition-all hover:shadow-[0_0_20px_var(--neon-primary)]">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_10px_var(--neon-danger)]"></span>
            </button>

            {/* Profile */}
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer transition-all hover:shadow-[0_0_20px_var(--neon-secondary)]">
              <User className="w-5 h-5 text-white" />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-cyan-400 hover:text-white transition-all hover:shadow-[0_0_20px_var(--neon-primary)]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 pb-2">
            {/* Mobile Search */}
            <div className="neon-search mb-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search titles, people, genres..."
                  className="neon-search-input"
                />
                <button type="submit" className="neon-search-btn">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Mobile Navigation */}
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`neon-nav-link w-full text-left flex items-center gap-3 ${
                      location.pathname === item.href ? 'active' : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Spacer */}
      <div className="h-20 lg:hidden"></div>
    </>
  );
};

export default NeonNavbar;
