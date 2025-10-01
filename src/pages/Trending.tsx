import { TrendingUp, Eye, Heart, MessageCircle, BookOpen } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Trending() {
  // Mock trending data - replace with real API call
  const trendingPosts = [
    {
      id: '1',
      title: 'The Future of Web Development in 2024',
      excerpt: 'Explore the latest trends and technologies that will shape web development this year...',
      author: 'Jasleen Kaur',
      views: 15420,
      likes: 892,
      comments: 156,
      category: 'Technology',
      readTime: '7 min read',
      trending: 'hot'
    },
    {
      id: '2',
      title: 'Building Scalable React Applications',
      excerpt: 'Learn best practices for building large-scale React applications that can handle millions of users...',
      author: 'Jasleen Kaur',
      views: 12850,
      likes: 745,
      comments: 98,
      category: 'Programming',
      readTime: '10 min read',
      trending: 'rising'
    },
    {
      id: '3',
      title: 'Design Systems: From Theory to Practice',
      excerpt: 'A comprehensive guide to creating and implementing effective design systems...',
      author: 'Jasleen Kaur',
      views: 9870,
      likes: 623,
      comments: 87,
      category: 'Design',
      readTime: '8 min read',
      trending: 'trending'
    },
    {
      id: '4',
      title: 'AI in Modern Web Applications',
      excerpt: 'How artificial intelligence is revolutionizing web development and user experience...',
      author: 'Jasleen Kaur',
      views: 8760,
      likes: 534,
      comments: 76,
      category: 'Technology',
      readTime: '12 min read',
      trending: 'hot'
    }
  ];

  const getTrendingBadge = (trending: string) => {
    switch (trending) {
      case 'hot':
        return <Badge variant="destructive" className="bg-red-500">🔥 Hot</Badge>;
      case 'rising':
        return <Badge variant="default" className="bg-green-500">📈 Rising</Badge>;
      case 'trending':
        return <Badge variant="secondary" className="bg-blue-500">⭐ Trending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout showSearch={true}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-10 w-10 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Trending Now</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular and trending articles that are capturing everyone's attention
          </p>
        </div>

        {/* Trending Posts */}
        <div className="max-w-5xl mx-auto space-y-6">
          {trendingPosts.map((post, index) => (
            <div key={post.id} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Trending Badge and Category */}
                  <div className="flex items-center space-x-3 mb-3">
                    {getTrendingBadge(post.trending)}
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  {/* Title and Excerpt */}
                  <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Author and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>By {post.author}</span>
                      <span>•</span>
                      <span>#{index + 1} in trending</span>
                    </div>
                    
                    {/* Engagement Stats */}
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="ml-6">
                  <Button size="lg" className="min-w-[120px]">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Explore by Category</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Technology', 'Programming', 'Design', 'Business', 'Life', 'Science', 'Arts', 'Health'].map((category) => (
              <Badge 
                key={category} 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-base"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
