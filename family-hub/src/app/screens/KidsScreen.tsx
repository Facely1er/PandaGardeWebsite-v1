import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Eye, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useFamilyProgress } from '../../contexts/FamilyProgressContext';
import ChildProgressDetail from '../../components/ChildProgressDetail';

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

const KidsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [familyMembers, setFamilyMembers] = useLocalStorage<FamilyMember[]>('pandagarde_family', []);
  const { calculateMemberScore } = useFamilyProgress();
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [newMember, setNewMember] = useState({ name: '', age: 0, role: 'Child' });

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

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
          Family Members
        </h1>
        <button
          onClick={() => {
            if ('vibrate' in navigator) {
              navigator.vibrate(10);
            }
            setShowAddMember(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-5 py-2.5 rounded-xl hover:from-teal-700 hover:to-cyan-700 
                     transition-all duration-300 min-h-[44px] shadow-lg hover:shadow-xl active:scale-95 font-semibold"
        >
          <Plus size={18} />
          <span>Add Member</span>
        </button>
      </div>

      {familyMembers.length === 0 ? (
        <div className="text-center py-16 animate-fadeIn">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Users className="text-teal-600 dark:text-teal-400" size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            No Family Members Yet
          </h3>
          <p className="mb-8 text-gray-600 dark:text-gray-400 text-base max-w-md mx-auto">
            Add your first family member to start tracking progress together.
          </p>
          <button
            onClick={() => {
              if ('vibrate' in navigator) {
                navigator.vibrate(10);
              }
              setShowAddMember(true);
            }}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-xl hover:from-teal-700 hover:to-cyan-700 
                       transition-all duration-300 font-semibold min-h-[44px] shadow-lg hover:shadow-xl active:scale-95"
          >
            Add Your First Member
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {familyMembers.map((member, index) => (
            <div
              key={member.id}
              className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50 dark:border-gray-700/50 
                         shadow-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300
                         hover:-translate-y-1 active:scale-[0.98] transform-gpu"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.role} • Age {member.age}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, calculateMemberScore(member.id))}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                        {calculateMemberScore(member.id)}/100
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if ('vibrate' in navigator) {
                        navigator.vibrate(10);
                      }
                      setSelectedChildId(member.id);
                    }}
                    className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 shadow-sm hover:shadow-md"
                    title="View detailed progress"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if ('vibrate' in navigator) {
                        navigator.vibrate(20);
                      }
                      removeFamilyMember(member.id);
                    }}
                    className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 shadow-sm hover:shadow-md"
                    title="Remove family member"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Member Modal - Enhanced */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scaleIn border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Add Family Member
              </h3>
              <button
                onClick={() => {
                  if ('vibrate' in navigator) {
                    navigator.vibrate(10);
                  }
                  setShowAddMember(false);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 active:scale-95"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter family member's name"
                  maxLength={50}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Age</label>
                <input
                  type="number"
                  value={newMember.age || ''}
                  onChange={(e) => setNewMember({...newMember, age: parseInt(e.target.value, 10) || 0})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter age"
                  min="1"
                  max="100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Role</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                  <option value="Teen">Teen</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    if ('vibrate' in navigator) {
                      navigator.vibrate(10);
                    }
                    setShowAddMember(false);
                  }}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 min-h-[44px] font-semibold active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if ('vibrate' in navigator) {
                      navigator.vibrate(15);
                    }
                    addFamilyMember();
                  }}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 min-h-[44px] font-semibold shadow-lg hover:shadow-xl active:scale-95"
                >
                  Add Member
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

