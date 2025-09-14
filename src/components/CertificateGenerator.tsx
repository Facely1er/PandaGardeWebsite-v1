import React, { useState } from 'react';
import { Download, Award, FileText, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { certificateService } from '../lib/certificateService';
import Button from './ui/Button';

interface CertificateGeneratorProps {
  onClose?: () => void;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ onClose }) => {
  const { user } = useAuth();
  const { progress, getOverallProgress } = useProgress();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCertificates, setGeneratedCertificates] = useState<string[]>([]);

  const overallProgress = getOverallProgress();

  const generatePrivacyChampionCertificate = async () => {
    if (!user) return;

    setIsGenerating(true);
    try {
      const certificateData = {
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'Privacy Learner',
        achievement: 'Privacy Champion',
        date: new Date().toLocaleDateString(),
        score: Math.round(overallProgress.percentage),
        timeSpent: progress.totalTimeSpent
      };

      const blob = await certificateService.generatePrivacyChampionCertificate(certificateData);
      const filename = `Privacy_Champion_Certificate_${new Date().toISOString().split('T')[0]}.pdf`;
      
      certificateService.downloadCertificate(blob, filename);
      setGeneratedCertificates(prev => [...prev, filename]);
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateActivityCertificate = async (activityId: string, activityName: string) => {
    if (!user) return;

    setIsGenerating(true);
    try {
      const activityProgress = progress.activityDetails[activityId];
      const certificateData = {
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'Privacy Learner',
        achievement: activityName,
        date: activityProgress?.completedAt?.toLocaleDateString() || new Date().toLocaleDateString(),
        score: activityProgress?.score,
        timeSpent: activityProgress?.timeSpent
      };

      const blob = await certificateService.generateActivityCertificate(certificateData);
      const filename = `${activityName.replace(/\s+/g, '_')}_Certificate_${new Date().toISOString().split('T')[0]}.pdf`;
      
      certificateService.downloadCertificate(blob, filename);
      setGeneratedCertificates(prev => [...prev, filename]);
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const activityNames: Record<string, string> = {
    'coloring': 'Privacy Panda Coloring',
    'sorting': 'Information Sorting Game',
    'maze': 'Safe Online Journey Maze',
    'wordsearch': 'Privacy Word Search',
    'connectdots': 'Privacy Shield Connect-the-Dots',
    'matching': 'Privacy Symbol Matching'
  };

  if (!user) {
    return (
      <div className="text-center p-8">
        <Award size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary)' }}>
          Sign In Required
        </h3>
        <p style={{ color: 'var(--gray-600)' }}>
          Please sign in to generate certificates for your achievements.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <Award size={48} className="mx-auto mb-4" style={{ color: 'var(--primary)' }} />
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
          Generate Certificates
        </h2>
        <p style={{ color: 'var(--gray-600)' }}>
          Download certificates for your privacy education achievements
        </p>
      </div>

      {/* Overall Progress Certificate */}
      {overallProgress.percentage === 100 && (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Award size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>
                  Privacy Champion Certificate
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  Complete all activities to earn this special certificate
                </p>
              </div>
            </div>
            <Button
              onClick={generatePrivacyChampionCertificate}
              loading={isGenerating}
              variant="primary"
              className="flex items-center gap-2"
            >
              <Download size={20} />
              Download Certificate
            </Button>
          </div>
        </div>
      )}

      {/* Individual Activity Certificates */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>
          Activity Certificates
        </h3>
        
        {progress.completedActivities.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-xl" style={{ backgroundColor: 'var(--light)' }}>
            <FileText size={48} className="mx-auto mb-4 text-gray-400" />
            <p style={{ color: 'var(--gray-600)' }}>
              Complete some activities to generate certificates
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progress.completedActivities.map((activityId) => {
              const activityName = activityNames[activityId] || activityId;
              const activityProgress = progress.activityDetails[activityId];
              
              return (
                <div 
                  key={activityId}
                  className="bg-white rounded-xl p-4 shadow-md" 
                  style={{ backgroundColor: 'var(--card-color)' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <FileText size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold" style={{ color: 'var(--primary)' }}>
                          {activityName}
                        </h4>
                        <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                          Completed {activityProgress?.completedAt?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => generateActivityCertificate(activityId, activityName)}
                      loading={isGenerating}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Download size={16} />
                      PDF
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Generated Certificates List */}
      {generatedCertificates.length > 0 && (
        <div className="mt-8 bg-green-50 rounded-xl p-4" style={{ backgroundColor: 'var(--light)' }}>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>
            Recently Generated Certificates
          </h4>
          <ul className="space-y-1">
            {generatedCertificates.map((filename, index) => (
              <li key={index} className="text-sm flex items-center gap-2" style={{ color: 'var(--gray-600)' }}>
                <FileText size={16} />
                {filename}
              </li>
            ))}
          </ul>
        </div>
      )}

      {onClose && (
        <div className="mt-8 text-center">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;