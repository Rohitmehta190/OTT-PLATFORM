import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContentCard from '../components/ui/ContentCard';
import NeonButton from '../components/ui/NeonButton';
import { useDemoStore } from '../store/demoStore';

function Browse() {
  const navigate = useNavigate();
  const { content, searchContent, loading } = useDemoStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    genre: '',
    content_type: '',
    language: '',
    rating: '',
    sort_by: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Load initial content
    searchContent('', filters);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    searchContent(searchQuery, filters);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    searchContent(searchQuery, newFilters);
  };

  const clearFilters = () => {
    setFilters({
      genre: '',
      content_type: '',
      language: '',
      rating: '',
      sort_by: 'relevance'
    });
    setSearchQuery('');
    searchContent('', {});
  };

  const handlePlay = (content) => {
    navigate(`/watch/${content.id}`);
  };

  const handleAddToWatchlist = (content) => {
    // Add to watchlist logic
    console.log('Added to watchlist:', content.title);
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-6">Browse Content</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, TV shows, genres..."
                className="w-full px-6 py-4 pl-12 bg-primary-100 border border-primary-300 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-primary-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-neon-blue text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-neon-blue text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <NeonButton
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </NeonButton>
            </div>

            {/* Active Filters */}
            <div className="flex items-center gap-2">
              {Object.values(filters).some(value => value) && (
                <NeonButton
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm"
                >
                  Clear All
                </NeonButton>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-primary-100 rounded-xl border border-primary-300"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Genre
                </label>
                <select
                  value={filters.genre}
                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                  className="w-full px-3 py-2 bg-primary-200 border border-primary-400 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                >
                  <option value="">All Genres</option>
                  <option value="action">Action</option>
                  <option value="comedy">Comedy</option>
                  <option value="drama">Drama</option>
                  <option value="horror">Horror</option>
                  <option value="sci-fi">Sci-Fi</option>
                  <option value="romance">Romance</option>
                  <option value="thriller">Thriller</option>
                </select>
              </div>

              {/* Content Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={filters.content_type}
                  onChange={(e) => handleFilterChange('content_type', e.target.value)}
                  className="w-full px-3 py-2 bg-primary-200 border border-primary-400 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                >
                  <option value="">All Types</option>
                  <option value="movie">Movies</option>
                  <option value="series">TV Series</option>
                  <option value="documentary">Documentaries</option>
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  className="w-full px-3 py-2 bg-primary-200 border border-primary-400 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                >
                  <option value="">All Languages</option>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sort_by}
                  onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                  className="w-full px-3 py-2 bg-primary-200 border border-primary-400 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-300">
            {loading ? 'Searching...' : `Found ${content.length} results`}
          </p>
        </div>

        {/* Content Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="loading-spinner" />
          </div>
        ) : content.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-white mb-4">
              No content found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters
            </p>
            <NeonButton onClick={clearFilters}>
              Clear Filters
            </NeonButton>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
                : 'space-y-4'
            }
          >
            {content.map((item) => (
              <ContentCard
                key={item.id}
                content={item}
                onPlay={handlePlay}
                onAddToWatchlist={handleAddToWatchlist}
                variant={viewMode === 'grid' ? 'default' : 'compact'}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Browse;
