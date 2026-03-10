import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const NeonButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  className = '', 
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-600/50 hover:shadow-xl hover:shadow-primary-600/70 focus:ring-primary-600',
    accent: 'bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-lg shadow-neon-pink/50 hover:shadow-xl hover:shadow-neon-pink/70 focus:ring-neon-pink',
    ghost: 'bg-transparent border border-primary-400 text-primary-700 hover:bg-primary-100 hover:border-primary-600 focus:ring-primary-600',
    outline: 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-600'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || loading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`absolute inset-0 rounded-lg blur-xl ${
          variant === 'primary' ? 'bg-primary-600/50' : 
          variant === 'accent' ? 'bg-neon-pink/50' : 
          'bg-primary-400/30'
        }`} />
      </div>

      <div className="relative flex items-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        
        {Icon && iconPosition === 'left' && !loading && (
          <Icon className="w-4 h-4" />
        )}
        
        <span>{children}</span>
        
        {Icon && iconPosition === 'right' && !loading && (
          <Icon className="w-4 h-4" />
        )}
      </div>
    </motion.button>
  );
};

export default NeonButton;
