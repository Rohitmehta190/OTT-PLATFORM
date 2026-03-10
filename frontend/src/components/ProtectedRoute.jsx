import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDemoStore } from '../store/demoStore';
import NeonButton from './ui/NeonButton';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useDemoStore();

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-primary-50 flex items-center justify-center p-4"
      >
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4 neon-text-blue">
            Access Restricted
          </h1>
          <p className="text-gray-300 mb-8">
            You need to be logged in to access this page. Please sign in to continue.
          </p>
          <NeonButton
            variant="accent"
            onClick={() => window.location.href = '/auth'}
          >
            Sign In
          </NeonButton>
        </div>
      </motion.div>
    );
  }

  return children;
};

export default ProtectedRoute;
