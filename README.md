# 🐼 PandaGarde - Digital Privacy Education Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/pandagarde/platform) [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE) [![Version](https://img.shields.io/badge/version-1.0.0-green)](package.json)

**PandaGarde** is a comprehensive digital privacy education platform designed to teach children about online safety and digital citizenship through interactive activities, games, and educational resources. Built with modern web technologies, it provides a safe, engaging, and educational environment for families and educators.

## 📁 Project Structure

```
PandaGardeWebsite-v1/
├── src/                    # Main PandaGarde website source code
├── family-hub/             # Family Hub standalone mobile app
│   ├── src/                # Family Hub source code
│   ├── public/             # Family Hub static assets
│   └── package.json        # Family Hub dependencies
├── public/                 # Main website static assets
├── docs/                   # Documentation
├── database/               # Database schema and SQL files
├── scripts/                # Utility scripts
├── tests/                  # Test files
└── [config files]         # Configuration files (root)
```

**Quick Links:**
- 📚 [Documentation](docs/README.md)
- 🚀 [Deployment Guide](DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- ⚡ [Quick Deployment](QUICK_DEPLOYMENT.md) - Quick reference commands
- 🗄️ [Database Setup](database/README.md)
- 🔧 [Scripts](scripts/README.md)
- 📱 [Family Hub README](family-hub/README.md)
- 🏗️ [Project Structure](PROJECT_STRUCTURE.md) - Website and apps separation

---

## 🎯 Platform Overview

PandaGarde consists of **two distinct products** that work together to provide a complete digital privacy education ecosystem:

### 1. **PandaGarde Website** (Main Platform)
A comprehensive web-based educational platform with full-featured content, activities, and resources.

### 2. **PandaGarde Family Hub** (Mobile App)
A streamlined mobile-first app focused on family management and quick access to activities.

---

## 🌐 PandaGarde Website - Main Educational Platform

### Overview
The **PandaGarde Website** is the primary educational platform - a full-featured web application that provides comprehensive digital privacy education through interactive content, extensive resources, and detailed learning paths.

### Target Audience
- **Children** (ages 5-17) - Primary learners
- **Parents** - Guides and supervisors
- **Educators** - Classroom integration
- **Families** - Complete family learning experience

### Key Features

#### 🎮 Interactive Learning Activities
- **6 Canvas-Based Activities**: Fully interactive educational games
  - Privacy Panda Coloring: Creative expression with password protection concepts
  - Information Sorting Game: Distinguish between safe and private information
  - Safe Online Journey Maze: Navigate online safety scenarios with keyboard controls
  - Privacy Word Search: Build vocabulary related to digital privacy
  - Privacy Shield Connect Dots: Learn protection symbols and security concepts
  - Privacy Symbol Matching: Understand digital interface symbols
- **Real-time Progress Tracking**: Activities track completion and provide immediate feedback
- **Download & Export**: Save completed activities as images for sharing

#### 📊 Comprehensive Progress Management
- **Achievement System**: Unlock certificates and badges for completed activities
  - Privacy Explorer: Complete first activity
  - Privacy Learner: Complete 3 activities
  - Privacy Champion: Complete all activities
  - Dedicated Learner: Spend 60+ minutes learning
  - Perfect Score Master: Achieve perfect scores
- **Local Storage Integration**: Persistent data across sessions
- **Progress Export/Import**: Data portability for transferring between devices
- **Time Tracking**: Monitor learning time and engagement patterns

#### 📚 Extensive Educational Content Library
- **Interactive Story**: Privacy Panda's journey through digital safety
- **Age-Specific Handbooks**: Comprehensive guides for different age groups (5-8, 9-12, 13-17)
- **Digital Citizenship Curriculum**: Structured learning paths
- **Privacy Tools & Resources**: Practical tools for digital safety
- **Emergency Safety Guides**: Critical safety information and procedures

#### 🎨 Downloadable Resources
- **Privacy Champion Certificates**: Customizable achievement certificates
- **Coloring Sheets**: 5 unique privacy-themed coloring pages
- **Family Internet Agreement**: Comprehensive safety contract template
- **Digital Safety Posters**: 5 visual reminder posters for home/classroom
- **Worksheets & Activities**: Printable hands-on learning materials

#### 🔍 Advanced Search & Discovery
- **Intelligent Search**: Fuzzy search with Levenshtein distance algorithm
- **Content Filtering**: Filter by content type, category, and tags
- **Search Suggestions**: Autocomplete and popular searches
- **Recent Searches**: Quick access to previously searched content

#### 👨‍👩‍👧‍👦 Family & Educator Tools
- **Age-Group Specific Content**: Tailored content for different age ranges
- **Parent Dashboard**: Monitor children's progress and achievements
- **Educator Resources**: Classroom integration tools and curriculum alignment
- **Downloadable Resources**: Printable materials for offline learning

#### 🖥️ Desktop & Web Experience
- **Full Website Navigation**: Traditional header/footer navigation
- **Hero Sections**: Engaging landing pages and content sections
- **Rich Content Pages**: Detailed educational content and resources
- **Multi-page Experience**: Comprehensive site structure

### Use Cases
- **Deep Learning**: Comprehensive educational content and structured learning paths
- **Classroom Integration**: Educator resources and curriculum alignment
- **Resource Access**: Downloadable materials, handbooks, and guides
- **Content Discovery**: Advanced search and content filtering
- **Full-Featured Experience**: Complete platform with all educational resources

---

## 📱 PandaGarde Family Hub - Mobile App

### Overview
The **PandaGarde Family Hub** is a standalone mobile-first Progressive Web App (PWA) designed for quick family management and on-the-go access to privacy learning activities. It provides a streamlined, app-style interface optimized for mobile devices.

### Target Audience
- **Parents** - Quick family management and progress monitoring
- **Families** - Mobile access to activities and progress tracking
- **Mobile Users** - On-the-go learning and management

### Key Features

#### 📱 Mobile-First App Design
- **App-Style Interface**: Native app-like experience with bottom navigation
- **Fixed Navigation**: Top bar with branding and bottom tab navigation
- **No Login Required**: Opens directly to dashboard for instant access
- **PWA Support**: Installable as a mobile app on iOS and Android
- **Touch-Optimized**: Large touch targets and mobile-friendly interactions

#### 👨‍👩‍👧‍👦 Family Management
- **Add Family Members**: Quick addition of children to family profiles
- **Multi-Child Support**: Manage multiple children's progress in one place
- **Family Dashboard**: Overview of all family members' activities
- **Quick Access**: Instant access to family management features

#### 🎮 Streamlined Activities
- **Activity Access**: Direct access to interactive privacy learning games
- **Same Core Activities**: Access to the 6 main canvas-based activities
- **Quick Launch**: Fast access to activities without full website navigation
- **Mobile-Optimized Controls**: Touch-friendly activity controls

#### 📊 Progress Tracking
- **Individual Progress**: Track each child's progress separately
- **Achievement Viewing**: View earned certificates and badges
- **Progress Overview**: Quick dashboard view of family learning progress
- **Certificate Generation**: Generate and download achievement certificates

#### ⚙️ Settings & Preferences
- **Theme Toggle**: Light/dark mode support
- **App Preferences**: Customize app experience
- **Data Management**: Export/import progress data

### Use Cases
- **Quick Access**: Fast mobile access to activities and progress
- **Family Management**: Manage multiple children's profiles on mobile
- **On-the-Go Learning**: Mobile learning during travel or waiting times
- **Progress Monitoring**: Quick check of family learning progress
- **App Store Distribution**: Native app experience via PWA installation

---

## 🔄 Key Differences: Website vs. Family Hub

| Feature | PandaGarde Website | Family Hub App |
|---------|-------------------|----------------|
| **Platform** | Full web platform | Mobile PWA app |
| **Interface** | Traditional website with header/footer | App-style with bottom navigation |
| **Navigation** | Multi-page site navigation | Tab-based app navigation |
| **Content** | Full educational library, handbooks, resources | Streamlined activities and progress |
| **Target Device** | Desktop and mobile web browsers | Mobile-first (iOS/Android PWA) |
| **Login Required** | Optional (for cloud features) | No login - direct access |
| **Use Case** | Comprehensive learning and resources | Quick family management and activities |
| **Deployment** | Main website domain | Standalone subdomain/app |
| **Content Discovery** | Advanced search and filtering | Quick access to activities |
| **Resources** | Full downloadable library | Core activities and certificates |
| **Educator Tools** | Comprehensive classroom resources | Family-focused features |

---

## 🛠 Technical Architecture

### Frontend Stack (Both Products)
- **React 18**: Modern React with hooks and context
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions (Website only)

### Key Libraries & Tools
- **React Router**: Client-side routing
- **React Beautiful DnD**: Drag and drop interactions (Website only)
- **HTML2Canvas & jsPDF**: Certificate and image generation
- **Lucide React**: Consistent icon system
- **React GA4**: Analytics integration

### Development Tools
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript ESLint**: TypeScript-specific linting
- **Sharp**: Image optimization
- **SVGO**: SVG optimization

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher (or yarn/pnpm)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Internet Connection**: Required for initial setup and updates

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pandagarde/platform.git
   cd platform
   ```

2. **Install Dependencies**
   ```bash
   # Install main website dependencies
   npm install
   
   # Install Family Hub dependencies (optional, for Family Hub development)
   cd family-hub
   npm install
   cd ..
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Supabase Configuration (Optional)
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   
   # Sentry Configuration (Optional)
   VITE_SENTRY_DSN=your_sentry_dsn_here
   VITE_SENTRY_ORG=your_sentry_org_here
   VITE_SENTRY_PROJECT=your_sentry_project_here
   VITE_SENTRY_AUTH_TOKEN=your_sentry_auth_token_here
   
   # Analytics Configuration (Optional)
   VITE_GOOGLE_ANALYTICS_ID=your_google_analytics_id_here
   VITE_GOOGLE_TAG_MANAGER_ID=your_gtm_id_here
   ```

4. **Start Development Server**
   ```bash
   # Main PandaGarde website
   npm run dev
   
   # Family Hub app (separate terminal)
   npm run dev:family-hub
   # Or from family-hub directory:
   cd family-hub && npm run dev
   ```

5. **Build for Production**
   ```bash
   # Main website
   npm run build
   
   # Family Hub
   npm run build:family-hub
   # Or from family-hub directory:
   cd family-hub && npm run build
   ```

---

## 📖 Usage Guide

### For Parents

#### Using PandaGarde Website
1. **Getting Started**
   - Visit the platform homepage
   - Complete age verification for your child
   - Explore age-appropriate content sections
   - Access full educational resources and handbooks

2. **Monitoring Progress**
   - Access the Family Hub section to track your child's activities
   - View completed activities and achievements
   - Export progress reports for record-keeping

3. **Using Resources**
   - Download certificates for completed activities
   - Print coloring sheets and safety posters
   - Use the Family Internet Agreement template
   - Access comprehensive educational handbooks

#### Using Family Hub App
1. **Quick Access**
   - Open the app (no login required)
   - View family dashboard with all children's progress
   - Quickly access activities for any family member

2. **Family Management**
   - Add or manage family members
   - Switch between children's profiles
   - View individual progress and achievements

3. **Mobile Learning**
   - Launch activities directly from the app
   - Track progress on-the-go
   - Generate certificates from mobile device

### For Educators

1. **Classroom Integration**
   - Access educator-specific tools and resources (Website)
   - Use activities as interactive lessons
   - Track student progress across multiple profiles

2. **Curriculum Alignment**
   - Activities align with digital citizenship standards
   - Suitable for elementary and middle school students
   - Comprehensive learning objectives provided

### For Children

1. **Interactive Activities**
   - Choose activities based on age group
   - Follow on-screen instructions
   - Earn achievements and certificates

2. **Learning Path**
   - Start with easier activities
   - Progress through more complex concepts
   - Download completed artwork and certificates

---

## 🎮 Available Scripts

### Main Website
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting

# Testing
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
```

### Family Hub
```bash
# From root directory
npm run dev:family-hub    # Start Family Hub dev server
npm run build:family-hub  # Build Family Hub for production

# Or from family-hub directory
cd family-hub
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint errors
```

---

## 🚢 Deployment

PandaGarde has **3 deployment targets**:

1. **🌐 Website** - Main educational platform
2. **📱 PWA** - Installable web app (Family Hub)
3. **📲 Native Apps** - Android & iOS for app stores

### Quick Deployment

**Website:**
```bash
npm run build
netlify deploy --prod --dir=dist
# OR
vercel --prod
```

**PWA:**
```bash
npm run build:family-hub
netlify deploy --prod --dir=family-hub/dist --config=family-hub-netlify.toml
# OR
cd family-hub && vercel --prod
```

**Native Apps:**
- **Android**: See `ANDROID_BUILD_GUIDE.md`
- **iOS**: See `APP_STORE_READINESS_REPORT.md`

### Detailed Guides

- 📖 **[Complete Deployment Guide](DEPLOYMENT_GUIDE.md)** - Step-by-step instructions for all deployments
- ⚡ **[Quick Deployment Reference](QUICK_DEPLOYMENT.md)** - Quick command reference

### Deployment Platforms

- **Netlify**: Recommended for static hosting (both website and PWA)
- **Vercel**: Alternative deployment platform
- **GitHub Pages**: Free hosting option
- **AWS S3 + CloudFront**: Enterprise hosting

---

## 🔒 Privacy & Security

### Data Protection
- **Local Storage**: User progress stored locally by default
- **No Tracking**: No external analytics or tracking by default
- **GDPR Compliant**: Privacy-compliant data handling
- **Age Verification**: Content filtering based on age groups
- **COPPA Compliance**: Child privacy protection measures

### Security Features
- **Input Validation**: All user inputs are validated
- **XSS Protection**: Cross-site scripting prevention
- **CSRF Protection**: Cross-site request forgery prevention
- **Secure Headers**: Security headers configured
- **Encryption**: Local data encryption for sensitive information

---

## 📊 Performance Metrics

### PandaGarde Website
- **Build Size**: ~372KB (gzipped: ~97KB)
- **Load Time**: < 2 seconds on 3G
- **Lighthouse Score**: 95+ across all categories
- **Accessibility**: WCAG 2.1 AA compliant

### Family Hub App
- **Build Size**: Optimized for mobile (smaller footprint)
- **Load Time**: < 1.5 seconds on 3G
- **PWA Score**: 100/100
- **Mobile Performance**: Optimized for touch devices

---

## 📞 Support

- **Documentation**: Check the comprehensive user guide and technical docs
- **Issues**: Report bugs and request features via GitHub Issues
- **Community**: Join discussions with other users and developers
- **Contact**: Use the contact form on the platform for direct support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Educational Content**: Based on digital citizenship and privacy education best practices
- **Design System**: Inspired by modern educational platforms
- **Community**: Built with feedback from parents, educators, and children
- **Open Source**: Built on top of amazing open source technologies

---

**PandaGarde** - Making digital privacy education fun, engaging, and accessible for everyone! 🐼✨

**Family Hub** - Your mobile companion for family privacy management! 📱👨‍👩‍👧‍👦
