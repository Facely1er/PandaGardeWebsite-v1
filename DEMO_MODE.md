# Demo Mode - Running Without Supabase

This application can run in demo mode without requiring Supabase configuration. This is perfect for testing, demonstrations, or when you want to avoid database setup complexity.

## How to Run in Demo Mode

1. **Copy the demo environment file:**
   ```bash
   cp .env.demo .env.local
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## What Works in Demo Mode

✅ **All core functionality** - The application works exactly as intended
✅ **Progress tracking** - All progress is saved to localStorage
✅ **Activities and quizzes** - Complete functionality
✅ **Download tracking** - Logged to console
✅ **Contact forms** - Logged to console
✅ **Newsletter signups** - Logged to console
✅ **Theme switching** - Full functionality
✅ **Responsive design** - Works on all devices

## What's Different in Demo Mode

- **No authentication** - Users can't sign up/sign in
- **No database** - All data is stored locally in the browser
- **No server-side features** - Contact forms and newsletter signups are logged to console
- **No data persistence across devices** - Progress is only saved locally

## Features That Still Work

- All educational content and activities
- Progress tracking (localStorage)
- Export/import progress data
- Theme switching
- Responsive design
- All interactive elements

## Switching to Full Mode

To enable full Supabase functionality:

1. Set up a Supabase project
2. Add your Supabase credentials to `.env.local`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Run the database setup scripts if needed

## Benefits of Demo Mode

- **No setup required** - Just run `npm install && npm run dev`
- **No external dependencies** - Works offline
- **Perfect for demos** - Show functionality without complexity
- **Easy testing** - No database state to manage
- **Fast development** - No network requests for basic functionality

This makes the application much more accessible for demonstrations and testing!