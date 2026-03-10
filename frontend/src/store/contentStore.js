import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useContentStore = create(
  persist(
    (set, get) => ({
      // State
      content: [],
      featured: [],
      trending: [],
      continueWatching: [],
      watchlist: [],
      recommendations: [],
      currentContent: null,
      loading: false,
      error: null,

      // Actions
      fetchContent: async (params = {}) => {
        set({ loading: true, error: null });
        
        try {
          const queryString = new URLSearchParams(params).toString();
          const response = await fetch(`/api/content?${queryString}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch content');
          }

          const data = await response.json();
          
          set({
            content: data,
            loading: false,
            error: null,
          });

          return data;
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });
          throw error;
        }
      },

      fetchContentById: async (id) => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch(`/api/content/${id}`);
          
          if (!response.ok) {
            throw new Error('Content not found');
          }

          const data = await response.json();
          
          set({
            currentContent: data,
            loading: false,
            error: null,
          });

          return data;
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });
          throw error;
        }
      },

      fetchFeatured: async (limit = 10) => {
        try {
          const response = await fetch(`/api/content/featured?limit=${limit}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch featured content');
          }

          const data = await response.json();
          
          set({ featured: data });
          return data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      fetchTrending: async (limit = 10) => {
        try {
          const response = await fetch(`/api/content/trending?limit=${limit}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch trending content');
          }

          const data = await response.json();
          
          set({ trending: data });
          return data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      fetchContinueWatching: async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const response = await fetch('/api/recommendations/continue-watching', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch continue watching');
          }

          const data = await response.json();
          
          set({ continueWatching: data });
          return data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      fetchWatchlist: async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const response = await fetch('/api/users/watchlist', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch watchlist');
          }

          const data = await response.json();
          
          set({ watchlist: data });
          return data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      addToWatchlist: async (contentId) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('Not authenticated');

          const response = await fetch('/api/users/watchlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ content_id: contentId }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to add to watchlist');
          }

          const data = await response.json();
          
          set(state => ({
            watchlist: [...state.watchlist, data]
          }));

          return data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      removeFromWatchlist: async (contentId) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('Not authenticated');

          const response = await fetch(`/api/users/watchlist/${contentId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to remove from watchlist');
          }

          set(state => ({
            watchlist: state.watchlist.filter(item => item.content_id !== contentId)
          }));

          return { success: true };
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      fetchRecommendations: async (type = 'personalized', limit = 20) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const response = await fetch(`/api/recommendations/${type}?limit=${limit}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
          }

          const data = await response.json();
          
          set({ recommendations: data });
          return data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      searchContent: async (query, filters = {}) => {
        set({ loading: true, error: null });
        
        try {
          const searchParams = new URLSearchParams({
            q: query,
            ...filters
          }).toString();

          const response = await fetch(`/api/content/search?${searchParams}`);
          
          if (!response.ok) {
            throw new Error('Search failed');
          }

          const data = await response.json();
          
          set({
            content: data.results,
            loading: false,
            error: null,
          });

          return data;
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });
          throw error;
        }
      },

      rateContent: async (contentId, rating, review) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('Not authenticated');

          const response = await fetch('/api/users/rate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ content_id: contentId, rating, review }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to rate content');
          }

          const data = await response.json();
          
          // Update current content rating if it's the same
          if (get().currentContent?.id === contentId) {
            set(state => ({
              currentContent: {
                ...state.currentContent,
                user_rating: data.rating
              }
            }));
          }

          return data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      updateViewingHistory: async (contentId, episodeId, watchedDuration, totalDuration, completed) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const response = await fetch('/api/users/history', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              content_id: contentId,
              episode_id: episodeId,
              watched_duration: watchedDuration,
              total_duration: totalDuration,
              completed
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to update viewing history');
          }

          return await response.json();
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      clearError: () => set({ error: null }),

      // Helper functions
      isInWatchlist: (contentId) => {
        const { watchlist } = get();
        return watchlist.some(item => item.content_id === contentId);
      },

      getContentById: (id) => {
        const { content } = get();
        return content.find(item => item.id === id);
      },
    }),
    {
      name: 'content-storage',
      partialize: (state) => ({
        watchlist: state.watchlist,
        continueWatching: state.continueWatching,
      }),
    }
  )
);

export { useContentStore };
