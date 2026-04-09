import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Play, 
  Star, 
  Heart, 
  Bookmark, 
  Eye,
  Zap,
  Trophy,
  Target,
  Flame,
  Crown,
  Gem,
  Rocket
} from 'lucide-react';

const ProfileStats = ({ stats = {} }) => {
  const defaultStats = {
    moviesWatched: 47,
    seriesCompleted: 23,
    hoursWatched: 156,
    favoritesCount: 89,
    watchlistCount: 12,
    reviewsCount: 15,
    achievementsUnlocked: 8,
    currentStreak: 5,
    longestStreak: 12,
    avgRating: 4.2,
    topGenre: 'Sci-Fi',
    joinDate: 'January 2024'
  };

  const userStats = { ...defaultStats, ...stats };

  const achievements = [
    { id: 1, name: 'Speed Watcher', icon: Zap, color: 'from-neon-blue to-neon-purple', unlocked: true, description: 'Watch 10 movies in a month' },
    { id: 2, name: 'Top Critic', icon: Star, color: 'from-neon-pink to-neon-purple', unlocked: true, description: 'Write 25 reviews' },
    { id: 3, name: 'Binge Watcher', icon: Play, color: 'from-neon-green to-neon-blue', unlocked: true, description: 'Complete a series in a week' },
    { id: 4, name: 'Collector', icon: Heart, color: 'from-neon-orange to-neon-pink', unlocked: true, description: 'Add 100 favorites' },
    { id: 5, name: 'Explorer', icon: Target, color: 'from-neon-blue to-neon-green', unlocked: false, description: 'Watch 5 different genres' },
    { id: 6, name: 'Night Owl', icon: Clock, color: 'from-neon-purple to-neon-blue', unlocked: false, description: 'Watch 50+ hours at night' },
    { id: 7, name: 'Streak Master', icon: Flame, color: 'from-orange-500 to-red-500', unlocked: false, description: '30 day watching streak' },
    { id: 8, name: 'Elite Member', icon: Crown, color: 'from-yellow-400 to-yellow-600', unlocked: false, description: 'Reach PRO status' }
  ];

  const StatCard = ({ icon: Icon, label, value, color, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-primary-800/50 backdrop-blur-xl rounded-xl border border-primary-600 p-6 hover:border-neon-blue/50 transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-gradient-to-r ${color} rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {value}
        </div>
      </div>
      <p className="text-gray-300 text-sm font-medium">{label}</p>
      <div className="mt-2 h-1 bg-primary-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((parseInt(value) / 100) * 100, 100)}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8 }}
          className={`h-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );

  const AchievementCard = ({ achievement, index }) => {
    const Icon = achievement.icon;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`relative group ${
          achievement.unlocked 
            ? 'bg-gradient-to-br from-primary-800/50 to-accent-800/50 border border-neon-blue/30' 
            : 'bg-primary-800/30 border border-primary-600 opacity-60'
        } rounded-xl p-4 backdrop-blur-sm hover:scale-105 transition-all cursor-pointer`}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`p-3 rounded-full mb-3 ${
            achievement.unlocked 
              ? `bg-gradient-to-r ${achievement.color}` 
              : 'bg-primary-700'
          }`}>
            <Icon className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`} />
          </div>
          <h4 className={`text-sm font-semibold mb-1 ${
            achievement.unlocked ? 'text-white' : 'text-gray-500'
          }`}>
            {achievement.name}
          </h4>
          <p className="text-xs text-gray-400 mb-2">{achievement.description}</p>
          {achievement.unlocked && (
            <div className="flex items-center gap-1 text-neon-green text-xs">
              <Trophy className="w-3 h-3" />
              <span>Unlocked</span>
            </div>
          )}
        </div>
        
        {!achievement.unlocked && (
          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-center">
              <Gem className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-300">Keep watching to unlock!</p>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Play}
          label="Movies Watched"
          value={userStats.moviesWatched}
          color="from-neon-blue to-neon-purple"
          delay={0}
        />
        <StatCard
          icon={TrendingUp}
          label="Series Completed"
          value={userStats.seriesCompleted}
          color="from-neon-pink to-neon-purple"
          delay={0.1}
        />
        <StatCard
          icon={Clock}
          label="Hours Watched"
          value={userStats.hoursWatched}
          color="from-neon-green to-neon-blue"
          delay={0.2}
        />
        <StatCard
          icon={Heart}
          label="Favorites"
          value={userStats.favoritesCount}
          color="from-neon-orange to-neon-pink"
          delay={0.3}
        />
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Watching Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-primary-800/50 backdrop-blur-xl rounded-2xl border border-primary-600 p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Flame className="w-5 h-5 text-neon-orange" />
            Watching Activity
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-orange/20 rounded-lg">
                  <Flame className="w-4 h-4 text-neon-orange" />
                </div>
                <div>
                  <p className="text-white font-medium">Current Streak</p>
                  <p className="text-gray-400 text-sm">Days in a row</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neon-orange">{userStats.currentStreak}</p>
                <p className="text-xs text-gray-400">days</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-primary-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-blue/20 rounded-lg">
                  <Trophy className="w-4 h-4 text-neon-blue" />
                </div>
                <div>
                  <p className="text-white font-medium">Longest Streak</p>
                  <p className="text-gray-400 text-sm">Personal best</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neon-blue">{userStats.longestStreak}</p>
                <p className="text-xs text-gray-400">days</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-primary-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-green/20 rounded-lg">
                  <Star className="w-4 h-4 text-neon-green" />
                </div>
                <div>
                  <p className="text-white font-medium">Average Rating</p>
                  <p className="text-gray-400 text-sm">Your ratings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neon-green">{userStats.avgRating}</p>
                <p className="text-xs text-gray-400">/ 5.0</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-primary-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-purple/20 rounded-lg">
                  <Target className="w-4 h-4 text-neon-purple" />
                </div>
                <div>
                  <p className="text-white font-medium">Top Genre</p>
                  <p className="text-gray-400 text-sm">Most watched</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-neon-purple">{userStats.topGenre}</p>
                <p className="text-xs text-gray-400">genre</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-primary-800/50 backdrop-blur-xl rounded-2xl border border-primary-600 p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-neon-blue" />
            Content Stats
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-blue/20 rounded-lg">
                  <Bookmark className="w-4 h-4 text-neon-blue" />
                </div>
                <div>
                  <p className="text-white font-medium">Watchlist</p>
                  <p className="text-gray-400 text-sm">To watch later</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neon-blue">{userStats.watchlistCount}</p>
                <p className="text-xs text-gray-400">items</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-primary-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-pink/20 rounded-lg">
                  <Heart className="w-4 h-4 text-neon-pink" />
                </div>
                <div>
                  <p className="text-white font-medium">Favorites</p>
                  <p className="text-gray-400 text-sm">Loved content</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neon-pink">{userStats.favoritesCount}</p>
                <p className="text-xs text-gray-400">items</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-primary-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-green/20 rounded-lg">
                  <Star className="w-4 h-4 text-neon-green" />
                </div>
                <div>
                  <p className="text-white font-medium">Reviews</p>
                  <p className="text-gray-400 text-sm">Written reviews</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neon-green">{userStats.reviewsCount}</p>
                <p className="text-xs text-gray-400">reviews</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-primary-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-purple/20 rounded-lg">
                  <Eye className="w-4 h-4 text-neon-purple" />
                </div>
                <div>
                  <p className="text-white font-medium">Profile Views</p>
                  <p className="text-gray-400 text-sm">This month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neon-purple">234</p>
                <p className="text-xs text-gray-400">views</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-primary-800/50 backdrop-blur-xl rounded-2xl border border-primary-600 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-neon-yellow" />
            Achievements
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {achievements.filter(a => a.unlocked).length} / {achievements.length}
            </span>
            <div className="w-32 h-2 bg-primary-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-yellow to-neon-orange transition-all duration-1000"
                style={{ width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg border border-neon-blue/30">
          <div className="flex items-center gap-3">
            <Rocket className="w-5 h-5 text-neon-blue" />
            <div className="flex-1">
              <p className="text-white font-medium">Next Achievement</p>
              <p className="text-gray-400 text-sm">Watch 5 more movies to unlock "Explorer"</p>
            </div>
            <div className="text-neon-blue font-medium">5/10</div>
          </div>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-primary-800/50 to-accent-800/50 backdrop-blur-xl rounded-2xl border border-primary-600 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-neon-green" />
          Progress Overview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-primary-700"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.75)}`}
                  className="text-neon-blue"
                  initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - 0.75) }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">75%</span>
              </div>
            </div>
            <p className="text-white font-medium">Monthly Goal</p>
            <p className="text-gray-400 text-sm">15 of 20 movies</p>
          </div>

          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-primary-700"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.6)}`}
                  className="text-neon-pink"
                  initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - 0.6) }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">60%</span>
              </div>
            </div>
            <p className="text-white font-medium">Series Progress</p>
            <p className="text-gray-400 text-sm">3 of 5 completed</p>
          </div>

          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-primary-700"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.4)}`}
                  className="text-neon-green"
                  initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - 0.4) }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">40%</span>
              </div>
            </div>
            <p className="text-white font-medium">Yearly Goal</p>
            <p className="text-gray-400 text-sm">40 of 100 movies</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileStats;
