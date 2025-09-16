# 🐼 PandaGarde - Digital Privacy Education Platform

A comprehensive digital privacy education platform designed for families, educators, and children to learn about online safety and digital citizenship through interactive activities and engaging content.

## 🚀 Quick Start (Demo Mode)

The easiest way to get started is in demo mode - no database setup required!

```bash
# Clone the repository
git clone <repository-url>
cd pandagarde

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run with full functionality using localStorage for progress tracking. See [DEMO_MODE.md](./DEMO_MODE.md) for details.

## 📋 Features

### 🎯 Interactive Learning Activities
- **6 Interactive Activities**: Coloring, Drag & Drop, Maze, Word Search, Connect Dots, and Matching games
- **Real-time Progress Tracking**: Track completion, scores, and time spent
- **Download Functionality**: Save completed activities as images
- **Mobile-Optimized**: Touch-friendly controls and responsive design

### 🏆 Achievement System
- **5 Achievement Types**: Privacy Explorer, Privacy Learner, Privacy Champion, Dedicated Learner, Perfect Score Master
- **Certificate Generation**: Create and download personalized certificates
- **Progress Export/Import**: Backup and restore learning progress

### 📚 Educational Resources
- **Downloadable Materials**: Certificates, coloring sheets, family agreements, safety posters
- **Age-Appropriate Content**: Tailored for different learning levels
- **Family-Friendly Design**: Safe, educational, and engaging

### 🔒 Privacy-First Design
- **Local Data Storage**: All progress stored locally by default
- **No External Tracking**: Privacy-focused design principles
- **Secure Authentication**: Optional Supabase integration for multi-user support

## 🛠 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (optional)
- **Storage**: localStorage for offline functionality
- **PDF Generation**: jsPDF for certificates
- **Canvas**: HTML5 Canvas for interactive activities

## 📖 Setup Instructions

### Option 1: Demo Mode (Recommended for Testing)

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd pandagarde
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open http://localhost:5173 in your browser
   - All features work with localStorage
   - No database setup required

### Option 2: Full Setup with Supabase

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Configure Environment**
   ```bash
   # Create environment file
   cp .env.example .env.local
   
   # Add your Supabase credentials
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Setup Database**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Start local Supabase
   supabase start
   
   # Run migrations
   npm run db:setup
   ```

4. **Start Application**
   ```bash
   npm run dev
   ```

## 🎮 Usage Guide

### For Parents and Educators

1. **Getting Started**
   - Visit the homepage to explore available resources
   - Check out the Activity Book for interactive learning
   - Download printable materials from the Downloads section

2. **Tracking Progress**
   - Activities automatically save progress locally
   - Export progress data from the Profile page
   - Import progress when switching devices

3. **Certificates and Achievements**
   - Complete activities to earn achievements
   - Generate personalized certificates
   - Download achievement badges

### For Children

1. **Interactive Activities**
   - Choose from 6 different privacy-themed games
   - Complete activities to earn achievements
   - Download your completed work

2. **Learning Resources**
   - Use coloring sheets to learn privacy concepts
   - Print safety posters for your room
   - Complete family internet agreements

## 📁 Project Structure

```
pandagarde/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── activities/     # Interactive learning activities
│   │   ├── auth/           # Authentication components
│   │   └── ui/             # Basic UI components
│   ├── contexts/           # React contexts for state management
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries and services
│   ├── pages/              # Page components
│   └── assets/             # Static assets
├── public/
│   └── downloads/          # Printable resources
├── supabase/               # Database migrations and config
└── scripts/                # Setup and utility scripts
```

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Database (with Supabase)
npm run db:setup         # Setup database
npm run db:push          # Push schema changes
npm run db:reset         # Reset database
npm run db:start         # Start local Supabase
npm run db:stop          # Stop local Supabase
npm run db:types         # Generate TypeScript types
```

## 📦 Available Resources

### Interactive Activities
- **Privacy Panda Coloring**: Learn about password protection through coloring
- **Information Sorting Game**: Categorize safe vs private information
- **Safe Online Journey Maze**: Navigate through privacy scenarios
- **Privacy Word Search**: Find privacy-related vocabulary
- **Privacy Shield Connect Dots**: Create protective symbols
- **Privacy Symbol Matching**: Match symbols with their meanings

### Downloadable Materials
- **Certificates**: Printable achievement certificates
- **Coloring Sheets**: Educational coloring pages
- **Family Agreement**: Internet safety contract template
- **Safety Posters**: Visual reminders of privacy rules

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Manual Deployment
1. Build the application: `npm run build`
2. Upload `dist` folder to your web server
3. Configure server to serve SPA routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [FEATURES_IMPLEMENTED.md](./FEATURES_IMPLEMENTED.md) for detailed feature information
- **Issues**: Report bugs and request features via GitHub Issues
- **Contact**: Reach out through the contact form on the website

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with learning management systems
- [ ] Mobile app development
- [ ] Advanced parental controls
- [ ] Community features

---

**Made with ❤️ for digital privacy education**
