import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Trash2, Star, Sparkles, Crown, Heart, Shield, Award } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useFamilyProgress } from '../../contexts/FamilyProgressContext';
import ChildProgressDetail from '../../components/ChildProgressDetail';
import { 
  NavFamilyIcon, 
  PandaMascot, 
  BadgeFirstSteps, 
  BadgeExplorer, 
  TrophyIcon, 
  StarIcon, 
  FireIcon,
  SparkleIcon,
  StarDecorativeIcon,
  HeartRedIcon,
  HeartPurpleIcon,
  HeartBlueIcon,
  AvatarParentIcon,
  AvatarChildIcon,
  AvatarTeenIcon,
  AvatarGuardianIcon,
  CelebrationIcon
} from '../../components/icons/ZoneIcons';

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

const roleIcons: Record<string, React.FC<{ size?: number; className?: string }> | null> = {
  Parent: null,
  Child: null,
  Teen: null,
  Guardian: null,
};

const roleColors: Record<string, { gradient: string; bg: string; border: string }> = {
  Parent: { gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-100', border: 'border-violet-300' },
  Child: { gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-100', border: 'border-amber-300' },
  Teen: { gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-100', border: 'border-blue-300' },
  Guardian: { gradient: 'from-emerald-500 to-green-600', bg: 'bg-emerald-100', border: 'border-emerald-300' },
};

const avatarIcons = [
  AvatarParentIcon,
  AvatarChildIcon,
  AvatarTeenIcon,
  AvatarGuardianIcon,
  AvatarParentIcon,
  AvatarChildIcon,
  AvatarTeenIcon,
  AvatarGuardianIcon,
  AvatarParentIcon,
  AvatarChildIcon,
  AvatarTeenIcon,
  AvatarGuardianIcon,
];

const KidsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [familyMembers, setFamilyMembers] = useLocalStorage<FamilyMember[]>('pandagarde_family', []);
  const { calculateMemberScore } = useFamilyProgress();
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [newMember, setNewMember] = useState({ name: '', age: 0, role: 'Child' });

  const getAvatarIcon = (memberId: number) => {
    const IconComponent = avatarIcons[memberId % avatarIcons.length];
    return IconComponent;
  };

  const getLevel = (score: number) => {
    if (score >= 90) return { level: 5, title: 'Privacy Master', color: 'text-amber-500' };
    if (score >= 70) return { level: 4, title: 'Expert Explorer', color: 'text-purple-500' };
    if (score >= 50) return { level: 3, title: 'Skilled Adventurer', color: 'text-blue-500' };
    if (score >= 30) return { level: 2, title: 'Rising Hero', color: 'text-emerald-500' };
    return { level: 1, title: 'Newcomer', color: 'text-gray-500' };
  };

  const addFamilyMember = () => {
    if (!newMember.name.trim() || newMember.age <= 0) {
      return;
    }

    const member: FamilyMember = {
      id: Date.now(),
      name: newMember.name,
      age: newMember.age,
      role: newMember.role,
      privacyScore: 0,
      completedActivities: 0,
      badges: [],
      lastActive: new Date().toISOString()
    };
    
    setFamilyMembers([...familyMembers, member]);
    setNewMember({ name: '', age: 0, role: 'Child' });
    setShowAddMember(false);
  };

  const removeFamilyMember = (id: number) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

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

  const totalScore = familyMembers.reduce((sum, m) => sum + calculateMemberScore(m.id), 0);
  const averageScore = familyMembers.length > 0 ? Math.round(totalScore / familyMembers.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-white pb-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 right-4 w-32 h-32 opacity-20">
            <NavFamilyIcon size={128} />
          </div>
          <div className="absolute bottom-4 left-4 w-16 h-16 opacity-20">
            <PandaMascot size={64} />
          </div>
          {/* Floating hearts */}
          <div className="absolute top-20 left-8 opacity-30 animate-float">
            <HeartRedIcon size={32} />
          </div>
          <div className="absolute top-12 right-24 opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>
            <HeartPurpleIcon size={24} />
          </div>
          <div className="absolute bottom-8 right-12 opacity-25 animate-float" style={{ animationDelay: '1s' }}>
            <HeartBlueIcon size={24} />
          </div>
        </div>

        <div className="relative z-10 px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <NavFamilyIcon size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Family Adventure Team</h1>
              <p className="text-white/80 text-sm">Track your family's privacy journey!</p>
            </div>
          </div>

          {/* Family Stats Row */}
          {familyMembers.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{familyMembers.length}</div>
                <div className="text-xs text-white/80">Members</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-bold flex items-center justify-center gap-1">
                  <span>{averageScore}</span>
                  <Star className="w-4 h-4" />
                </div>
                <div className="text-xs text-white/80">Team Score</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-bold flex items-center justify-center gap-1">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs text-white/80">Active Today</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Add Member Button */}
        <button
          onClick={() => {
            if ('vibrate' in navigator) {
              navigator.vibrate(10);
            }
            setShowAddMember(true);
          }}
          className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all active:scale-[0.98] border-2 border-dashed border-violet-300 hover:border-violet-500 group"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800 group-hover:text-violet-600 transition-colors">Add Family Member</h3>
              <p className="text-xs text-gray-500">Start their privacy adventure!</p>
            </div>
          </div>
        </button>

        {familyMembers.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 mx-auto">
                <NavFamilyIcon size={128} className="opacity-30" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16">
                <PandaMascot size={64} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Start Your Family Adventure!</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Add family members to track everyone's privacy learning journey together.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[AvatarParentIcon, AvatarChildIcon, AvatarTeenIcon, AvatarGuardianIcon].map((IconComponent, i) => (
                <div 
                  key={i}
                  className="w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <IconComponent size={32} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Family Member Cards */
          <div className="space-y-4">
            {familyMembers.map((member, index) => {
              const score = calculateMemberScore(member.id);
              const levelInfo = getLevel(score);
              const roleColor = roleColors[member.role] || roleColors.Child;

              return (
                <div
                  key={member.id}
                  className="adventure-card group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-r ${roleColor.gradient} p-4 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                    
                    <div className="flex items-center gap-4 relative z-10">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/50 group-hover:scale-110 transition-transform">
                          {(() => {
                            const AvatarIcon = getAvatarIcon(member.id);
                            return <AvatarIcon size={40} />;
                          })()}
                        </div>
                        {/* Level Badge */}
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm font-bold text-violet-600">L{levelInfo.level}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-white">
                        <h3 className="font-bold text-xl">{member.name}</h3>
                        <p className="text-white/80 text-sm">{member.role} • Age {member.age}</p>
                        <p className={`text-xs mt-1 ${levelInfo.color} bg-white/20 inline-block px-2 py-0.5 rounded-full`}>
                          {levelInfo.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 font-medium">Privacy Score</span>
                        <span className="font-bold text-violet-600">{score}/100</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${roleColor.gradient} rounded-full transition-all duration-500 relative`}
                          style={{ width: `${Math.min(100, score)}%` }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-shimmer" />
                        </div>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className={`${roleColor.bg} rounded-xl p-2 text-center`}>
                        <div className="flex justify-center mb-1">
                          <TrophyIcon size={20} />
                        </div>
                        <div className="text-xs text-gray-600">{member.badges?.length || 0} Badges</div>
                      </div>
                      <div className={`${roleColor.bg} rounded-xl p-2 text-center`}>
                        <div className="flex justify-center mb-1">
                          <StarIcon size={20} />
                        </div>
                        <div className="text-xs text-gray-600">{member.completedActivities || 0} Done</div>
                      </div>
                      <div className={`${roleColor.bg} rounded-xl p-2 text-center`}>
                        <div className="flex justify-center mb-1">
                          <FireIcon size={20} />
                        </div>
                        <div className="text-xs text-gray-600">3 Day</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if ('vibrate' in navigator) navigator.vibrate(10);
                          setSelectedChildId(member.id);
                        }}
                        className={`flex-1 bg-gradient-to-r ${roleColor.gradient} text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2`}
                      >
                        <Eye size={18} />
                        View Progress
                      </button>
                      <button
                        onClick={() => {
                          if ('vibrate' in navigator) navigator.vibrate(20);
                          if (confirm(`Remove ${member.name} from the family?`)) {
                            removeFamilyMember(member.id);
                          }
                        }}
                        className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-200 transition-all active:scale-95"
                        title="Remove member"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Family Tips Section */}
        {familyMembers.length > 0 && (
          <div className="bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                <PandaMascot size={32} />
              </div>
              <div>
                <h3 className="font-bold text-violet-800">Panda's Family Tip</h3>
                <p className="text-sm text-violet-600">Learning together is more fun!</p>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
              <p className="text-gray-700 text-sm">
                🎯 <strong>Today's Challenge:</strong> Complete one activity together as a family and discuss what you learned about staying safe online!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-scaleIn">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Plus size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Add Family Member</h3>
                  <p className="text-white/80 text-sm">Start their privacy adventure!</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-5">
              {/* Avatar Preview */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${roleColors[newMember.role]?.gradient || 'from-violet-500 to-purple-600'} flex items-center justify-center text-4xl shadow-lg`}>
                    {newMember.name ? newMember.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-violet-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full p-4 border-2 border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all text-lg"
                  placeholder="Enter their name"
                  maxLength={50}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Age</label>
                <input
                  type="number"
                  value={newMember.age || ''}
                  onChange={(e) => setNewMember({...newMember, age: parseInt(e.target.value, 10) || 0})}
                  className="w-full p-4 border-2 border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all text-lg"
                  placeholder="Enter their age"
                  min="1"
                  max="100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Child', 'Teen', 'Parent', 'Guardian'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setNewMember({...newMember, role})}
                      className={`p-3 rounded-xl border-2 transition-all font-medium ${
                        newMember.role === role 
                          ? `bg-gradient-to-r ${roleColors[role].gradient} text-white border-transparent shadow-lg scale-105`
                          : `${roleColors[role].bg} ${roleColors[role].border} text-gray-700 hover:scale-105`
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if ('vibrate' in navigator) navigator.vibrate(10);
                    setShowAddMember(false);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-all font-semibold active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if ('vibrate' in navigator) navigator.vibrate(15);
                    addFamilyMember();
                  }}
                  disabled={!newMember.name.trim() || newMember.age <= 0}
                  className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Family
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KidsScreen;
