import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, Share2, Calendar, Clock, User } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { mockPosts, mockComments } from "@/data/mockData";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export default function BlogDetail() {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  
  // Resolve post by id from URL, fallback to first
  const resolved = mockPosts.find(p => p.id === id) || mockPosts[0];

  // Map placeholder cover images to local assets for visible images
  const coverMap: Record<string, string> = {
    "/placeholder-blog-1.jpg": blog1,
    "/placeholder-blog-2.jpg": blog2,
    "/placeholder-blog-3.jpg": blog3,
  };

  const post = {
    ...resolved,
    coverImage: coverMap[resolved.coverImage || ""] || blog1,
    content: `
      <p>TypeScript has revolutionized the way we build React applications, bringing type safety and enhanced developer experience to the forefront. In this comprehensive guide, we'll explore how to leverage TypeScript's powerful features to create robust, scalable React applications.</p>
      
      <h2>Why TypeScript with React?</h2>
      <p>The combination of TypeScript and React offers numerous benefits:</p>
      <ul>
        <li><strong>Type Safety:</strong> Catch errors at compile time rather than runtime</li>
        <li><strong>Better IDE Support:</strong> Enhanced autocomplete, refactoring, and navigation</li>
        <li><strong>Improved Maintainability:</strong> Self-documenting code with clear interfaces</li>
        <li><strong>Enhanced Team Collaboration:</strong> Clear contracts between components</li>
      </ul>
      
      <h2>Setting Up Your TypeScript React Project</h2>
      <p>The easiest way to get started is using Create React App with TypeScript template:</p>
      <pre><code>npx create-react-app my-app --template typescript</code></pre>
      
      <p>This sets up a complete development environment with TypeScript configuration, linting, and build tools optimized for production.</p>
      
      <h2>Component Props and Interfaces</h2>
      <p>One of the most immediate benefits of TypeScript in React is type-safe props. Here's how to define component interfaces:</p>
      
      <pre><code>interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size = 'medium', 
  onClick, 
  children, 
  disabled = false 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};</code></pre>
      
      <h2>Hooks with TypeScript</h2>
      <p>TypeScript works seamlessly with React hooks. Here are some examples:</p>
      
      <pre><code>// useState with explicit type
const [user, setUser] = useState<User | null>(null);

// useEffect with proper typing
useEffect(() => {
  const fetchUser = async (): Promise<User> => {
    const response = await fetch('/api/user');
    return response.json();
  };
  
  fetchUser().then(setUser);
}, []);

// Custom hook with TypeScript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}</code></pre>
      
      <h2>Advanced Patterns</h2>
      <p>As your application grows, you'll want to implement more advanced TypeScript patterns:</p>
      
      <h3>Generic Components</h3>
      <p>Create reusable components that work with different data types:</p>
      
      <pre><code>interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>TypeScript and React make a powerful combination for building modern web applications. The type safety, enhanced developer experience, and improved maintainability make it an excellent choice for projects of any size.</p>
      
      <p>As you continue your TypeScript journey, remember that the learning curve is worth the investment. Start small, gradually add types to your existing projects, and embrace the tooling that TypeScript provides.</p>
    `
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      // Handle comment submission
      console.log("Comment submitted:", comment);
      setComment("");
    }
  };

  return (
    <Layout showSearch={false}>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">@{post.author.username}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between border-y py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant={liked ? "default" : "ghost"}
                size="sm"
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                {post.likes + (liked ? 1 : 0)}
              </Button>
              
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {post.comments}
              </Button>
              
              <Button
                variant={bookmarked ? "default" : "ghost"}
                size="sm"
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="aspect-[2/1] rounded-xl overflow-hidden mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div 
          className="blog-content prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Separator className="my-12" />

        {/* Author Bio */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Written by {post.author.name}</h3>
                <p className="text-muted-foreground mb-4">
                  Sarah is a Senior Frontend Developer with over 8 years of experience building scalable web applications. 
                  She's passionate about TypeScript, React, and sharing knowledge with the developer community.
                </p>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Follow
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            Comments ({mockComments.length})
          </h2>
          
          {/* Add Comment */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>YU</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-4"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSubmitComment} disabled={!comment.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Comments List */}
          <div className="space-y-6">
            {mockComments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{comment.author.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          @{comment.author.username}
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(comment.publishedAt)}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                      
                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-muted">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex space-x-3 mb-4">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                <AvatarFallback>{reply.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h5 className="font-medium text-sm">{reply.author.name}</h5>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(reply.publishedAt)}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{reply.content}</p>
                                <Button variant="ghost" size="sm" className="text-xs">
                                  <Heart className="h-3 w-3 mr-1" />
                                  {reply.likes}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
}