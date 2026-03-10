import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import NetflixNavbarExact from '../components/Netflix/NetflixNavbarExact';
import NetflixCardExact from '../components/Netflix/NetflixCardExact';

const NetflixHomeExact = () => {
  const [loading, setLoading] = useState(true);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);

  // Sample Netflix content data
  const sampleContent = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      posterUrl: "https://picsum.photos/seed/stranger-things/200/113",
      backdropUrl: "https://picsum.photos/seed/stranger-things-bg/1920/1080",
      year: "2016",
      rating: "TV-14",
      match: "98%",
      genre: "Sci-Fi",
      type: "series",
      duration: "45 min",
      seasons: "4 Seasons"
    },
    {
      id: 2,
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
      posterUrl: "https://picsum.photos/seed/the-crown/200/113",
      backdropUrl: "https://picsum.photos/seed/the-crown-bg/1920/1080",
      year: "2016",
      rating: "TV-MA",
      match: "92%",
      genre: "Drama",
      type: "series",
      duration: "50 min",
      seasons: "6 Seasons"
    },
    {
      id: 3,
      title: "The Witcher",
      description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
      posterUrl: "https://picsum.photos/seed/witcher/200/113",
      backdropUrl: "https://picsum.photos/seed/witcher-bg/1920/1080",
      year: "2019",
      rating: "TV-MA",
      match: "89%",
      genre: "Fantasy",
      type: "series",
      duration: "55 min",
      seasons: "3 Seasons"
    },
    {
      id: 4,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterUrl: "https://picsum.photos/seed/inception/200/113",
      backdropUrl: "https://picsum.photos/seed/inception-bg/1920/1080",
      year: "2010",
      rating: "PG-13",
      match: "94%",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 28min"
    },
    {
      id: 5,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterUrl: "https://picsum.photos/seed/dark-knight/200/113",
      backdropUrl: "https://picsum.photos/seed/dark-knight-bg/1920/1080",
      year: "2008",
      rating: "PG-13",
      match: "96%",
      genre: "Action",
      type: "movie",
      duration: "2h 32min"
    },
    {
      id: 6,
      title: "Breaking Bad",
      description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
      posterUrl: "https://picsum.photos/seed/breaking-bad/200/113",
      backdropUrl: "https://picsum.photos/seed/breaking-bad-bg/1920/1080",
      year: "2008",
      rating: "TV-MA",
      match: "97%",
      genre: "Crime",
      type: "series",
      duration: "47 min",
      seasons: "5 Seasons"
    },
    {
      id: 7,
      title: "The Mandalorian",
      description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
      posterUrl: "https://picsum.photos/seed/mandalorian/200/113",
      backdropUrl: "https://picsum.photos/seed/mandalorian-bg/1920/1080",
      year: "2019",
      rating: "TV-14",
      match: "91%",
      genre: "Sci-Fi",
      type: "series",
      duration: "40 min",
      seasons: "3 Seasons"
    },
    {
      id: 8,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      posterUrl: "https://picsum.photos/seed/interstellar/200/113",
      backdropUrl: "https://picsum.photos/seed/interstellar-bg/1920/1080",
      year: "2014",
      rating: "PG-13",
      match: "88%",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 49min"
    },
    {
      id: 9,
      title: "The Queen's Gambit",
      description: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA.",
      posterUrl: "https://picsum.photos/seed/queens-gambit/200/113",
      backdropUrl: "https://picsum.photos/seed/queens-gambit-bg/1920/1080",
      year: "2020",
      rating: "TV-MA",
      match: "93%",
      genre: "Drama",
      type: "series",
      duration: "55 min",
      seasons: "1 Season"
    },
    {
      id: 10,
      title: "The Matrix",
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      posterUrl: "https://picsum.photos/seed/matrix/200/113",
      backdropUrl: "https://picsum.photos/seed/matrix-bg/1920/1080",
      year: "1999",
      rating: "R",
      match: "87%",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 16min"
    },
    {
      id: 11,
      title: "Money Heist",
      description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint.",
      posterUrl: "https://picsum.photos/seed/money-heist/200/113",
      backdropUrl: "https://picsum.photos/seed/money-heist-bg/1920/1080",
      year: "2017",
      rating: "TV-MA",
      match: "95%",
      genre: "Crime",
      type: "series",
      duration: "45 min",
      seasons: "5 Seasons"
    },
    {
      id: 12,
      title: "The Office",
      description: "A mockumentary sitcom that depicts the everyday work lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.",
      posterUrl: "https://picsum.photos/seed/the-office/200/113",
      backdropUrl: "https://picsum.photos/seed/the-office-bg/1920/1080",
      year: "2005",
      rating: "TV-14",
      match: "90%",
      genre: "Comedy",
      type: "series",
      duration: "22 min",
      seasons: "9 Seasons"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFeaturedContent(sampleContent.slice(0, 1));
      setTrendingContent(sampleContent.slice(0, 8));
      setNewReleases(sampleContent.slice(2, 10));
      setContinueWatching(sampleContent.slice(0, 5));
      setLoading(false);
    }, 1500);
  }, []);

  const handlePlay = (item) => {
    console.log('Playing:', item.title);
    // Navigate to watch page
    window.location.href = `/watch/${item.id}`;
  };

  const handleAddToList = (item) => {
    console.log('Adding to list:', item.title);
    // Add to list functionality
  };

  const handleLike = (item) => {
    console.log('Liking:', item.title);
    // Like functionality
  };

  const handleInfo = (item) => {
    console.log('Show info for:', item.title);
    // Show more info modal or navigate to details
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <NetflixNavbarExact />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img
            src={featuredContent[0]?.backdropUrl}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hero-overlay"></div>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            {featuredContent[0]?.title}
          </motion.h1>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {featuredContent[0]?.description}
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => handlePlay(featuredContent[0])}
            >
              <Play className="w-5 h-5 fill-current" />
              Play
            </button>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => handleInfo(featuredContent[0])}
            >
              <Info className="w-5 h-5" />
              More Info
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Continue Watching */}
      {continueWatching.length > 0 && (
        <section className="content-row">
          <div className="content-row-header">
            <h2 className="content-row-title">Continue Watching</h2>
          </div>
          <div className="content-row-grid">
            {continueWatching.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NetflixCardExact 
                  item={item} 
                  onPlay={handlePlay}
                  onAddToList={handleAddToList}
                  onLike={handleLike}
                  onInfo={handleInfo}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Trending Now */}
      <section className="content-row">
        <div className="content-row-header">
          <h2 className="content-row-title">Trending Now</h2>
        </div>
        <div className="content-row-grid">
          {trendingContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NetflixCardExact 
                item={item} 
                onPlay={handlePlay}
                onAddToList={handleAddToList}
                onLike={handleLike}
                onInfo={handleInfo}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="content-row">
        <div className="content-row-header">
          <h2 className="content-row-title">New Releases</h2>
        </div>
        <div className="content-row-grid">
          {newReleases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NetflixCardExact 
                item={item} 
                onPlay={handlePlay}
                onAddToList={handleAddToList}
                onLike={handleLike}
                onInfo={handleInfo}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Netflix Style Categories */}
      <section className="content-row">
        <div className="content-row-header">
          <h2 className="content-row-title">Action & Adventure</h2>
        </div>
        <div className="content-row-grid">
          {sampleContent.filter(item => item.genre === 'Action' || item.genre === 'Sci-Fi').map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NetflixCardExact 
                item={item} 
                onPlay={handlePlay}
                onAddToList={handleAddToList}
                onLike={handleLike}
                onInfo={handleInfo}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="content-row">
        <div className="content-row-header">
          <h2 className="content-row-title">Drama</h2>
        </div>
        <div className="content-row-grid">
          {sampleContent.filter(item => item.genre === 'Drama' || item.genre === 'Crime').map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NetflixCardExact 
                item={item} 
                onPlay={handlePlay}
                onAddToList={handleAddToList}
                onLike={handleLike}
                onInfo={handleInfo}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="content-row">
        <div className="content-row-header">
          <h2 className="content-row-title">Comedy</h2>
        </div>
        <div className="content-row-grid">
          {sampleContent.filter(item => item.genre === 'Comedy').map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NetflixCardExact 
                item={item} 
                onPlay={handlePlay}
                onAddToList={handleAddToList}
                onLike={handleLike}
                onInfo={handleInfo}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="content-row">
        <div className="content-row-header">
          <h2 className="content-row-title">Award Winners</h2>
        </div>
        <div className="content-row-grid">
          {sampleContent.filter(item => parseInt(item.match) >= 90).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NetflixCardExact 
                item={item} 
                onPlay={handlePlay}
                onAddToList={handleAddToList}
                onLike={handleLike}
                onInfo={handleInfo}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Press</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>View</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Website</a>
              <a href="#" className="footer-link">Mobile App</a>
              <a href="#" className="footer-link">Smart TV</a>
              <a href="#" className="footer-link">Tablet</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Terms of Use</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Cookie Policy</a>
              <a href="#" className="footer-link">Copyright</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Social</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Twitter</a>
              <a href="#" className="footer-link">Instagram</a>
              <a href="#" className="footer-link">Facebook</a>
              <a href="#" className="footer-link">YouTube</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-brand">
            <div className="logo">S</div>
            STREAMFLIX
          </div>
          <div className="footer-copyright">
            © 2024 Streamflix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NetflixHomeExact;
