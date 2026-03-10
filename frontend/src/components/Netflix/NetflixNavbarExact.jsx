import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';

const NetflixNavbarExact = () => {
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
    { name: 'Home', href: '/' },
    { name: 'TV Shows', href: '/tv-shows' },
    { name: 'Movies', href: '/movies' },
    { name: 'New & Popular', href: '/new-popular' },
    { name: 'My List', href: '/my-list' },
    { name: 'Browse by Languages', href: '/languages' },
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
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-content">
          <div className="navbar-left">
            {/* Logo */}
            <div 
              className="navbar-brand"
              onClick={() => navigate('/')}
            >
              <div className="logo">S</div>
              STREAMFLIX
            </div>

            {/* Desktop Navigation */}
            <ul className="navbar-nav hidden md:flex">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`nav-link ${
                      location.pathname === item.href ? 'active' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className="navbar-right">
            {/* Search */}
            <div className="search-container hidden md:block">
              {isSearchOpen ? (
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, people, genres..."
                    className="search-input"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="icon-button"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="icon-button hidden md:block">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="profile-button hidden md:block">
              <User className="w-4 h-4" />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="icon-button md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 pb-2">
            {/* Mobile Search */}
            <div className="search-container mb-4 px-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, people, genres..."
                    className="search-input pl-10"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Navigation */}
            <ul className="space-y-2 px-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`nav-link w-full text-left ${
                      location.pathname === item.href ? 'active' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Profile */}
            <div className="px-4 pt-4 pb-2 border-t border-gray-700 mt-4">
              <div className="flex items-center gap-3">
                <div className="profile-button">
                  <User className="w-4 h-4" />
                </div>
                <button className="nav-link">Account</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Spacer */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default NetflixNavbarExact;
