import { useState, useEffect } from "react";
import { TrendingUp, Filter, Grid, List, ArrowUp, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPosts, mockCategories } from "@/data/mockData";
import { useAuth } from "@/hooks/use-auth";
import heroBg from "@/assets/hero-bg.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle navigation to blog detail
  const openPost = (id: string) => navigate(`/blog/${id}`);

  // Handle Start Writing button click
  const handleStartWriting = async () => {
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        navigate('/create');
      } finally {
        setIsLoading(false);
      }
    } else {
      navigate('/login');
    }
  };

  // Handle Explore Stories button click
  const handleExploreStories = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
      navigate('/trending');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Filter button click
  const handleFilterClick = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  // Handle newsletter subscription
  const handleNewsletterSubscribe = async () => {
    if (newsletterEmail.trim()) {
      if (newsletterEmail.includes('@')) {
        try {
          setIsSubscribing(true);
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          console.log('Subscribing email:', newsletterEmail);
          setNewsletterEmail("");
          alert('Thank you for subscribing to our newsletter!');
        } catch (error) {
          alert('Failed to subscribe. Please try again.');
        } finally {
          setIsSubscribing(false);
        }
      } else {
        alert('Please enter a valid email address.');
      }
    } else {
      alert('Please enter your email address.');
    }
  };

  // Handle newsletter form submission on Enter key
  const handleNewsletterKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNewsletterSubscribe();
    }
  };

  // Handle back to top
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    // Add keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for quick search focus
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search for stories"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
      
      // Escape to close advanced filters
      if (e.key === 'Escape' && showAdvancedFilters) {
        setShowAdvancedFilters(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAdvancedFilters]);

  // Update mock posts with actual images
  const postsWithImages = mockPosts.map((post, index) => ({
    ...post,
    coverImage: index === 0 ? blog1 : index === 1 ? blog2 : index === 2 ? blog3 : undefined
  }));

  const featuredPost = postsWithImages[0];
  const regularPosts = postsWithImages.slice(1);

  const filteredPosts = selectedCategory === "all" 
    ? regularPosts 
    : regularPosts.filter(post => post.category.toLowerCase() === selectedCategory);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Scroll to the stories section
    const storiesSection = document.querySelector('[data-section="stories"]');
    if (storiesSection) {
      storiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Show visual feedback
    const categoryCard = document.querySelector(`[data-category="${categoryId}"]`);
    if (categoryCard) {
      categoryCard.classList.add('ring-2', 'ring-primary', 'ring-opacity-50');
      setTimeout(() => {
        categoryCard.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50');
      }, 2000);
    }
    
    // Navigate to category page (you can create this route later)
    // navigate(`/category/${categoryId}`);
  };

  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'technology':
        return '💻';
      case 'travel':
        return '✈️';
      case 'food':
        return '🍔';
      case 'lifestyle':
        return '🎉';
      case 'business':
        return '💼';
      case 'health':
        return '⚕️';
      case 'sports':
        return '⚽️';
      case 'education':
        return '📚';
      case 'art':
        return '🎨';
      case 'science':
        return '🔬';
      case 'music':
        return '🎵';
      case 'fashion':
        return '👗';
      case 'books':
        return '📚';
      case 'movies':
        return '🎬';
      case 'gaming':
        return '🎮';
      case 'fitness':
        return '🏋️';
      case 'photography':
        return '📸';
      case 'writing':
        return '✍️';
      case 'cooking':
        return '🍳';
      case 'diy':
        return '🛠️';
      case 'gardening':
        return '🌱';
      case 'hobbies':
        return '🎯';
      case 'pets':
        return '🐶';
      default:
        return '📚'; // Default icon
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Share Your <span className="gradient-text">Stories</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of writers and readers. Discover amazing stories, share your thoughts, and connect with like-minded people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                onClick={handleStartWriting}
                disabled={isLoading}
              >
                {isLoading ? 'Starting...' : (isAuthenticated ? 'Start Writing' : 'Get Started')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-200 border-2 hover:bg-primary hover:text-primary-foreground"
                onClick={handleExploreStories}
                disabled={isLoading}
              >
                {isLoading ? 'Exploring...' : 'Explore Stories'}
              </Button>
            </div>
            
            {/* Quick Search */}
            <div className="max-w-md mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for stories, topics, or authors..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      navigate(`/search?q=${encodeURIComponent(e.currentTarget.value.trim())}`);
                    }
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd className="px-2 py-1 text-xs bg-muted rounded border">⌘K</kbd>
                </div>
              </div>
            </div>
            
            {!isAuthenticated && (
              <p className="text-sm text-muted-foreground mt-4">
                Already have an account?{' '}
                <button 
                  onClick={() => navigate('/login')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" 
               onClick={() => navigate('/trending')}
               onKeyDown={(e) => e.key === 'Enter' && navigate('/trending')}
               tabIndex={0}
               role="button"
               aria-label="View trending stories">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trending Stories</h3>
            <p className="text-muted-foreground">Discover what's popular right now</p>
          </div>
          
          <div className="text-center p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" 
               onClick={handleStartWriting}
               onKeyDown={(e) => e.key === 'Enter' && handleStartWriting()}
               tabIndex={0}
               role="button"
               aria-label="Start writing a new story">
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground text-xl font-bold">✍️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Start Writing</h3>
            <p className="text-muted-foreground">Share your thoughts with the world</p>
          </div>
          
          <div className="text-center p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" 
               onClick={() => navigate('/search')}
               onKeyDown={(e) => e.key === 'Enter' && navigate('/search')}
               tabIndex={0}
               role="button"
               aria-label="Search for stories">
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground text-xl font-bold">🔍</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Search Stories</h3>
            <p className="text-muted-foreground">Find exactly what you're looking for</p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Popular Categories</h2>
          <p className="text-muted-foreground">
            Explore {mockCategories.length} categories with {mockCategories.reduce((total, cat) => total + cat.count, 0)}+ stories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockCategories.slice(0, 4).map((category) => (
            <div
              key={category.id}
              className="text-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer hover:scale-105 border border-transparent hover:border-primary/20 group"
              onClick={() => handleCategoryClick(category.id)}
              onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category.id)}
              tabIndex={0}
              role="button"
              aria-label={`View ${category.name} stories`}
              data-category={category.id}
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl">{getCategoryIcon(category.name)}</span>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} stories</p>
              <div className="mt-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Click to explore →
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Categories Button */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="sm" 
            className="hover:scale-105 transition-transform duration-200"
            onClick={() => {
              const storiesSection = document.querySelector('[data-section="stories"]');
              if (storiesSection) {
                storiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            View All Categories
            <span className="ml-2">↓</span>
          </Button>
        </div>
      </section>

      {/* Featured Post */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center mb-8">
          <TrendingUp className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-3xl font-bold">Featured Story</h2>
        </div>
        
        <div className="animate-slide-up">
          <BlogCard post={featuredPost} variant="featured" onClick={() => openPost(featuredPost.id)} />
        </div>
      </section>

      {/* Categories & Filter */}
      <section className="container mx-auto px-4 pb-8" data-section="stories">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold">Latest Stories</h2>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleFilterClick}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge
            variant={selectedCategory === "all" ? "default" : "secondary"}
            className="cursor-pointer hover:scale-105 transition-transform duration-200 px-4 py-2 hover:bg-primary hover:text-primary-foreground"
            onClick={() => setSelectedCategory("all")}
          >
            All Stories
          </Badge>
          {mockCategories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className="cursor-pointer hover:scale-105 transition-transform duration-200 px-4 py-2 hover:bg-primary hover:text-primary-foreground group"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-1">{getCategoryIcon(category.name)}</span>
              {category.name} ({category.count})
              {selectedCategory === category.id && (
                <span className="ml-2 text-xs">✓</span>
              )}
            </Badge>
          ))}
        </div>

        {/* Quick Category Actions */}
        {selectedCategory !== "all" && (
          <div className="bg-muted/30 p-4 rounded-lg mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getCategoryIcon(mockCategories.find(c => c.id === selectedCategory)?.name || '')}</span>
                <div>
                  <h3 className="font-semibold">
                    {mockCategories.find(c => c.id === selectedCategory)?.name} Stories
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {filteredPosts.length} stories found
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/trending?category=${selectedCategory}`)}
                >
                  View Trending
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/search?category=${selectedCategory}`)}
                >
                  Search in Category
                </Button>
              </div>
            </div>
            
            {/* Category Insights */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {filteredPosts.length}
                  </div>
                  <div className="text-muted-foreground">Total Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.floor(Math.random() * 50) + 10}%
                  </div>
                  <div className="text-muted-foreground">Growth Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.floor(Math.random() * 1000) + 100}
                  </div>
                  <div className="text-muted-foreground">Monthly Readers</div>
                </div>
              </div>
              
              {/* Related Categories */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium mb-3 text-center">Related Categories</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {mockCategories
                    .filter(cat => cat.id !== selectedCategory)
                    .slice(0, 4)
                    .map(category => (
                      <Badge
                        key={category.id}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span className="mr-1">{getCategoryIcon(category.name)}</span>
                        {category.name}
                      </Badge>
                    ))}
                </div>
              </div>
              
              {/* Category Trends */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium mb-3 text-center">Trending Topics</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['AI & Machine Learning', 'Web Development', 'Mobile Apps', 'Cloud Computing', 'Cybersecurity', 'Data Science']
                    .slice(0, 4)
                    .map((topic, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                      >
                        #{topic.replace(/\s+/g, '').toLowerCase()}
                      </Badge>
                    ))}
                </div>
              </div>
              
              {/* Category Actions */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium mb-3 text-center">Quick Actions</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => navigate(`/create?category=${selectedCategory}`)}
                  >
                    ✍️ Write Story
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => navigate(`/trending?category=${selectedCategory}`)}
                  >
                    🔥 View Trending
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => navigate(`/search?category=${selectedCategory}`)}
                  >
                    🔍 Search Stories
                  </Button>
                </div>
              </div>
              
              {/* Category Statistics */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium mb-3 text-center">Category Statistics</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="text-center p-2 bg-background/50 rounded">
                    <div className="font-semibold text-primary">Active Writers</div>
                    <div className="text-muted-foreground">{Math.floor(Math.random() * 50) + 20}</div>
                  </div>
                  <div className="text-center p-2 bg-background/50 rounded">
                    <div className="font-semibold text-green-600">Avg. Rating</div>
                    <div className="text-muted-foreground">{(Math.random() * 2 + 3).toFixed(1)} ⭐</div>
                  </div>
                  <div className="text-center p-2 bg-background/50 rounded">
                    <div className="font-semibold text-blue-600">Comments</div>
                    <div className="text-muted-foreground">{Math.floor(Math.random() * 200) + 50}</div>
                  </div>
                  <div className="text-center p-2 bg-background/50 rounded">
                    <div className="font-semibold text-purple-600">Shares</div>
                    <div className="text-muted-foreground">{Math.floor(Math.random() * 100) + 25}</div>
                  </div>
                </div>
              </div>
              
              {/* Category Newsletter */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium mb-3 text-center">Stay Updated</h4>
                <p className="text-xs text-muted-foreground text-center mb-3">
                  Get notified about new stories in this category
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 text-xs border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button size="sm" className="text-xs h-8 px-3">
                    Subscribe
                  </Button>
                </div>
              </div>
              
              {/* Category Insights */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium mb-3 text-center">Category Insights</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-2 bg-background/50 rounded">
                    <span className="text-muted-foreground">Most Popular Topic</span>
                    <span className="font-medium">Web Development</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background/50 rounded">
                    <span className="text-muted-foreground">Top Writer</span>
                    <span className="font-medium">Sarah Chen</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background/50 rounded">
                    <span className="text-muted-foreground">Avg. Read Time</span>
                    <span className="font-medium">8 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="bg-muted/30 p-6 rounded-lg mb-8 animate-fade-in">
            <h3 className="font-semibold mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Date Range</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Reading Time</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                  <option value="all">Any Length</option>
                  <option value="short">Quick Read (1-5 min)</option>
                  <option value="medium">Medium (5-15 min)</option>
                  <option value="long">Long Read (15+ min)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Posts Grid/List */}
      <section className="container mx-auto px-4 pb-16">
        <Tabs value={viewMode} className="w-full">
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BlogCard post={post} onClick={() => openPost(post.id)} />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="space-y-6 animate-fade-in">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BlogCard post={post} variant="compact" onClick={() => openPost(post.id)} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* View All Stories Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-3 hover:scale-105 transition-transform duration-200"
            onClick={handleExploreStories}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'View All Stories'}
            <TrendingUp className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Community Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">1,234+</h3>
              <p className="text-muted-foreground">Active Writers</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📖</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">5,678+</h3>
              <p className="text-muted-foreground">Stories Published</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">❤️</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">12,345+</h3>
              <p className="text-muted-foreground">Likes Given</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of writers who are already sharing their thoughts, experiences, and creativity with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
              onClick={handleStartWriting}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : (isAuthenticated ? 'Create Your First Story' : 'Join Our Community')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
              onClick={handleExploreStories}
              disabled={isLoading}
            >
              {isLoading ? 'Browsing...' : 'Browse Stories'}
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Get the latest stories and insights delivered directly to your inbox. Join thousands of readers who never miss an update.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                onKeyPress={handleNewsletterKeyPress}
              />
              <Button className="px-8" onClick={handleNewsletterSubscribe} disabled={isSubscribing}>
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-20 right-4 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 transition-colors"
          onClick={handleBackToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6 text-primary-foreground" />
        </Button>
      )}
    </Layout>
  );
};

export default Index;
