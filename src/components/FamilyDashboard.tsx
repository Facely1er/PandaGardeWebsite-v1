import { useState, useEffect } from 'react';
import { 
  Users, Shield, Award, Plus, User, Trash2, CheckCircle, X, MessageSquare, Eye
} from 'lucide-react';
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
    <div className="space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 sm:mb-2">Family Privacy Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Manage your family's privacy learning journey and track progress together</p>
        </div>
        <button
          onClick={() => setShowFeedback(true)}
          className="flex items-center justify-center space-x-2 px-4 py-3 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors touch-manipulation min-h-[44px] w-full sm:w-auto"
        >
          <MessageSquare size={18} />
          <span>Feedback</span>
        </button>
      </div>

      {/* Family Overview Cards - Mobile First: 2 cols on mobile, 4 on tablet+ */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Users className="text-blue-600 dark:text-blue-400" size={20} />
            <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{familyMembers.length}</span>
          </div>
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-100">Family Members</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Active participants</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Shield className="text-green-600 dark:text-green-400" size={20} />
            <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{calculateFamilyScore()}</span>
          </div>
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-100">Privacy Score</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Family average</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Award className="text-purple-600 dark:text-purple-400" size={20} />
            <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
              {familyMembers.reduce((sum, member) => sum + member.completedActivities, 0)}
            </span>
          </div>
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-100">Activities Done</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total completed</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <CheckCircle className="text-orange-600 dark:text-orange-400" size={20} />
            <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
              {familyGoals.filter(goal => goal.completed).length}/{familyGoals.length}
            </span>
          </div>
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-100">Goals Achieved</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Privacy goals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Family Members Management */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Family Members</h2>
            <button 
              onClick={() => setShowAddMember(true)}
              className="bg-green-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors flex items-center justify-center space-x-2 touch-manipulation min-h-[44px] w-full sm:w-auto"
            >
              <Plus size={16} />
              <span>Add Member</span>
            </button>
          </div>

          {familyMembers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-300 mb-4">No family members added yet</p>
              <button 
                onClick={() => setShowAddMember(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Your First Member
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {familyMembers.map(member => (
                <div key={member.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4 bg-gray-50 dark:bg-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="text-green-600 dark:text-green-400" size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-100 truncate">{member.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{member.role} • Age {member.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                      <div className="text-right sm:text-right">
                        <div className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">
                          {calculateMemberScore(member.id)}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Privacy Score</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedChildId(member.id)}
                          className="p-2 sm:p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 active:bg-blue-100 dark:active:bg-blue-900 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                          title="View detailed progress"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => removeFamilyMember(member.id)}
                          className="p-2 sm:p-2 text-red-500 hover:text-red-700 active:bg-red-100 dark:active:bg-red-900 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                          title="Remove family member"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Privacy Score Display */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Privacy Score</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {calculateMemberScore(member.id)}/100
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                      <div
                        className={`h-full ${
                          calculateMemberScore(member.id) >= 80 ? 'bg-green-500' :
                          calculateMemberScore(member.id) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.max(0, Math.min(100, calculateMemberScore(member.id)))}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>Needs Work</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Score calculated from completed activities
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Family Goals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Privacy Goals</h2>
            <button 
              onClick={() => setShowAddGoal(true)}
              className="bg-green-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors flex items-center justify-center space-x-2 touch-manipulation min-h-[44px] w-full sm:w-auto"
            >
              <Plus size={16} />
              <span>Add Goal</span>
            </button>
          </div>

          {familyGoals.length === 0 ? (
            <div className="text-center py-8">
              <Award className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-300 mb-4">No privacy goals set yet</p>
              <button 
                onClick={() => setShowAddGoal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Set Your First Goal
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {familyGoals.map(goal => (
                <div key={goal.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`font-semibold ${goal.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
                          {goal.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          goal.priority === 'High' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                          goal.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                          'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        }`}>
                          {goal.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{goal.description}</p>
                      {goal.targetDate && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                      )}
                    </div>
                    <button 
                      onClick={() => toggleGoalCompletion(goal.id)}
                      className={`ml-4 p-2 rounded-lg transition-colors ${
                        goal.completed 
                          ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800' 
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                      }`}
                    >
                      <CheckCircle size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal - Mobile Optimized */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-4 sm:p-6 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Add Family Member</h3>
              <button 
                onClick={() => setShowAddMember(false)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Enter family member's name"
                  maxLength={50}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  value={newMember.age || ''}
                  onChange={(e) => setNewMember({...newMember, age: parseInt(e.target.value) || 0})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Enter age"
                  min="1"
                  max="100"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                  <option value="Teen">Teen</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 active:bg-gray-500 dark:active:bg-gray-400 transition-colors touch-manipulation min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addFamilyMember}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors touch-manipulation min-h-[44px]"
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
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-4 sm:p-6 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Add Privacy Goal</h3>
              <button 
                onClick={() => setShowAddGoal(false)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="e.g., Set up 2FA for all accounts"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Describe what needs to be done..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Date (Optional)</label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 active:bg-gray-500 dark:active:bg-gray-400 transition-colors touch-manipulation min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addFamilyGoal}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors touch-manipulation min-h-[44px]"
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

