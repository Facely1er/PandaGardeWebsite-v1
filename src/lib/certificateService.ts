import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface CertificateData {
  recipientName: string;
  achievement: string;
  date: string;
  familyName?: string;
  score?: number;
  totalActivities?: number;
  completedActivities?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirements: {
    type: 'activities' | 'score' | 'time' | 'streak';
    value: number;
  };
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_activity',
    name: 'Privacy Explorer',
    description: 'Completed your first privacy activity',
    icon: '🌟',
    color: '#10B981',
    requirements: { type: 'activities', value: 1 }
  },
  {
    id: 'getting_started',
    name: 'Privacy Learner',
    description: 'Completed 3 privacy activities',
    icon: '📚',
    color: '#3B82F6',
    requirements: { type: 'activities', value: 3 }
  },
  {
    id: 'privacy_champion',
    name: 'Privacy Champion',
    description: 'Completed 6 privacy activities',
    icon: '🏆',
    color: '#F59E0B',
    requirements: { type: 'activities', value: 6 }
  },
  {
    id: 'dedicated_learner',
    name: 'Dedicated Learner',
    description: 'Spent 60+ minutes learning about privacy',
    icon: '⏰',
    color: '#8B5CF6',
    requirements: { type: 'time', value: 60 }
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score Master',
    description: 'Achieved perfect scores on all activities',
    icon: '💯',
    color: '#EF4444',
    requirements: { type: 'score', value: 100 }
  }
];

export class CertificateService {
  static async generateCertificate(certificateData: CertificateData): Promise<Blob> {
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Background gradient
    pdf.setFillColor(16, 185, 129); // Green
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // White content area
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(20, 20, pageWidth - 40, pageHeight - 40, 10, 10, 'F');

    // Border
    pdf.setDrawColor(16, 185, 129);
    pdf.setLineWidth(3);
    pdf.roundedRect(20, 20, pageWidth - 40, pageHeight - 40, 10, 10, 'S');

    // Title
    pdf.setFontSize(36);
    pdf.setTextColor(16, 185, 129);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CERTIFICATE OF ACHIEVEMENT', pageWidth / 2, 60, { align: 'center' });

    // Subtitle
    pdf.setFontSize(18);
    pdf.setTextColor(75, 85, 99);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Privacy Education Excellence', pageWidth / 2, 80, { align: 'center' });

    // Achievement icon and name
    pdf.setFontSize(24);
    pdf.setTextColor(16, 185, 129);
    pdf.setFont('helvetica', 'bold');
    pdf.text('🏆', pageWidth / 2, 110, { align: 'center' });
    pdf.text(certificateData.achievement, pageWidth / 2, 130, { align: 'center' });

    // This certifies that
    pdf.setFontSize(16);
    pdf.setTextColor(75, 85, 99);
    pdf.setFont('helvetica', 'normal');
    pdf.text('This certifies that', pageWidth / 2, 160, { align: 'center' });

    // Recipient name
    pdf.setFontSize(28);
    pdf.setTextColor(16, 185, 129);
    pdf.setFont('helvetica', 'bold');
    pdf.text(certificateData.recipientName, pageWidth / 2, 185, { align: 'center' });

    // Achievement details
    pdf.setFontSize(14);
    pdf.setTextColor(75, 85, 99);
    pdf.setFont('helvetica', 'normal');
    
    let achievementText = 'has successfully completed privacy education activities';
    if (certificateData.completedActivities && certificateData.totalActivities) {
      achievementText = `has completed ${certificateData.completedActivities} out of ${certificateData.totalActivities} privacy education activities`;
    }
    if (certificateData.score) {
      achievementText += ` with an average score of ${certificateData.score}%`;
    }
    
    pdf.text(achievementText, pageWidth / 2, 210, { align: 'center' });

    // Date
    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Awarded on ${certificateData.date}`, pageWidth / 2, 240, { align: 'center' });

    // Family name if provided
    if (certificateData.familyName) {
      pdf.text(`Family: ${certificateData.familyName}`, pageWidth / 2, 255, { align: 'center' });
    }

    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(156, 163, 175);
    pdf.text('PandaGarde Privacy Education Platform', pageWidth / 2, 270, { align: 'center' });

    return pdf.output('blob');
  }

  static async generateAchievementBadge(achievement: Achievement, recipientName: string): Promise<Blob> {
    const pdf = new jsPDF('portrait', 'mm', [80, 80]);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Background
    pdf.setFillColor(achievement.color);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // White circle for content
    pdf.setFillColor(255, 255, 255);
    pdf.circle(pageWidth / 2, pageHeight / 2, 30, 'F');

    // Achievement icon
    pdf.setFontSize(24);
    pdf.setTextColor(achievement.color);
    pdf.text(achievement.icon, pageWidth / 2, pageHeight / 2 - 5, { align: 'center' });

    // Achievement name
    pdf.setFontSize(8);
    pdf.setTextColor(achievement.color);
    pdf.setFont('helvetica', 'bold');
    pdf.text(achievement.name, pageWidth / 2, pageHeight / 2 + 10, { align: 'center' });

    // Recipient name
    pdf.setFontSize(6);
    pdf.setTextColor(75, 85, 99);
    pdf.setFont('helvetica', 'normal');
    pdf.text(recipientName, pageWidth / 2, pageHeight / 2 + 18, { align: 'center' });

    return pdf.output('blob');
  }

  static downloadCertificate(certificateData: CertificateData, filename?: string): void {
    this.generateCertificate(certificateData).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `privacy-certificate-${certificateData.recipientName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  static downloadAchievementBadge(achievement: Achievement, recipientName: string): void {
    this.generateAchievementBadge(achievement, recipientName).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `achievement-${achievement.id}-${recipientName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  static checkAchievements(progress: any): Achievement[] {
    const earnedAchievements: Achievement[] = [];
    
    for (const achievement of ACHIEVEMENTS) {
      let earned = false;
      
      switch (achievement.requirements.type) {
        case 'activities':
          earned = progress.completedActivities >= achievement.requirements.value;
          break;
        case 'score':
          const avgScore = Object.values(progress.activityDetails)
            .filter((activity: any) => activity.score !== undefined)
            .reduce((sum: number, activity: any) => sum + activity.score, 0) / 
            Object.values(progress.activityDetails).filter((activity: any) => activity.score !== undefined).length;
          earned = avgScore >= achievement.requirements.value;
          break;
        case 'time':
          earned = progress.totalTimeSpent >= achievement.requirements.value;
          break;
        case 'streak':
          // Implement streak logic if needed
          earned = false;
          break;
      }
      
      if (earned && !progress.achievements.includes(achievement.id)) {
        earnedAchievements.push(achievement);
      }
    }
    
    return earnedAchievements;
  }
}