import { useState, useEffect } from 'react';
import { 
  Users, Shield, Award, Plus, Trash2, CheckCircle, X, MessageSquare, Eye, ArrowLeft, Clock, Gamepad2, Play, Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFamilyProgress } from '../contexts/FamilyProgressContext';
import { trackEvent, AnalyticsEvents } from '../lib/analytics';
import ChildProgressDetail from './ChildProgressDetail';
import FeedbackForm from './FeedbackForm';
import { 
  validateFamilyMember, 
  validateGoal, 
  sanitizeInput,
  detectSuspiciousActivity,
  logSecurityEvent
} from '../lib/familyHubSecurity';

interface FamilyMember {
  id: number;
  name: string;
  age: number;
  role: string;
  privacyScore: number;
  completedActivities: number;
  badges: string[];
  lastActive: string;
}

interface FamilyGoal {
  id: number;
  title: string;
  description: string;
  targetDate: string;
  priority: string;
  completed: boolean;
  createdDate: string;
  progress: number;
}

// Enhanced security: Use security utilities from familyHubSecurity

const FamilyDashboard = () => {
  const navigate = useNavigate();
  const { calculateMemberScore, getMemberProgress } = useFamilyProgress();
  const [familyMembers, setFamilyMembers] = useLocalStorage<FamilyMember[]>('pandagarde_family', []);
  const [familyGoals, setFamilyGoals] = useLocalStorage<FamilyGoal[]>('pandagarde_family_goals', []);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [newMember, setNewMember] = useState({ name: '', age: 0, role: 'Child' });
  const [newGoal, setNewGoal] = useState({ title: '', description: '', targetDate: '', priority: 'Medium' });
  const [memberErrors, setMemberErrors] = useState<string[]>([]);

  // Sync progress data with family members
  useEffect(() => {
    if (familyMembers.length > 0) {
      const updatedMembers = familyMembers.map((member: FamilyMember) => {
        const progress = getMemberProgress(member.id);
        const realScore = calculateMemberScore(member.id);
        const completedCount = progress?.completedCount || 0;
        const lastActive = progress?.lastActive || member.lastActive;
        
        return {
          ...member,
          privacyScore: realScore,
          completedActivities: completedCount,
          lastActive
        };
      });
      setFamilyMembers(updatedMembers);
    }
  }, [calculateMemberScore, getMemberProgress]); // Removed setFamilyMembers from deps to avoid infinite loop

  // Calculate family privacy score
  const calculateFamilyScore = () => {
    if (familyMembers.length === 0) return 0;
    const totalScore = familyMembers.reduce((sum, member) => {
      const realScore = calculateMemberScore(member.id);
      return sum + realScore;
    }, 0);
    return Math.round(totalScore / familyMembers.length);
  };

  // Add family member
  const addFamilyMember = () => {
    setMemberErrors([]);
    
    // Security check: Detect suspicious activity
    if (detectSuspiciousActivity('add_family_member', { memberCount: familyMembers.length })) {
      logSecurityEvent('suspicious_activity_detected', { action: 'add_family_member' });
      setMemberErrors(['Too many requests. Please wait a moment.']);
      return;
    }
    
    // Enhanced validation using security utilities
    const validation = validateFamilyMember(newMember);
    if (!validation.isValid) {
      setMemberErrors(validation.errors);
      logSecurityEvent('validation_failed', { action: 'add_family_member', errors: validation.errors });
      return;
    }

    // Sanitize input
    const sanitizedName = sanitizeInput(newMember.name);

    const member: FamilyMember = {
      id: Date.now(),
      name: sanitizedName,
      age: newMember.age,
      role: newMember.role,
      privacyScore: 0, // Start at 0, will be calculated from actual activities
      completedActivities: 0,
      badges: [],
      lastActive: new Date().toISOString()
    };
    
    setFamilyMembers([...familyMembers, member]);
    setNewMember({ name: '', age: 0, role: 'Child' });
    setShowAddMember(false);
    
    // Log security event
    logSecurityEvent('family_member_added', { memberId: member.id, role: member.role });
    
    // Track analytics
    trackEvent(AnalyticsEvents.FAMILY_MEMBER_ADDED, {
      memberId: member.id,
      role: member.role,
      age: member.age,
      timestamp: new Date().toISOString()
    });
  };

  // Remove family member
  const removeFamilyMember = (id: number) => {
    // Security check
    if (detectSuspiciousActivity('remove_family_member', { memberId: id })) {
      logSecurityEvent('suspicious_activity_detected', { action: 'remove_family_member', memberId: id });
      return;
    }
    
    const member = familyMembers.find(m => m.id === id);
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
    
    // Log security event
    if (member) {
      logSecurityEvent('family_member_removed', { memberId: id, role: member.role });
      
      // Track analytics
      trackEvent(AnalyticsEvents.FAMILY_MEMBER_REMOVED, {
        memberId: id,
        role: member.role,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Add family goal
  const addFamilyGoal = () => {
    // Security check
    if (detectSuspiciousActivity('add_family_goal', { goalCount: familyGoals.length })) {
      logSecurityEvent('suspicious_activity_detected', { action: 'add_family_goal' });
      return;
    }
    
    // Enhanced validation
    const validation = validateGoal(newGoal);
    if (!validation.isValid) {
      logSecurityEvent('validation_failed', { action: 'add_family_goal', errors: validation.errors });
      return;
    }
    
    if (newGoal.title) {
      // Sanitize inputs
      const sanitizedTitle = sanitizeInput(newGoal.title);
      const sanitizedDescription = sanitizeInput(newGoal.description);
      
      const goal: FamilyGoal = {
        id: Date.now(),
        title: sanitizedTitle,
        description: sanitizedDescription,
        targetDate: newGoal.targetDate,
        priority: newGoal.priority,
        completed: false,
        createdDate: new Date().toISOString(),
        progress: 0
      };
      setFamilyGoals([...familyGoals, goal]);
      setNewGoal({ title: '', description: '', targetDate: '', priority: 'Medium' });
      setShowAddGoal(false);
      
      // Log security event
      logSecurityEvent('family_goal_added', { goalId: goal.id, priority: goal.priority });
      
      // Track analytics
      trackEvent(AnalyticsEvents.FAMILY_GOAL_ADDED, {
        goalId: goal.id,
        priority: goal.priority,
        hasTargetDate: !!goal.targetDate,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Toggle goal completion
  const toggleGoalCompletion = (id: number) => {
    const goal = familyGoals.find(g => g.id === id);
    const newCompleted = goal ? !goal.completed : false;
    
    setFamilyGoals(familyGoals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed, progress: goal.completed ? 0 : 100 } : goal
    ));
    
    // Track analytics
    if (goal && newCompleted) {
      trackEvent(AnalyticsEvents.FAMILY_GOAL_COMPLETED, {
        goalId: id,
        priority: goal.priority,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Track analytics when viewing child progress
  useEffect(() => {
    if (selectedChildId) {
      const selectedChild = familyMembers.find(m => m.id === selectedChildId);
      if (selectedChild) {
        trackEvent(AnalyticsEvents.CHILD_PROGRESS_VIEWED, {
          memberId: selectedChild.id,
          memberName: selectedChild.name,
          timestamp: new Date().toISOString()
        });
      }
    }
  }, [selectedChildId, familyMembers]);

  // Show child progress detail if selected
  if (selectedChildId) {
    const selectedChild = familyMembers.find(m => m.id === selectedChildId);
    if (selectedChild) {
      return (
        <ChildProgressDetail
          memberId={selectedChild.id}
          memberName={selectedChild.name}
          memberAge={selectedChild.age}
          onBack={() => setSelectedChildId(null)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white py-8 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'><circle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.1)'/><circle cx='80' cy='40' r='1' fill='rgba(255,255,255,0.05)'/><circle cx='40' cy='80' r='1' fill='rgba(255,255,255,0.1)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23grain)'/></svg>")`
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20">
              <Logo />
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
              Privacy Panda
              <span className="block text-yellow-300 mt-1">Family Hub</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
              Your central dashboard for family privacy education, progress tracking, and personalized learning paths.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm px-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Users size={14} className="sm:w-4 sm:h-4" />
                <span className="font-medium">{familyMembers.length} Family {familyMembers.length === 1 ? 'Member' : 'Members'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Award size={14} className="sm:w-4 sm:h-4" />
                <span className="font-medium">{calculateFamilyScore()}/100 Privacy Score</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Clock size={14} className="sm:w-4 sm:h-4" />
                <span className="font-medium">Active Learning</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-40" style={{ backgroundColor: 'var(--card-color)' }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2.5 sm:py-3 gap-3 sm:gap-0">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors text-sm sm:text-base"
              style={{ color: 'var(--primary-light)' }}
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Main Site</span>
              <span className="sm:hidden">Back</span>
            </Link>
            
            <button
              onClick={() => setShowFeedback(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <MessageSquare size={16} />
              <span>Feedback</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Family Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div 
            className="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-green-200"
            style={{ 
              backgroundColor: 'var(--card-color)',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="text-blue-600" size={18} />
              </div>
              <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                {familyMembers.length}
              </span>
            </div>
            <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1" style={{ color: 'var(--primary)' }}>Family Members</h3>
            <p className="text-xs" style={{ color: 'var(--gray-600)' }}>Active participants</p>
          </div>

          <div 
            className="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-green-200"
            style={{ 
              backgroundColor: 'var(--card-color)',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="text-green-600" size={18} />
              </div>
              <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                {calculateFamilyScore()}
              </span>
            </div>
            <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1" style={{ color: 'var(--primary)' }}>Privacy Score</h3>
            <p className="text-xs" style={{ color: 'var(--gray-600)' }}>Family average</p>
          </div>

          <div 
            className="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-green-200"
            style={{ 
              backgroundColor: 'var(--card-color)',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="text-purple-600" size={18} />
              </div>
              <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                {familyMembers.reduce((sum, member) => sum + member.completedActivities, 0)}
              </span>
            </div>
            <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1" style={{ color: 'var(--primary)' }}>Activities Done</h3>
            <p className="text-xs" style={{ color: 'var(--gray-600)' }}>Total completed</p>
          </div>

          <div 
            className="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-green-200"
            style={{ 
              backgroundColor: 'var(--card-color)',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-orange-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-orange-600" size={18} />
              </div>
              <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                {familyGoals.filter(goal => goal.completed).length}/{familyGoals.length}
              </span>
            </div>
            <h3 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1" style={{ color: 'var(--primary)' }}>Goals Achieved</h3>
            <p className="text-xs" style={{ color: 'var(--gray-600)' }}>Privacy goals</p>
          </div>
        </div>

        {/* Learning Hub Quick Access */}
        <div 
          className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl shadow-lg p-5 sm:p-6 mb-6 sm:mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='stars' width='100' height='100' patternUnits='userSpaceOnUse'><circle cx='20' cy='20' r='2' fill='rgba(255,255,255,0.3)'/><circle cx='80' cy='40' r='1' fill='rgba(255,255,255,0.2)'/><circle cx='40' cy='80' r='1.5' fill='rgba(255,255,255,0.3)'/><circle cx='60' cy='10' r='1' fill='rgba(255,255,255,0.2)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23stars)'/></svg>")`
            }} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Gamepad2 className="text-white" size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="text-yellow-300" size={18} />
                  <h3 className="text-xl sm:text-2xl font-bold">Learning Hub</h3>
                </div>
                <p className="text-white/80 text-sm sm:text-base">
                  Play fun privacy games and activities to boost your family's privacy score!
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/family-hub/learning')}
              className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 hover:text-indigo-700 transition-all shadow-md hover:shadow-lg w-full md:w-auto justify-center"
            >
              <Play size={18} />
              <span>Start Learning</span>
            </button>
          </div>
          
          <div className="relative z-10 mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <span>12 Interactive Games</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span>All Ages</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span>Earn Badges</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Family Members Management */}
          <div 
            className="bg-white rounded-xl shadow-md p-5 sm:p-6"
            style={{ 
              backgroundColor: 'var(--card-color)',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>Family Members</h2>
              <button 
                onClick={() => setShowAddMember(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors flex items-center justify-center gap-2 touch-manipulation min-h-[44px] w-full sm:w-auto font-medium"
              >
                <Plus size={16} />
                <span>Add Member</span>
              </button>
            </div>

            {familyMembers.length === 0 ? (
              <div className="text-center py-8 sm:py-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
                  <Users className="text-gray-400" size={28} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--primary)' }}>
                  No Family Members Yet
                </h3>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>Add your first family member to start tracking progress together.</p>
                <button 
                  onClick={() => setShowAddMember(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  Add Your First Member
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {familyMembers.map(member => (
                  <div 
                    key={member.id} 
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-300 transition-all"
                    style={{ 
                      backgroundColor: 'var(--light)',
                      borderColor: 'var(--gray-200)'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-sm flex-shrink-0">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg truncate" style={{ color: 'var(--primary)' }}>
                            {member.name}
                          </h3>
                          <p className="text-sm" style={{ color: 'var(--gray-600)' }}>{member.role} • Age {member.age}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        <div className="text-right">
                          <div className="text-lg sm:text-xl font-bold" style={{ color: 'var(--primary)' }}>
                            {calculateMemberScore(member.id)}
                          </div>
                          <div className="text-xs" style={{ color: 'var(--gray-600)' }}>Privacy Score</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedChildId(member.id)}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                            title="View detailed progress"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => removeFamilyMember(member.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                            title="Remove family member"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Privacy Score Display */}
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t" style={{ borderColor: 'var(--gray-200)' }}>
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span className="text-xs sm:text-sm" style={{ color: 'var(--gray-600)' }}>Privacy Score</span>
                        <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--gray-700)' }}>
                          {calculateMemberScore(member.id)}/100
                        </span>
                      </div>
                      <div className="w-full h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            calculateMemberScore(member.id) >= 80 ? 'bg-green-500' :
                            calculateMemberScore(member.id) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.max(0, Math.min(100, calculateMemberScore(member.id)))}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1 sm:mt-1.5" style={{ color: 'var(--gray-500)' }}>
                        <span>Needs Work</span>
                        <span>Good</span>
                        <span>Excellent</span>
                      </div>
                      <p className="text-xs mt-1.5 sm:mt-2" style={{ color: 'var(--gray-500)' }}>
                        Score calculated from completed activities
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Family Goals */}
          <div 
            className="bg-white rounded-xl shadow-md p-5 sm:p-6"
            style={{ 
              backgroundColor: 'var(--card-color)',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>Privacy Goals</h2>
              <button 
                onClick={() => setShowAddGoal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors flex items-center justify-center gap-2 touch-manipulation min-h-[44px] w-full sm:w-auto font-medium"
              >
                <Plus size={16} />
                <span>Add Goal</span>
              </button>
            </div>

            {familyGoals.length === 0 ? (
              <div className="text-center py-8 sm:py-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
                  <Award className="text-gray-400" size={28} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--primary)' }}>
                  No Privacy Goals Yet
                </h3>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base" style={{ color: 'var(--gray-600)' }}>Set your first privacy goal to track your family's progress.</p>
                <button 
                  onClick={() => setShowAddGoal(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  Set Your First Goal
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {familyGoals.map(goal => (
                  <div 
                    key={goal.id} 
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-300 transition-all"
                    style={{ 
                      backgroundColor: 'var(--light)',
                      borderColor: goal.completed ? 'var(--green-200)' : 'var(--gray-200)'
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className={`font-semibold text-base sm:text-lg ${goal.completed ? 'line-through' : ''}`} style={{ 
                            color: goal.completed ? 'var(--gray-500)' : 'var(--primary)' 
                          }}>
                            {goal.title}
                          </h3>
                          <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                            goal.priority === 'High' ? 'bg-red-100 text-red-800' :
                            goal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {goal.priority}
                          </span>
                        </div>
                        <p className="text-sm mb-2" style={{ color: 'var(--gray-600)' }}>{goal.description}</p>
                        {goal.targetDate && (
                          <p className="text-xs" style={{ color: 'var(--gray-500)' }}>
                            Target: {new Date(goal.targetDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={() => toggleGoalCompletion(goal.id)}
                        className={`p-2.5 rounded-lg transition-colors flex-shrink-0 ${
                          goal.completed 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={goal.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        <CheckCircle size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Member Modal - Mobile Optimized */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div 
            className="rounded-xl max-w-md w-full p-4 sm:p-6 my-auto max-h-[90vh] overflow-y-auto shadow-xl"
            style={{ backgroundColor: 'var(--card-color)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>Add Family Member</h3>
              <button 
                onClick={() => setShowAddMember(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              {memberErrors.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3">
                  <ul className="text-sm text-red-600 dark:text-red-300 space-y-1">
                    {memberErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--gray-700)' }}>Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  style={{ backgroundColor: 'var(--card-color)', color: 'var(--gray-900)' }}
                  placeholder="Enter family member's name"
                  maxLength={50}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--gray-700)' }}>Age</label>
                <input
                  type="number"
                  value={newMember.age || ''}
                  onChange={(e) => setNewMember({...newMember, age: parseInt(e.target.value) || 0})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  style={{ backgroundColor: 'var(--card-color)', color: 'var(--gray-900)' }}
                  placeholder="Enter age"
                  min="1"
                  max="100"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--gray-700)' }}>Role</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  style={{ backgroundColor: 'var(--card-color)', color: 'var(--gray-900)' }}
                >
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                  <option value="Teen">Teen</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 active:bg-gray-500 transition-colors touch-manipulation min-h-[44px] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addFamilyMember}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors touch-manipulation min-h-[44px] font-medium"
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal - Mobile Optimized */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div 
            className="rounded-xl max-w-md w-full p-4 sm:p-6 my-auto max-h-[90vh] overflow-y-auto shadow-xl"
            style={{ backgroundColor: 'var(--card-color)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>Add Privacy Goal</h3>
              <button 
                onClick={() => setShowAddGoal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--gray-700)' }}>Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  style={{ backgroundColor: 'var(--card-color)', color: 'var(--gray-900)' }}
                  placeholder="e.g., Set up 2FA for all accounts"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--gray-700)' }}>Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  style={{ backgroundColor: 'var(--card-color)', color: 'var(--gray-900)' }}
                  placeholder="Describe what needs to be done..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--gray-700)' }}>Target Date (Optional)</label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  style={{ backgroundColor: 'var(--card-color)', color: 'var(--gray-900)' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--gray-700)' }}>Priority</label>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  style={{ backgroundColor: 'var(--card-color)', color: 'var(--gray-900)' }}
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 active:bg-gray-500 transition-colors touch-manipulation min-h-[44px] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addFamilyGoal}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors touch-manipulation min-h-[44px] font-medium"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Form Modal */}
      {showFeedback && (
        <FeedbackForm
          onClose={() => setShowFeedback(false)}
          context="family-dashboard"
        />
      )}
    </div>
  );
};

export default FamilyDashboard;

