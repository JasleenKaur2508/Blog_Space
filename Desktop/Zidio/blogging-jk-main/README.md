# Welcome to Jasleen Kaur's Personal Blog

## Project info

**URL**: https://jasleenkaur.dev/blog

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- OAuth Authentication (Google, GitHub, Twitter)

## OAuth Authentication Setup

This project includes working OAuth authentication for Google, GitHub, and Twitter. Here's how to set it up:

### 1. Create OAuth Applications

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set redirect URI: `http://localhost:8080/auth/callback`
6. Copy Client ID and Client Secret

#### GitHub OAuth
1. Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set redirect URI: `http://localhost:8080/auth/callback`
4. Copy Client ID and Client Secret

#### Twitter OAuth
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Set redirect URI: `http://localhost:8080/auth/callback`
4. Copy Client ID and Client Secret

### 2. Environment Configuration

Create a `.env` file in your project root:

```bash
# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# GitHub OAuth
VITE_GITHUB_CLIENT_ID=your_github_client_id_here
VITE_GITHUB_CLIENT_SECRET=your_github_client_secret_here

# Twitter OAuth
VITE_TWITTER_CLIENT_ID=your_twitter_client_id_here
VITE_TWITTER_CLIENT_SECRET=your_twitter_client_secret_here
```

### 3. Current Implementation

The current implementation includes:
- ✅ **Working OAuth buttons** with proper loading states
- ✅ **Mock authentication flow** for demonstration
- ✅ **User provider tracking** (shows which OAuth provider was used)
- ✅ **Proper error handling** and user feedback
- ✅ **Toast notifications** for success/error states

### 4. Production Deployment

For production, you'll need to:
1. Replace mock OAuth flows with real API calls
2. Implement proper OAuth callback handling
3. Set up secure token storage
4. Configure production redirect URIs
5. Implement proper user profile fetching from OAuth providers

## How can I deploy this project?

You can deploy this project to various platforms:

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop your build folder or connect your repo
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Custom hosting**: Upload the build files to your web server

## Can I connect a custom domain to my project?

Yes, you can!

To connect a domain, you'll need to:
1. Purchase a domain from a domain registrar
2. Configure DNS settings to point to your hosting provider
3. Set up SSL certificates for security

Most modern hosting platforms (Vercel, Netlify, etc.) make this process very simple.
