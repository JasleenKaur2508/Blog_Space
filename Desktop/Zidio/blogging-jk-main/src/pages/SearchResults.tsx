import { useSearchParams } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Mock search results - replace with real API call
  const mockResults = [
    {
      id: '1',
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and build your first component...',
      author: 'Jasleen Kaur',
      date: '2024-01-15',
      category: 'Technology',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Advanced TypeScript Tips',
      excerpt: 'Discover advanced TypeScript features that will make your code more robust...',
      author: 'Jasleen Kaur',
      date: '2024-01-10',
      category: 'Programming',
      readTime: '8 min read'
    },
    {
      id: '3',
      title: 'Modern CSS Techniques',
      excerpt: 'Explore modern CSS features like Grid, Flexbox, and CSS Variables...',
      author: 'Jasleen Kaur',
      date: '2024-01-05',
      category: 'Design',
      readTime: '6 min read'
    }
  ];

  return (
    <Layout showSearch={true}>
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">Search Results</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Showing results for: <span className="font-semibold text-foreground">"{query}"</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Found {mockResults.length} results
          </p>
        </div>

        {/* Search Results */}
        <div className="max-w-4xl mx-auto space-y-6">
          {mockResults.map((result) => (
            <div key={result.id} className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary">{result.category}</Badge>
                    <span className="text-sm text-muted-foreground">{result.readTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors cursor-pointer">
                    {result.title}
                  </h2>
                  <p className="text-muted-foreground mb-3">{result.excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>By {result.author}</span>
                    <span>•</span>
                    <span>{new Date(result.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {mockResults.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or browse our categories
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Technology
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Design
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Business
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Life
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
