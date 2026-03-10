import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NetflixHero from '../components/Professional/NetflixHero';
import ContentCarousel from '../components/Professional/ContentCarousel';
import ProfessionalNavbar from '../components/Professional/ProfessionalNavbar';

const ProfessionalHome = () => {
  const [featuredContent, setFeaturedContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data - in production, this would come from API
  const sampleContent = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
      posterUrl: "https://picsum.photos/seed/stranger-things/300/450",
      backdropUrl: "https://picsum.photos/seed/stranger-things-bg/800/450",
      year: "2016",
      rating: "TV-14",
      match: "98%",
      genre: "Sci-Fi",
      type: "series"
    },
    {
      id: 2,
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign.",
      posterUrl: "https://picsum.photos/seed/the-crown/300/450",
      backdropUrl: "https://picsum.photos/seed/the-crown-bg/800/450",
      year: "2016",
      rating: "TV-MA",
      match: "92%",
      genre: "Drama",
      type: "series"
    },
    {
      id: 3,
      title: "The Witcher",
      description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny.",
      posterUrl: "https://picsum.photos/seed/witcher/300/450",
      backdropUrl: "https://picsum.photos/seed/witcher-bg/800/450",
      year: "2019",
      rating: "TV-MA",
      match: "89%",
      genre: "Fantasy",
      type: "series"
    },
    {
      id: 4,
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology.",
      posterUrl: "https://picsum.photos/seed/inception/300/450",
      backdropUrl: "https://picsum.photos/seed/inception-bg/800/450",
      year: "2010",
      rating: "PG-13",
      match: "94%",
      genre: "Sci-Fi",
      type: "movie"
    },
    {
      id: 5,
      title: "The Dark Knight",
      description: "Batman must accept one of the greatest psychological and physical tests of his ability.",
      posterUrl: "https://picsum.photos/seed/dark-knight/300/450",
      backdropUrl: "https://picsum.photos/seed/dark-knight-bg/800/450",
      year: "2008",
      rating: "PG-13",
      match: "96%",
      genre: "Action",
      type: "movie"
    },
    {
      id: 6,
      title: "Breaking Bad",
      description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
      posterUrl: "https://picsum.photos/seed/breaking-bad/300/450",
      backdropUrl: "https://picsum.photos/seed/breaking-bad-bg/800/450",
      year: "2008",
      rating: "TV-MA",
      match: "97%",
      genre: "Crime",
      type: "series"
    },
    {
      id: 7,
      title: "The Mandalorian",
      description: "The travels of a lone bounty hunter in the outer reaches of the galaxy.",
      posterUrl: "https://picsum.photos/seed/mandalorian/300/450",
      backdropUrl: "https://picsum.photos/seed/mandalorian-bg/800/450",
      year: "2019",
      rating: "TV-14",
      match: "91%",
      genre: "Sci-Fi",
      type: "series"
    },
    {
      id: 8,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      posterUrl: "https://picsum.photos/seed/interstellar/300/450",
      backdropUrl: "https://picsum.photos/seed/interstellar-bg/800/450",
      year: "2014",
      rating: "PG-13",
      match: "88%",
      genre: "Sci-Fi",
      type: "movie"
    },
    {
      id: 9,
      title: "The Queen's Gambit",
      description: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess.",
      posterUrl: "https://picsum.photos/seed/queens-gambit/300/450",
      backdropUrl: "https://picsum.photos/seed/queens-gambit-bg/800/450",
      year: "2020",
      rating: "TV-MA",
      match: "93%",
      genre: "Drama",
      type: "series"
    },
    {
      id: 10,
      title: "The Matrix",
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
      posterUrl: "https://picsum.photos/seed/matrix/300/450",
      backdropUrl: "https://picsum.photos/seed/matrix-bg/800/450",
      year: "1999",
      rating: "R",
      match: "87%",
      genre: "Sci-Fi",
      type: "movie"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set content data
      setFeaturedContent(sampleContent.slice(0, 3));
      setTrendingContent(sampleContent.slice(0, 8));
      setNewReleases(sampleContent.slice(2, 10));
      setContinueWatching(sampleContent.slice(0, 5));
      setMyList(sampleContent.slice(1, 7));
      
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4" />
          <p className="text-white text-lg">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <ProfessionalNavbar />
      
      {/* Hero Section */}
      <NetflixHero content={featuredContent[0]} />

      {/* Content Sections */}
      <div className="bg-black">
        {/* Continue Watching */}
        {continueWatching.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ContentCarousel
              title="Continue Watching"
              items={continueWatching}
              type="backdrop"
              autoScroll={false}
            />
          </motion.div>
        )}

        {/* Trending Now */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ContentCarousel
            title="Trending Now"
            items={trendingContent}
            type="poster"
            autoScroll={true}
            scrollSpeed={4000}
          />
        </motion.div>

        {/* New Releases */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ContentCarousel
            title="New Releases"
            items={newReleases}
            type="poster"
            autoScroll={false}
          />
        </motion.div>

        {/* My List */}
        {myList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ContentCarousel
              title="My List"
              items={myList}
              type="poster"
              autoScroll={false}
            />
          </motion.div>
        )}

        {/* Blockbuster Movies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ContentCarousel
            title="Blockbuster Movies"
            items={sampleContent.filter(item => item.type === 'movie')}
            type="backdrop"
            autoScroll={true}
            scrollSpeed={5000}
          />
        </motion.div>

        {/* Binge-Worthy Series */}
        <motion.div
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <ContentCarousel
              title="Binge-Worthy Series"
              items={sampleContent.filter(item => item.type === 'series')}
              type="poster"
              autoScroll={false}
            />
          </motion.div>

        {/* Action & Adventure */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ContentCarousel
              title="Action & Adventure"
              items={sampleContent.filter(item => item.genre === 'Action' || item.genre === 'Sci-Fi')}
              type="poster"
              autoScroll={true}
              scrollSpeed={4500}
            />
          </motion.div>

        {/* Award Winners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <ContentCarousel
            title="Award Winners"
            items={sampleContent.filter(item => parseInt(item.match) >= 90)}
            type="backdrop"
            autoScroll={false}
          />
        </motion.div>
      </div>

        {/* Footer */}
        <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 py-12 px-8 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">View</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Website</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mobile App</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Smart TV</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tablet</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Use</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Copyright</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Social</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <span className="text-red-600 font-bold text-2xl">TREAMFLIX</span>
                </div>
                <p className="text-gray-400 text-sm">
                  © 2024 Streamflix. All rights reserved. This is a demo application.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProfessionalHome;
