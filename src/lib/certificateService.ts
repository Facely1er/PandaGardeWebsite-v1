import { jsPDF } from 'jspdf';

interface CertificateData {
  name: string;
  achievement: string;
  date: string;
  score?: number;
  timeSpent?: number;
}

export const certificateService = {
  generatePrivacyChampionCertificate: async (data: CertificateData): Promise<Blob> => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Set up colors
    const primaryColor = '#4CAF50';
    const secondaryColor = '#81C784';
    const textColor = '#2E7D32';

    // Background gradient effect
    doc.setFillColor(240, 248, 255);
    doc.rect(0, 0, 297, 210, 'F');

    // Border
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Inner border
    doc.setDrawColor(secondaryColor);
    doc.setLineWidth(1);
    doc.rect(15, 15, 267, 180);

    // Title
    doc.setFontSize(36);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('PRIVACY CHAMPION', 148.5, 50, { align: 'center' });

    // Subtitle
    doc.setFontSize(18);
    doc.setTextColor(textColor);
    doc.setFont('helvetica', 'normal');
    doc.text('Certificate of Achievement', 148.5, 65, { align: 'center' });

    // Achievement text
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(`This certifies that`, 148.5, 90, { align: 'center' });

    // Name
    doc.setFontSize(28);
    doc.setTextColor(primaryColor);
    doc.text(data.name, 148.5, 110, { align: 'center' });

    // Achievement description
    doc.setFontSize(16);
    doc.setTextColor(textColor);
    doc.setFont('helvetica', 'normal');
    doc.text(`has successfully completed the ${data.achievement}`, 148.5, 125, { align: 'center' });
    doc.text('and demonstrated understanding of digital privacy principles', 148.5, 140, { align: 'center' });

    // Date
    doc.setFontSize(14);
    doc.text(`Date: ${data.date}`, 148.5, 160, { align: 'center' });

    // Score and time (if available)
    if (data.score || data.timeSpent) {
      let detailsText = '';
      if (data.score) {
        detailsText += `Score: ${data.score}%`;
      }
      if (data.score && data.timeSpent) {
        detailsText += ' • ';
      }
      if (data.timeSpent) {
        detailsText += `Time: ${Math.round(data.timeSpent / 60)} minutes`;
      }
      doc.text(detailsText, 148.5, 170, { align: 'center' });
    }

    // Signature line
    doc.setDrawColor(textColor);
    doc.setLineWidth(0.5);
    doc.line(50, 180, 100, 180);
    doc.text('Parent/Guardian Signature', 75, 185, { align: 'center' });

    // Logo area (placeholder)
    doc.setFillColor(secondaryColor);
    doc.circle(247, 180, 8, 'F');
    doc.setTextColor('white');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('PG', 247, 185, { align: 'center' });

    return doc.output('blob');
  },

  generateActivityCertificate: async (data: CertificateData): Promise<Blob> => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set up colors
    const primaryColor = '#4CAF50';
    const secondaryColor = '#81C784';
    const textColor = '#2E7D32';

    // Background
    doc.setFillColor(248, 255, 248);
    doc.rect(0, 0, 210, 297, 'F');

    // Border
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(2);
    doc.rect(15, 15, 180, 267);

    // Title
    doc.setFontSize(28);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('ACTIVITY COMPLETION', 105, 50, { align: 'center' });

    // Achievement
    doc.setFontSize(20);
    doc.setTextColor(textColor);
    doc.setFont('helvetica', 'normal');
    doc.text(data.achievement, 105, 70, { align: 'center' });

    // Name
    doc.setFontSize(24);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(data.name, 105, 100, { align: 'center' });

    // Description
    doc.setFontSize(14);
    doc.setTextColor(textColor);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully completed this privacy education activity', 105, 120, { align: 'center' });
    doc.text('and demonstrated understanding of digital safety concepts', 105, 135, { align: 'center' });

    // Date
    doc.setFontSize(12);
    doc.text(`Completed on: ${data.date}`, 105, 160, { align: 'center' });

    // Score and time
    if (data.score || data.timeSpent) {
      let detailsText = '';
      if (data.score) {
        detailsText += `Score: ${data.score}%`;
      }
      if (data.score && data.timeSpent) {
        detailsText += ' • ';
      }
      if (data.timeSpent) {
        detailsText += `Time: ${Math.round(data.timeSpent / 60)} minutes`;
      }
      doc.text(detailsText, 105, 175, { align: 'center' });
    }

    // Panda logo placeholder
    doc.setFillColor(secondaryColor);
    doc.circle(105, 220, 15, 'F');
    doc.setTextColor('white');
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('🐼', 105, 225, { align: 'center' });

    // Signature
    doc.setDrawColor(textColor);
    doc.setLineWidth(0.5);
    doc.line(50, 250, 100, 250);
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.text('Parent/Guardian Signature', 75, 255, { align: 'center' });

    return doc.output('blob');
  },

  downloadCertificate: (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};