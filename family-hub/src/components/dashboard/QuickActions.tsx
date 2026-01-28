import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Trophy, Users, Target, ChevronRight, Sparkles } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  path: string;
  badge?: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'adventure',
    title: 'Start Adventure',
    description: 'Explore zones and play games',
    icon: '🗺️',
    gradient: 'from-emerald-500 to-green-600',
    path: '/app/activities',
    badge: 'NEW',
  },
  {
    id: 'family',
    title: 'Family Hub',
    description: 'View family members',
    icon: '👨‍👩‍👧‍👦',
    gradient: 'from-blue-500 to-cyan-600',
    path: '/app/kids',
  },
  {
    id: 'progress',
    title: 'My Progress',
    description: 'Track achievements',
    icon: '📊',
    gradient: 'from-violet-500 to-purple-600',
    path: '/app/progress',
  },
  {
    id: 'challenges',
    title: 'Challenges',
    description: 'Daily & weekly goals',
    icon: '🎯',
    gradient: 'from-orange-500 to-red-500',
    path: '/app/activities',
    badge: '3',
  },
];

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-700 flex items-center gap-2 px-1">
        <Sparkles className="w-5 h-5 text-yellow-500" />
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <button
            key={action.id}
            onClick={() => navigate(action.path)}
            className="relative bg-white rounded-2xl p-4 text-left shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] border-2 border-transparent hover:border-gray-200 overflow-hidden group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Background Gradient on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            {/* Badge */}
            {action.badge && (
              <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                action.badge === 'NEW' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {action.badge}
              </span>
            )}

            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-2xl mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {action.icon}
            </div>

            {/* Content */}
            <h4 className="font-bold text-gray-800 mb-0.5 group-hover:text-gray-900">
              {action.title}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-1">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

