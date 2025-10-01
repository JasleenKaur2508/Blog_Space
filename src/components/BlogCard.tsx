import { Heart, MessageCircle, Bookmark, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  publishedAt: string;
  readTime: number;
  likes: number;
  comments: number;
  category: string;
  featured?: boolean;
  coverImage?: string;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  onClick?: () => void;
}

export function BlogCard({ post, variant = "default", onClick }: BlogCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (variant === "featured") {
    return (
      <Card 
        className="blog-card group cursor-pointer overflow-hidden border-0 shadow-[var(--card-shadow)]"
        onClick={onClick}
      >
        <div className="relative">
          {post.coverImage && (
            <div className="aspect-[2/1] overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">@{post.author.username}</p>
            </div>
          </div>
          
          <Badge variant="secondary" className="mb-3">{post.category}</Badge>
          
          <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-1" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card 
        className="blog-card group cursor-pointer border-0 shadow-[var(--card-shadow)]"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex space-x-4">
            {post.coverImage && (
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <Badge variant="secondary" className="mb-2 text-xs">{post.category}</Badge>
              
              <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                <span>{post.author.name}</span>
                <span>•</span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Heart className="h-3 w-3" />
                  <span>{post.likes}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageCircle className="h-3 w-3" />
                  <span>{post.comments}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}m</span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="blog-card group cursor-pointer border-0 shadow-[var(--card-shadow)]"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">@{post.author.username}</p>
          </div>
        </div>
        
        <Badge variant="secondary" className="mb-3">{post.category}</Badge>
        
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        {post.coverImage && (
          <div className="aspect-[2/1] rounded-lg overflow-hidden mb-4">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-1" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}