import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Clock, 
  Heart, 
  Bookmark, 
  Play, 
  Star, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  Globe,
  Palette,
  CreditCard,
  LogOut,
  Edit3,
  Camera,
  Eye,
  EyeOff,
  Check,
  X,
  ChevronRight,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import NeonButton from '../components/ui/NeonButton';
import ContentCard from '../components/ui/ContentCard';
import ProfileStats from '../components/Profile/ProfileStats';
import ProfileSettings from '../components/Profile/ProfileSettings';

const Profile = () => {
  const { user, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [theme, setTheme] = useState('cyberpunk');

  // Mock data for demonstration
  const [watchHistory, setWatchHistory] = useState([
    { id: 1, title: 'Cyberpunk 2077', type: 'movie', watchedAt: '2024-01-15', progress: 100, thumbnail: '/api/placeholder/300/169' },
    { id: 2, title: 'Stranger Things', type: 'series', watchedAt: '2024-01-14', progress: 75, thumbnail: '/api/placeholder/300/169' },
    { id: 3, title: 'The Matrix', type: 'movie', watchedAt: '2024-01-13', progress: 100, thumbnail: '/api/placeholder/300/169' },
    { id: 4, title: 'Arcane', type: 'series', watchedAt: '2024-01-12', progress: 50, thumbnail: '/api/placeholder/300/169' },
  ]);

  const [favorites, setFavorites] = useState([
    { id: 1, title: 'Inception', type: 'movie', rating: 4.8, thumbnail: '/api/placeholder/300/169' },
    { id: 2, title: 'Breaking Bad', type: 'series', rating: 4.9, thumbnail: '/api/placeholder/300/169' },
    { id: 3, title: 'Interstellar', type: 'movie', rating: 4.7, thumbnail: '/api/placeholder/300/169' },
    { id: 4, title: 'The Crown', type: 'series', rating: 4.6, thumbnail: '/api/placeholder/300/169' },
  ]);

  const [watchlist, setWatchlist] = useState([
    { id: 1, title: 'Dune: Part Two', type: 'movie', releaseDate: '2024-03-01', thumbnail: '/api/placeholder/300/169' },
    { id: 2, title: 'The Last of Us', type: 'series', releaseDate: '2024-02-15', thumbnail: '/api/placeholder/300/169' },
  ]);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: 'Digital nomad and tech enthusiast. Love exploring new worlds through cinema.',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567'
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'history', label: 'Watch History', icon: Clock },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'watchlist', label: 'Watchlist', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSaveProfile = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleRemoveFromHistory = (id) => {
    setWatchHistory(watchHistory.filter(item => item.id !== id));
  };

  const handleRemoveFromFavorites = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const handleRemoveFromWatchlist = (id) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-primary-800/50 to-accent-800/50 backdrop-blur-xl rounded-2xl border border-primary-600 p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-32 h-32 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-neon-pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-white neon-text-blue">
                    {user?.username || 'Neon User'}
                  </h1>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-gradient-to-r from-neon-green to-neon-blue rounded-full text-xs text-white font-semibold">
                      PRO MEMBER
                    </span>
                    <span className="px-3 py-1 bg-primary-700 rounded-full text-xs text-gray-300">
                      Since 2024
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 max-w-2xl">
                  {formData.bio}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined January 2024</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-blue neon-text-blue">47</div>
                    <div className="text-xs text-gray-400">Movies Watched</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-pink neon-text-pink">23</div>
                    <div className="text-xs text-gray-400">Series Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-green neon-text-green">156</div>
                    <div className="text-xs text-gray-400">Hours Watched</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-purple neon-text-purple">89</div>
                    <div className="text-xs text-gray-400">Favorites</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <NeonButton
                  variant="accent"
                  size="sm"
                  icon={Edit3}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </NeonButton>
                <NeonButton
                  variant="ghost"
                  size="sm"
                  icon={LogOut}
                >
                  Logout
                </NeonButton>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit Profile Form */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-primary-800/50 backdrop-blur-xl rounded-2xl border border-primary-600 p-6">
                <h3 className="text-xl font-bold text-white mb-6">Edit Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <NeonButton
                    variant="accent"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </NeonButton>
                  <NeonButton
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-primary-600">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-neon-blue border-b-2 border-neon-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <ProfileStats />}

            {activeTab === 'history' && (
              <div className="bg-primary-800/50 backdrop-blur-xl rounded-2xl border border-primary-600 p-6">
                <h3 className="text-xl font-bold text-white mb-6">Watch History</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchHistory.map((item) => (
                    <div key={item.id} className="group relative">
                      <div className="bg-primary-700/50 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gradient-to-r from-neon-blue to-neon-purple"></div>
                        <div className="p-4">
                          <h4 className="text-white font-medium mb-2">{item.title}</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{item.watchedAt}</span>
                            <span className="text-neon-green">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-primary-600 rounded-full h-2 mt-2">
                            <div 
                              className="bg-gradient-to-r from-neon-green to-neon-blue h-2 rounded-full"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFromHistory(item.id)}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-primary-800/50 backdrop-blur-xl rounded-2xl border border-primary-600 p-6">
                <h3 className="text-xl font-bold text-white mb-6">Favorite Content</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {favorites.map((item) => (
                    <div key={item.id} className="group relative">
                      <div className="bg-primary-700/50 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gradient-to-r from-neon-pink to-neon-purple"></div>
                        <div className="p-3">
                          <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-neon-yellow fill-current" />
                            <span className="text-xs text-gray-400">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFromFavorites(item.id)}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'watchlist' && (
              <div className="bg-primary-800/50 backdrop-blur-xl rounded-2xl border border-primary-600 p-6">
                <h3 className="text-xl font-bold text-white mb-6">My Watchlist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchlist.map((item) => (
                    <div key={item.id} className="group relative">
                      <div className="bg-primary-700/50 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gradient-to-r from-neon-green to-neon-blue"></div>
                        <div className="p-4">
                          <h4 className="text-white font-medium mb-2">{item.title}</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Coming {item.releaseDate}</span>
                            <span className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded text-xs">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFromWatchlist(item.id)}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-primary-800/50 backdrop-blur-xl rounded-2xl border border-primary-600 p-12 text-center">
                <Settings className="w-16 h-16 text-neon-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Profile Settings</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Manage your account settings, preferences, privacy, and more in one place.
                </p>
                <NeonButton
                  variant="accent"
                  size="lg"
                  icon={Settings}
                  onClick={() => setShowSettingsModal(true)}
                >
                  Open Settings
                </NeonButton>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettingsModal && (
            <ProfileSettings
              user={user}
              onUpdate={handleSaveProfile}
              onClose={() => setShowSettingsModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;
