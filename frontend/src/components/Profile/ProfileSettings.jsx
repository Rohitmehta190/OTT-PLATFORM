import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell, 
  Globe, 
  Palette, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Save, 
  X,
  Camera,
  Edit3,
  Check,
  AlertTriangle
} from 'lucide-react';
import NeonButton from '../ui/NeonButton';

const ProfileSettings = ({ user, onUpdate, onClose }) => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || 'Digital nomad and tech enthusiast. Love exploring new worlds through cinema.',
    location: user?.location || 'San Francisco, CA',
    phone: user?.phone || '+1 (555) 123-4567',
    website: user?.website || '',
    birthDate: user?.birthDate || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newsletter: false,
    twoFactorAuth: false,
    publicProfile: true,
    showWatchHistory: true
  });

  const [appearance, setAppearance] = useState({
    theme: 'cyberpunk',
    language: 'english',
    videoQuality: 'auto',
    autoplay: true,
    subtitles: true
  });

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const handleSavePersonalInfo = async () => {
    setIsLoading(true);
    try {
      await onUpdate(formData);
      // Show success message
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // Show error message
      return;
    }
    setIsLoading(true);
    try {
      // API call to change password
      setShowPasswordForm(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Failed to change password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      // API call to delete account
      // Redirect to home
    } catch (error) {
      console.error('Failed to delete account:', error);
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const renderPersonalInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Profile Picture */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-neon-pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Profile Picture</h3>
          <p className="text-sm text-gray-400">JPG, GIF or PNG. Max size of 2MB</p>
          <NeonButton variant="ghost" size="sm" className="mt-2">
            Upload New Photo
          </NeonButton>
        </div>
      </div>

      {/* Personal Information Form */}
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
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
          <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({...formData, website: e.target.value})}
            placeholder="https://yourwebsite.com"
            className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Birth Date</label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
          rows={4}
          className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue resize-none"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="flex gap-2">
        <NeonButton
          variant="accent"
          onClick={handleSavePersonalInfo}
          loading={isLoading}
          icon={Save}
        >
          Save Changes
        </NeonButton>
        <NeonButton variant="ghost" onClick={onClose}>
          Cancel
        </NeonButton>
      </div>
    </motion.div>
  );

  const renderSecurity = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Password</h3>
        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="w-full p-4 bg-primary-700/50 rounded-lg text-left hover:bg-primary-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Change Password</p>
              <p className="text-gray-400 text-sm">Last changed 3 months ago</p>
            </div>
            <Edit3 className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        <AnimatePresence>
          {showPasswordForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-primary-700/30 rounded-lg border border-primary-600"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  />
                </div>
                <div className="flex gap-2">
                  <NeonButton
                    variant="accent"
                    size="sm"
                    onClick={handleChangePassword}
                    loading={isLoading}
                  >
                    Update Password
                  </NeonButton>
                  <NeonButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Cancel
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
        <div className="p-4 bg-primary-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Enable 2FA</p>
              <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => setPreferences({...preferences, twoFactorAuth: !preferences.twoFactorAuth})}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.twoFactorAuth ? 'bg-neon-blue' : 'bg-primary-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4 text-red-400">Danger Zone</h3>
        <div className="p-4 bg-red-900/20 rounded-lg border border-red-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Delete Account</p>
              <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
            </div>
            <NeonButton
              variant="ghost"
              size="sm"
              className="text-red-400 border-red-600 hover:bg-red-900/30"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete Account
            </NeonButton>
          </div>
        </div>

        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-red-900/30 rounded-lg border border-red-600/50"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-white font-medium mb-2">Are you absolutely sure?</p>
                  <p className="text-gray-400 text-sm mb-4">
                    This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                  </p>
                  <div className="flex gap-2">
                    <NeonButton
                      variant="accent"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleDeleteAccount}
                      loading={isLoading}
                    >
                      Yes, Delete Account
                    </NeonButton>
                    <NeonButton
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </NeonButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  const renderNotifications = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="p-4 bg-primary-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-gray-400 text-sm">Receive email updates about your account</p>
            </div>
            <button
              onClick={() => setPreferences({...preferences, emailNotifications: !preferences.emailNotifications})}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.emailNotifications ? 'bg-neon-blue' : 'bg-primary-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>

        <div className="p-4 bg-primary-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Push Notifications</p>
              <p className="text-gray-400 text-sm">Get notified about new content and updates</p>
            </div>
            <button
              onClick={() => setPreferences({...preferences, pushNotifications: !preferences.pushNotifications})}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.pushNotifications ? 'bg-neon-blue' : 'bg-primary-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>

        <div className="p-4 bg-primary-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Newsletter</p>
              <p className="text-gray-400 text-sm">Receive weekly newsletter with recommendations</p>
            </div>
            <button
              onClick={() => setPreferences({...preferences, newsletter: !preferences.newsletter})}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.newsletter ? 'bg-neon-blue' : 'bg-primary-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.newsletter ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderAppearance = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
          <select
            value={appearance.theme}
            onChange={(e) => setAppearance({...appearance, theme: e.target.value})}
            className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
          >
            <option value="cyberpunk">Cyberpunk</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
          <select
            value={appearance.language}
            onChange={(e) => setAppearance({...appearance, language: e.target.value})}
            className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="japanese">Japanese</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Video Quality</label>
          <select
            value={appearance.videoQuality}
            onChange={(e) => setAppearance({...appearance, videoQuality: e.target.value})}
            className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
          >
            <option value="auto">Auto</option>
            <option value="4k">4K Ultra HD</option>
            <option value="1080p">1080p Full HD</option>
            <option value="720p">720p HD</option>
            <option value="480p">480p</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Content Language</label>
          <select className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-neon-blue">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
            <option>Korean</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-primary-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Autoplay Videos</p>
              <p className="text-gray-400 text-sm">Automatically play next video</p>
            </div>
            <button
              onClick={() => setAppearance({...appearance, autoplay: !appearance.autoplay})}
              className={`w-12 h-6 rounded-full transition-colors ${
                appearance.autoplay ? 'bg-neon-blue' : 'bg-primary-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                appearance.autoplay ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>

        <div className="p-4 bg-primary-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Show Subtitles</p>
              <p className="text-gray-400 text-sm">Display subtitles by default</p>
            </div>
            <button
              onClick={() => setAppearance({...appearance, subtitles: !appearance.subtitles})}
              className={`w-12 h-6 rounded-full transition-colors ${
                appearance.subtitles ? 'bg-neon-blue' : 'bg-primary-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                appearance.subtitles ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <NeonButton variant="accent" icon={Save}>
          Save Preferences
        </NeonButton>
        <NeonButton variant="ghost" onClick={onClose}>
          Cancel
        </NeonButton>
      </div>
    </motion.div>
  );

  const renderPrivacy = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="p-4 bg-primary-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Public Profile</p>
              <p className="text-gray-400 text-sm">Make your profile visible to other users</p>
            </div>
            <button
              onClick={() => setPreferences({...preferences, publicProfile: !preferences.publicProfile})}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.publicProfile ? 'bg-neon-blue' : 'bg-primary-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.publicProfile ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>

        <div className="p-4 bg-primary-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Show Watch History</p>
              <p className="text-gray-400 text-sm">Allow others to see your watch history</p>
            </div>
            <button
              onClick={() => setPreferences({...preferences, showWatchHistory: !preferences.showWatchHistory})}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.showWatchHistory ? 'bg-neon-blue' : 'bg-primary-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                preferences.showWatchHistory ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/50">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <p className="text-white font-medium mb-2">Data & Privacy</p>
            <p className="text-gray-400 text-sm mb-3">
              Learn more about how we collect, use, and share your data.
            </p>
            <NeonButton variant="ghost" size="sm" className="text-yellow-400 border-yellow-600">
              View Privacy Policy
            </NeonButton>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderBilling = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="p-6 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-lg border border-neon-blue/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Current Plan</h3>
            <p className="text-neon-blue font-bold text-xl">PRO Membership</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Monthly</p>
            <p className="text-white font-bold text-xl">$12.99</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Check className="w-4 h-4 text-neon-green" />
          <span>Unlimited streaming</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Check className="w-4 h-4 text-neon-green" />
          <span>4K Ultra HD quality</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Check className="w-4 h-4 text-neon-green" />
          <span>Watch on 4 devices</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Check className="w-4 h-4 text-neon-green" />
          <span>Ad-free experience</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Payment Method</h3>
        <div className="p-4 bg-primary-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Visa ending in 4242</p>
                <p className="text-gray-400 text-sm">Expires 12/25</p>
              </div>
            </div>
            <NeonButton variant="ghost" size="sm">
              Update
            </NeonButton>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <NeonButton variant="accent">
          Upgrade Plan
        </NeonButton>
        <NeonButton variant="ghost">
          Cancel Subscription
        </NeonButton>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'security':
        return renderSecurity();
      case 'notifications':
        return renderNotifications();
      case 'appearance':
        return renderAppearance();
      case 'privacy':
        return renderPrivacy();
      case 'billing':
        return renderBilling();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-primary-800 rounded-2xl border border-primary-600 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Sidebar */}
          <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-primary-600 p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                        : 'text-gray-300 hover:bg-primary-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="hidden lg:flex items-center justify-between p-6 border-b border-primary-600">
              <h3 className="text-lg font-semibold text-white">
                {sections.find(s => s.id === activeSection)?.label}
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
