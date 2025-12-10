# 🔧 PandaGarde API Documentation

Developer documentation for the PandaGarde Digital Privacy Education Platform.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Authentication](#authentication)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Components](#components)
7. [Services](#services)
8. [Contexts](#contexts)
9. [Hooks](#hooks)
10. [Utilities](#utilities)
11. [Development](#development)
12. [Deployment](#deployment)

## 🎯 Overview

PandaGarde is built with React 18, TypeScript, and Vite, with optional Supabase integration for backend services. The platform is designed to work both online and offline, with localStorage as the primary data storage mechanism.

### Key Technologies

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (optional)
- **State Management**: React Context API
- **PDF Generation**: jsPDF
- **Canvas**: HTML5 Canvas for activities

## 🏗 Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── activities/     # Interactive learning activities
│   ├── auth/           # Authentication components
│   ├── forms/          # Form components
│   ├── story/          # Story-related components
│   └── ui/             # Basic UI components
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and services
├── pages/              # Page components
└── assets/             # Static assets
```

### Data Flow

1. **User Interaction** → Components
2. **Components** → Contexts/Hooks
3. **Contexts** → Services
4. **Services** → localStorage/Supabase
5. **Data Updates** → Context State
6. **State Changes** → Component Re-renders

## 🔐 Authentication

### Authentication Context

The `AuthContext` provides authentication functionality with optional Supabase integration.

```typescript
interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, profileData: ProfileData) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<ProfileData>) => Promise<AuthResponse>;
  loading: boolean;
}
```

### Usage Example

```typescript
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, signIn, signOut } = useAuth();
  
  const handleSignIn = async () => {
    const result = await signIn('user@example.com', 'password');
    if (result.error) {
      console.error('Sign in failed:', result.error);
    }
  };
  
  return (
    <div>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};
```

## 🗄 Database Schema

### Supabase Tables

#### profiles
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  profile_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### families
```sql
CREATE TABLE families (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### family_members
```sql
CREATE TABLE family_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### activities
```sql
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  difficulty TEXT DEFAULT 'easy',
  age_group TEXT DEFAULT 'all',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### activity_progress
```sql
CREATE TABLE activity_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,
  time_spent INTEGER, -- in minutes
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profile_id, activity_id)
);
```

### TypeScript Types

```typescript
interface Profile {
  id: string;
  email: string;
  profile_data: ProfileData;
  created_at: string;
  updated_at: string;
}

interface ProfileData {
  firstName?: string;
  lastName?: string;
  role?: 'parent' | 'child';
  age?: number;
  bio?: string;
}

interface ActivityProgress {
  activityId: string;
  completed: boolean;
  score?: number;
  completedAt: Date;
  timeSpent?: number;
}

interface UserProgress {
  completedActivities: string[];
  activityDetails: Record<string, ActivityProgress>;
  totalTimeSpent: number;
  achievements: string[];
  lastUpdated: Date;
}
```

## 🌐 API Endpoints

### Supabase API (when enabled)

#### Authentication Endpoints
- `POST /auth/v1/signup` - User registration
- `POST /auth/v1/token` - User login
- `POST /auth/v1/logout` - User logout
- `GET /auth/v1/user` - Get current user

#### Profile Endpoints
- `GET /rest/v1/profiles` - Get user profiles
- `POST /rest/v1/profiles` - Create profile
- `PATCH /rest/v1/profiles` - Update profile
- `DELETE /rest/v1/profiles` - Delete profile

#### Activity Endpoints
- `GET /rest/v1/activities` - Get activities
- `GET /rest/v1/activity_progress` - Get progress
- `POST /rest/v1/activity_progress` - Create progress
- `PATCH /rest/v1/activity_progress` - Update progress

### Local Storage API

When Supabase is not available, the application uses localStorage for data persistence.

```typescript
// Progress storage
const STORAGE_KEY = 'pandagarde_progress';

// Save progress
localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

// Load progress
const progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
```

## 🧩 Components

### Activity Components

#### ActivityManager
Central component that manages all interactive activities.

```typescript
interface ActivityManagerProps {
  onActivityComplete: (activityId: string, score?: number) => void;
  onClose: () => void;
}

const ActivityManager: React.FC<ActivityManagerProps> = ({
  onActivityComplete,
  onClose
}) => {
  // Activity management logic
};
```

#### Individual Activity Components

Each activity follows a consistent interface:

```typescript
interface ActivityProps {
  onComplete: () => void;
  onClose: () => void;
}

// Example: ColoringActivity
const ColoringActivity: React.FC<ActivityProps> = ({ onComplete, onClose }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };
  
  // Activity-specific logic
};
```

### UI Components

#### Button Component
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick
}) => {
  // Button implementation
};
```

#### Input Component
```typescript
interface InputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  type = 'text',
  placeholder,
  value,
  onChange
}) => {
  // Input implementation
};
```

## 🔧 Services

### Database Service

```typescript
class DatabaseService {
  static async getProfile(userId: string): Promise<Profile | null> {
    // Implementation
  }
  
  static async updateProfile(userId: string, updates: Partial<ProfileData>): Promise<void> {
    // Implementation
  }
  
  static async getActivityProgress(userId: string): Promise<ActivityProgress[]> {
    // Implementation
  }
  
  static async saveActivityProgress(userId: string, progress: ActivityProgress): Promise<void> {
    // Implementation
  }
}
```

### Certificate Service

```typescript
interface CertificateData {
  recipientName: string;
  achievement: string;
  date: string;
  familyName?: string;
  score?: number;
  totalActivities?: number;
  completedActivities?: number;
}

class CertificateService {
  static async generateCertificate(data: CertificateData): Promise<Blob> {
    // PDF generation logic
  }
  
  static downloadCertificate(data: CertificateData, filename?: string): void {
    // Download logic
  }
  
  static checkAchievements(progress: UserProgress): Achievement[] {
    // Achievement checking logic
  }
}
```

### Progress Service

```typescript
class ProgressService {
  static saveProgress(progress: UserProgress): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
  
  static loadProgress(): UserProgress {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : this.getDefaultProgress();
  }
  
  static exportProgress(progress: UserProgress): string {
    return JSON.stringify(progress, null, 2);
  }
  
  static importProgress(data: string): UserProgress | null {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
}
```

## 🎣 Contexts

### Progress Context

```typescript
interface ProgressContextType {
  progress: UserProgress;
  markActivityCompleted: (activityId: string, score?: number, timeSpent?: number) => void;
  getActivityProgress: (activityId: string) => ActivityProgress | undefined;
  getOverallProgress: () => {
    completedCount: number;
    totalCount: number;
    percentage: number;
  };
  resetProgress: () => void;
  exportProgress: () => string;
  importProgress: (data: string) => boolean;
}

const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Context implementation
};
```

### Toast Context

```typescript
interface ToastContextType {
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Context implementation
};
```

## 🪝 Hooks

### useProgress Hook

```typescript
const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
```

### useToast Hook

```typescript
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
```

### useAuth Hook

```typescript
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## 🛠 Utilities

### Canvas Utilities

```typescript
// Download canvas as image
const downloadCanvasAsImage = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
};

// Draw rounded rectangle
const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};
```

### Date Utilities

```typescript
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getTimeSpent = (startTime: Date, endTime: Date): number => {
  return Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
};
```

## 🚀 Development

### Setup

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd pandagarde
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

### Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "db:setup": "node scripts/setup-database.js",
    "db:push": "supabase db push",
    "db:reset": "supabase db reset",
    "db:start": "supabase start",
    "db:stop": "supabase stop",
    "db:types": "supabase gen types typescript --local > src/lib/database.types.ts"
  }
}
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting
- **Naming Conventions**:
  - Components: PascalCase
  - Functions: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Files: kebab-case

### Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build verification
npm run build
npm run preview
```

## 🚀 Deployment

### Environment Variables

```bash
# Required for Supabase integration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
VITE_APP_NAME=PandaGarde
VITE_APP_VERSION=1.0.0
```

### Build Process

1. **Production Build**
   ```bash
   npm run build
   ```

2. **Output Directory**
   - Built files in `dist/` directory
   - Static assets optimized
   - Code splitting enabled

3. **Deployment Options**
   - Manual deployment
   - AWS S3 + CloudFront
   - Traditional web hosting

### Performance Optimization

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and font optimization
- **Caching**: Browser caching strategies
- **Bundle Analysis**: Use `npm run build -- --analyze`

## 📚 Additional Resources

### Documentation Files

- `README.md` - Project overview and setup
- `USER_GUIDE.md` - User documentation
- `FEATURES_IMPLEMENTED.md` - Feature documentation
- `DEPLOYMENT.md` - Deployment guide

### External Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Supabase Documentation](https://supabase.com/docs)

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

*Last updated: [Current Date]*
*Version: 1.0*