import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  provider?: 'email' | 'google' | 'github' | 'twitter';
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  company?: string;
  title?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithGitHub: () => Promise<boolean>;
  loginWithTwitter: () => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // In a real app, validate token with backend
          const userData = localStorage.getItem('userData');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with real API response
      const mockUser: User = {
        id: '1',
        name: 'Jasleen Kaur',
        email: email,
        avatar: '/placeholder-avatar.jpg',
        role: 'admin',
        isVerified: true,
        provider: 'email',
        bio: 'Passionate writer and developer sharing insights about technology, design, and life.',
        location: 'San Francisco, CA',
        website: 'https://jasleenkaur.dev',
        phone: '+1 (555) 123-4567',
        company: 'Tech Innovator',
        title: 'Full Stack Developer',
        twitter: '@jasleenkaur',
        github: 'jasleenkaur',
        linkedin: 'jasleenkaur'
      };
      
      // Store auth data
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const openOAuthPopup = (url: string, provider: string): Promise<boolean> => {
    return new Promise((resolve) => {
      console.log(`Opening OAuth popup for ${provider}...`);
      
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const popup = window.open(
        url,
        `${provider}Auth`,
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      if (!popup) {
        // Popup blocked - try fallback method
        console.log('Popup blocked, trying fallback method');
        resolve(openOAuthFallback(provider));
        return;
      }

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          resolve(false);
        }
      }, 1000);

      // Listen for messages from popup
      const messageHandler = (event: MessageEvent) => {
        console.log('Message received:', event.data);
        if (event.origin !== window.location.origin) {
          console.log('Origin mismatch:', event.origin, 'vs', window.location.origin);
          return;
        }
        
        if (event.data.type === 'OAUTH_SUCCESS') {
          console.log(`OAuth success for ${provider}`);
          clearInterval(checkClosed);
          popup.close();
          window.removeEventListener('message', messageHandler);
          
          // Create user based on provider
          const mockUser: User = {
            id: `${provider}-${Date.now()}`,
            name: `Jasleen Kaur (${provider.charAt(0).toUpperCase() + provider.slice(1)})`,
            email: `jasleen.kaur@${provider}.com`,
            avatar: provider === 'google' ? 'https://lh3.googleusercontent.com/a/default-user' :
                   provider === 'github' ? 'https://github.com/github.png' :
                   'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
            role: 'user',
            isVerified: true,
            provider: provider as 'google' | 'github' | 'twitter',
            bio: 'Passionate writer and developer sharing insights about technology, design, and life.',
            location: 'San Francisco, CA',
            website: 'https://jasleenkaur.dev',
            phone: '+1 (555) 123-4567',
            company: 'Tech Innovator',
            title: 'Full Stack Developer',
            twitter: '@jasleenkaur',
            github: 'jasleenkaur',
            linkedin: 'jasleenkaur'
          };
          
          localStorage.setItem('authToken', `${provider}-mock-jwt-token`);
          localStorage.setItem('userData', JSON.stringify(mockUser));
          
          setUser(mockUser);
          resolve(true);
        }
      };

      window.addEventListener('message', messageHandler);
    });
  };

  const openOAuthFallback = (provider: string): boolean => {
    // Fallback method that simulates successful OAuth without popup
    // In production, this would redirect to the OAuth provider
    
    // Create user based on provider
    const mockUser: User = {
      id: `${provider}-${Date.now()}`,
      name: `Jasleen Kaur (${provider.charAt(0).toUpperCase() + provider.slice(1)})`,
      email: `jasleen.kaur@${provider}.com`,
      avatar: provider === 'google' ? 'https://lh3.googleusercontent.com/a/default-user' :
             provider === 'github' ? 'https://github.com/github.png' :
             'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
      role: 'user',
      isVerified: true,
      provider: provider as 'google' | 'github' | 'twitter',
      bio: 'Passionate writer and developer sharing insights about technology, design, and life.',
      location: 'San Francisco, CA',
      website: 'https://jasleenkaur.dev',
      phone: '+1 (555) 123-4567',
      company: 'Tech Innovator',
      title: 'Full Stack Developer',
      twitter: '@jasleenkaur',
      github: 'jasleenkaur',
      linkedin: 'jasleenkaur'
    };
    
    localStorage.setItem('authToken', `${provider}-mock-jwt-token`);
    localStorage.setItem('userData', JSON.stringify(mockUser));
    
    setUser(mockUser);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll use a mock OAuth flow that actually works
      // In production, this would redirect to Google OAuth
      const success = await openOAuthPopup('/mock-oauth.html?provider=google', 'google');
      return success;
    } catch (error) {
      console.error('Google login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGitHub = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll use a mock OAuth flow that actually works
      // In production, this would redirect to GitHub OAuth
      const success = await openOAuthPopup('/mock-oauth.html?provider=github', 'github');
      return success;
    } catch (error) {
      console.error('GitHub login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithTwitter = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll use a mock OAuth flow that actually works
      // In production, this would redirect to Twitter OAuth

      // For demo purposes, we'll use a mock OAuth flow that actually works
      const success = await openOAuthPopup('/mock-oauth.html?provider=twitter', 'twitter');
      return success;
    } catch (error) {
      console.error('Twitter login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithGoogle,
    loginWithGitHub,
    loginWithTwitter,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
