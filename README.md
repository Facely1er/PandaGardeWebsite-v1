# PandaGarde - Digital Privacy Education Platform

A comprehensive digital privacy education platform designed for families, educators, and children to learn about online safety and digital citizenship.

## Quick Start (Demo Mode)

The easiest way to get started is in demo mode - no database setup required!

```bash
# Copy demo configuration
cp .env.demo .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run with full functionality using localStorage for progress tracking. See [DEMO_MODE.md](./DEMO_MODE.md) for details.

## Full Setup (With Supabase)

For production use with full database functionality:

1. Set up a Supabase project
2. Configure environment variables
3. Run database migrations
4. Start the application

See the full documentation for detailed setup instructions.

## Features

- **Interactive Learning Modules** - Engaging activities for different age groups
- **Progress Tracking** - Save and track learning progress
- **Family-Friendly Design** - Accessible for all ages
- **Responsive Interface** - Works on desktop, tablet, and mobile
- **Offline Capable** - Works without internet connection
- **Export/Import** - Backup and restore progress data

## Technology Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Supabase (optional) for backend services
- localStorage for offline data persistence

## License

This project is licensed under the MIT License.
