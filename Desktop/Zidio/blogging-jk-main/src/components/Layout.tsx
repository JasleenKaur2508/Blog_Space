import { useState } from "react";
import { Search, PlusCircle, User, Settings, BookOpen, TrendingUp, Bell, LogOut, Edit3, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useSearch } from "@/hooks/use-search";
import { useNotifications, Notification } from "@/hooks/use-notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
}

export function Layout({ children, showSearch = true }: LayoutProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { searchQuery, isSearching, handleSearch, clearSearch, setSearchQuery } = useSearch();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  // Debug authentication state
  console.log('Layout render - isAuthenticated:', isAuthenticated, 'user:', user);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleWriteClick = () => {
    if (isAuthenticated) {
      navigate('/create');
    } else {
      navigate('/login');
    }
  };

  const handleTrendingClick = () => {
    navigate('/trending');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked! Navigating to /profile');
    console.log('Current user:', user);
    console.log('Is authenticated:', isAuthenticated);
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked! Navigating to /settings');
    console.log('Current user:', user);
    console.log('Is authenticated:', isAuthenticated);
    console.log('Navigate function:', navigate);
    navigate('/settings');
    console.log('Navigation called');
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'warning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-blue-500 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl gradient-text">BlogSpace</span>
          </div>

          {/* Search */}
          {showSearch && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="pl-10"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={clearSearch}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex"
              onClick={handleTrendingClick}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              onClick={handleWriteClick}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Write
            </Button>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={markAllAsRead}
                        className="text-xs"
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>
                </div>
                <ScrollArea className="h-80">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No notifications
                    </div>
                  ) : (
                    <div className="p-2">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="relative">
                          <div 
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              notification.isRead 
                                ? 'hover:bg-muted/50' 
                                : 'bg-primary/5 hover:bg-primary/10'
                            }`}
                            onClick={() => {
                              markAsRead(notification.id);
                              if (notification.actionUrl) {
                                navigate(notification.actionUrl);
                              }
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium leading-tight">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 leading-tight">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {formatTimeAgo(notification.timestamp)}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          {!notification.isRead && (
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </PopoverContent>
            </Popover>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu onOpenChange={(open) => console.log('Dropdown open state:', open)}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-50" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        {user?.role === 'admin' && (
                          <Badge variant="secondary" className="w-fit">
                            <Shield className="h-3 w-3 mr-1" />
                            Admin
                          </Badge>
                        )}
                        {user?.provider && user.provider !== 'email' && (
                          <Badge variant="outline" className="text-xs">
                            {user.provider === 'google' && '🔍 Google'}
                            {user.provider === 'github' && '🐙 GitHub'}
                            {user.provider === 'twitter' && '🐦 Twitter'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleSettingsClick}
                    onMouseDown={() => console.log('Settings menu item mouse down')}
                    onMouseUp={() => console.log('Settings menu item mouse up')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem onClick={handleAdminClick}>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate('/login')}>
                  Get Started
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold gradient-text">BlogSpace</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A modern blogging platform for sharing your thoughts and ideas with the world.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Features</li>
                <li>Pricing</li>
                <li>Help Center</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Guidelines</li>
                <li>Terms</li>
                <li>Privacy</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Technology</Badge>
                <Badge variant="secondary">Design</Badge>
                <Badge variant="secondary">Business</Badge>
                <Badge variant="secondary">Life</Badge>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <div>© 2025 BlogSpace. All rights reserved.</div>
            <div className="mt-2">Made by <span className="font-medium text-foreground">Jasleen Kaur</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}