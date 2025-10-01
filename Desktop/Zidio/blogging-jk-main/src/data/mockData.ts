export const mockPosts = [
  {
    id: "1",
    title: "Building Modern React Applications with TypeScript",
    excerpt: "Learn how to leverage TypeScript's powerful type system to build robust React applications that scale. We'll cover best practices, common patterns, and advanced techniques for professional development.",
    content: "Full content here...",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder-avatar.jpg",
      username: "sarahdev"
    },
    publishedAt: "2024-01-15T10:00:00Z",
    readTime: 8,
    likes: 124,
    comments: 23,
    category: "Technology",
    featured: true,
    coverImage: "/placeholder-blog-1.jpg"
  },
  {
    id: "2",
    title: "The Future of Web Design: Trends to Watch in 2024",
    excerpt: "Explore the cutting-edge design trends that are shaping the web in 2024. From AI-powered interfaces to sustainable design practices, discover what's next in web design.",
    content: "Full content here...",
    author: {
      name: "Alex Rivera",
      avatar: "/placeholder-avatar-2.jpg",
      username: "alexdesign"
    },
    publishedAt: "2024-01-14T14:30:00Z",
    readTime: 6,
    likes: 89,
    comments: 15,
    category: "Design",
    coverImage: "/placeholder-blog-2.jpg"
  },
  {
    id: "3",
    title: "Mastering Database Optimization for High-Performance Apps",
    excerpt: "Database performance can make or break your application. Learn proven strategies for optimizing queries, indexing, and database architecture for maximum performance.",
    content: "Full content here...",
    author: {
      name: "Michael Zhang",
      avatar: "/placeholder-avatar-3.jpg",
      username: "mikedb"
    },
    publishedAt: "2024-01-13T09:15:00Z",
    readTime: 12,
    likes: 76,
    comments: 31,
    category: "Technology",
    coverImage: "/placeholder-blog-3.jpg"
  },
  {
    id: "4",
    title: "Building a Sustainable Business: Lessons from Green Startups",
    excerpt: "How environmentally conscious startups are revolutionizing business practices and creating profitable, sustainable companies that benefit both the planet and their bottom line.",
    content: "Full content here...",
    author: {
      name: "Emma Thompson",
      avatar: "/placeholder-avatar-4.jpg",
      username: "emmabiz"
    },
    publishedAt: "2024-01-12T16:45:00Z",
    readTime: 10,
    likes: 54,
    comments: 18,
    category: "Business",
    coverImage: "/placeholder-blog-4.jpg"
  },
  {
    id: "5",
    title: "Mindful Productivity: Finding Balance in a Busy World",
    excerpt: "Discover how mindfulness practices can transform your productivity and help you achieve more while maintaining mental well-being and work-life balance.",
    content: "Full content here...",
    author: {
      name: "David Kim",
      avatar: "/placeholder-avatar-5.jpg",
      username: "davidlife"
    },
    publishedAt: "2024-01-11T11:20:00Z",
    readTime: 7,
    likes: 112,
    comments: 27,
    category: "Lifestyle",
    coverImage: "/placeholder-blog-5.jpg"
  },
  {
    id: "6",
    title: "Advanced CSS Grid Techniques for Complex Layouts",
    excerpt: "Take your CSS Grid skills to the next level with advanced techniques for creating complex, responsive layouts that work across all devices and browsers.",
    content: "Full content here...",
    author: {
      name: "Lisa Park",
      avatar: "/placeholder-avatar-6.jpg",
      username: "lisacss"
    },
    publishedAt: "2024-01-10T13:00:00Z",
    readTime: 9,
    likes: 67,
    comments: 12,
    category: "Technology",
    coverImage: "/placeholder-blog-6.jpg"
  },
  {
    id: "7",
    title: "The Art of User Experience: Creating Intuitive Digital Products",
    excerpt: "Learn the principles of exceptional UX design and how to create digital products that users love. From research to prototyping to testing, master the UX process.",
    content: "Full content here...",
    author: {
      name: "James Wilson",
      avatar: "/placeholder-avatar-7.jpg",
      username: "jamesux"
    },
    publishedAt: "2024-01-09T08:30:00Z",
    readTime: 11,
    likes: 93,
    comments: 19,
    category: "Design",
    coverImage: "/placeholder-blog-7.jpg"
  },
  {
    id: "8",
    title: "Remote Work Revolution: Building Effective Distributed Teams",
    excerpt: "The future of work is remote. Learn how to build, manage, and scale distributed teams that are productive, engaged, and successful in the new work landscape.",
    content: "Full content here...",
    author: {
      name: "Maria Garcia",
      avatar: "/placeholder-avatar-8.jpg",
      username: "mariawork"
    },
    publishedAt: "2024-01-08T15:15:00Z",
    readTime: 8,
    likes: 85,
    comments: 25,
    category: "Business",
    coverImage: "/placeholder-blog-8.jpg"
  }
];

export const mockCategories = [
  { id: "tech", name: "Technology", count: 45 },
  { id: "design", name: "Design", count: 32 },
  { id: "business", name: "Business", count: 28 },
  { id: "lifestyle", name: "Lifestyle", count: 19 },
  { id: "health", name: "Health", count: 15 },
  { id: "travel", name: "Travel", count: 12 }
];

export const mockComments = [
  {
    id: "1",
    postId: "1",
    author: {
      name: "John Smith",
      avatar: "/placeholder-comment-1.jpg",
      username: "johndev"
    },
    content: "Great article! I've been struggling with TypeScript in React and this really helped clarify some concepts.",
    publishedAt: "2024-01-15T12:30:00Z",
    likes: 5,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Sarah Chen",
          avatar: "/placeholder-avatar.jpg",
          username: "sarahdev"
        },
        content: "Thanks John! I'm glad it was helpful. Feel free to ask if you have any specific questions.",
        publishedAt: "2024-01-15T13:15:00Z",
        likes: 2
      }
    ]
  },
  {
    id: "2",
    postId: "1",
    author: {
      name: "Emily Davis",
      avatar: "/placeholder-comment-2.jpg",
      username: "emilycode"
    },
    content: "The section on generics was particularly useful. Do you have any recommendations for advanced TypeScript resources?",
    publishedAt: "2024-01-15T14:45:00Z",
    likes: 3,
    replies: []
  }
];