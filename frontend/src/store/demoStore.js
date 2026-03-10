import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDemoStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      content: [],
      featured: [],
      trending: [],
      continueWatching: [],
      watchlist: [],
      recommendations: [],
      currentContent: null,

      // Auth Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            throw new Error('Login failed');
          }

          const data = await response.json();
          
          set({
            user: { email: credentials.email, username: 'demo_user' },
            token: data.access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // Store token for API calls
          localStorage.setItem('token', data.access_token);
          
          return data;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            throw new Error('Registration failed');
          }

          const user = await response.json();
          
          set({
            user,
            isLoading: false,
            error: null,
          });

          return user;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        
        localStorage.removeItem('token');
      },

      // Content Actions
      fetchContent: async () => {
        try {
          const response = await fetch('http://localhost:8000/api/content');
          const data = await response.json();
          
          set({ content: data });
          return data;
        } catch (error) {
          set({ error: error.message });
        }
      },

      fetchContentById: async (id) => {
        try {
          const response = await fetch(`http://localhost:8000/api/content/${id}`);
          const data = await response.json();
          
          set({ currentContent: data });
          return data;
        } catch (error) {
          set({ error: error.message });
        }
      },

      fetchFeatured: async () => {
        try {
          const response = await fetch('http://localhost:8000/api/content/featured');
          const data = await response.json();
          
          set({ featured: data });
          return data;
        } catch (error) {
          set({ error: error.message });
        }
      },

      fetchTrending: async () => {
        try {
          const response = await fetch('http://localhost:8000/api/content/trending');
          const data = await response.json();
          
          set({ trending: data });
          return data;
        } catch (error) {
          set({ error: error.message });
        }
      },

      fetchContinueWatching: async () => {
        try {
          const response = await fetch('http://localhost:8000/api/recommendations/continue-watching');
          const data = await response.json();
          
          set({ continueWatching: data });
          return data;
        } catch (error) {
          set({ error: error.message });
        }
      },

      fetchRecommendations: async () => {
        try {
          const response = await fetch('http://localhost:8000/api/recommendations/personalized');
          const data = await response.json();
          
          set({ recommendations: data });
          return data;
        } catch (error) {
          set({ error: error.message });
        }
      },

      searchContent: async (query) => {
        try {
          const response = await fetch(`http://localhost:8000/api/content/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          
          set({ content: data });
          return data;
        } catch (error) {
          set({ error: error.message });
        }
      },

      clearError: () => set({ error: null }),

      // Helper functions
      isInWatchlist: (contentId) => {
        const { watchlist } = get();
        return watchlist.some(item => item.content_id === contentId);
      },
    }),
    {
      name: 'demo-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        watchlist: state.watchlist,
      }),
    }
  )
);

export { useDemoStore };
