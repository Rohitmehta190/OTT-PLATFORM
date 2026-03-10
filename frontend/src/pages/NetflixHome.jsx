import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import NetflixNavbar from '../components/Netflix/NetflixNavbar';
import NetflixCard from '../components/Netflix/NetflixCard';

const NetflixHome = () => {
  const [loading, setLoading] = useState(true);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);

  // Sample content data
  const sampleContent = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      posterUrl: "https://picsum.photos/seed/stranger-things/400/225",
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
      posterUrl: "https://picsum.photos/seed/the-crown/400/225",
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
      posterUrl: "https://picsum.photos/seed/witcher/400/225",
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
      posterUrl: "https://picsum.photos/seed/inception/400/225",
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
      posterUrl: "https://picsum.photos/seed/dark-knight/400/225",
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
      posterUrl: "https://picsum.photos/seed/breaking-bad/400/225",
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
      posterUrl: "https://picsum.photos/seed/mandalorian/400/225",
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
      posterUrl: "https://picsum.photos/seed/interstellar/400/225",
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
      posterUrl: "https://picsum.photos/seed/queens-gambit/400/225",
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
      posterUrl: "https://picsum.photos/seed/matrix/400/225",
      backdropUrl: "https://picsum.photos/seed/matrix-bg/1920/1080",
      year: "1999",
      rating: "R",
      match: "87%",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 16min"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFeaturedContent(sampleContent.slice(0, 3));
      setTrendingContent(sampleContent.slice(0, 8));
      setNewReleases(sampleContent.slice(2, 10));
      setContinueWatching(sampleContent.slice(0, 5));
      setLoading(false);
    }, 1500);
  }, []);

  const handlePlay = (item) => {
    console.log('Playing:', item.title);
    // Navigate to watch page
  };

  const handleAddToList = (item) => {
    console.log('Adding to list:', item.title);
  };

  const handleLike = (item) => {
    console.log('Liking:', item.title);
  };

  const handleInfo = (item) => {
    console.log('Show info for:', item.title);
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
      <NetflixNavbar />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredContent[0]?.backdropUrl}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        
        <motion.div 
          className="relative z-10 flex items-center h-full px-8 lg:px-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-2xl">
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              {featuredContent[0]?.title}
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {featuredContent[0]?.description}
            </motion.p>
            
            <motion.div 
              className="flex gap-4 items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <button 
                className="bg-white text-black px-8 py-3 rounded font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                onClick={() => handlePlay(featuredContent[0])}
              >
                <Play className="w-5 h-5 fill-current" />
                Play
              </button>
              <button className="bg-gray-700/80 text-white px-8 py-3 rounded font-semibold flex items-center gap-2 hover:bg-gray-600 transition-colors">
                <Info className="w-5 h-5" />
                More Info
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Continue Watching */}
      {continueWatching.length > 0 && (
        <section className="px-8 py-4">
          <h2 className="text-2xl font-semibold text-white mb-4">Continue Watching</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {continueWatching.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-72"
              >
                <NetflixCard 
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
      <section className="px-8 py-4">
        <h2 className="text-2xl font-semibold text-white mb-4">Trending Now</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {trendingContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-72"
            >
              <NetflixCard 
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
      <section className="px-8 py-4">
        <h2 className="text-2xl font-semibold text-white mb-4">New Releases</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {newReleases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-72"
            >
              <NetflixCard 
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
      <section className="px-8 py-4">
        <h2 className="text-2xl font-semibold text-white mb-4">Action & Adventure</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {sampleContent.filter(item => item.genre === 'Action' || item.genre === 'Sci-Fi').map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-72"
            >
              <NetflixCard 
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

      <section className="px-8 py-4">
        <h2 className="text-2xl font-semibold text-white mb-4">Drama</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {sampleContent.filter(item => item.genre === 'Drama' || item.genre === 'Crime').map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-72"
            >
              <NetflixCard 
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

      <section className="px-8 py-4">
        <h2 className="text-2xl font-semibold text-white mb-4">Award Winners</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {sampleContent.filter(item => parseInt(item.match) >= 90).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-72"
            >
              <NetflixCard 
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
      <footer className="bg-gray-900 border-t border-gray-800 px-8 py-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Careers</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Press</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Contact</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">View</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Website</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Mobile App</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Smart TV</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Tablet</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Terms of Use</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Cookie Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Copyright</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Social</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm block">YouTube</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <span className="text-red-600 font-bold text-2xl">STREAMFLIX</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Streamflix. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NetflixHome;
