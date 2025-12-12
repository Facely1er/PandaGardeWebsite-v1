// Newsletter content data
import { NewsletterContent } from '../../types/newsletter';

export const newsletterArchive: NewsletterContent[] = [
  {
    id: '2024-12',
    month: 'December',
    year: 2024,
    title: 'Holiday Privacy Safety',
    featuredTopic: {
      title: 'Protecting Your Family\'s Privacy During the Holidays',
      description: 'Learn how to protect your family\'s privacy during the holiday season, including safe online shopping, gift app setup, and managing digital devices received as presents.',
      articleUrl: '/guides/emergency-safety'
    },
    monthlyTip: {
      title: 'Review App Permissions Before Downloading',
      content: 'Before downloading any new apps for holiday activities or games, review what permissions they request. Only grant access to what\'s necessary for the app to function.',
      linkUrl: '/guides/app-selection'
    },
    newActivities: [
      {
        title: 'Holiday Privacy Activity Pack',
        description: 'Fun activities to teach kids about privacy while celebrating the holidays.',
        pageUrl: '/activity-book'
      }
    ],
    privacyNews: [
      {
        title: 'New COPPA Updates',
        summary: 'Recent updates to children\'s privacy protection laws may affect how apps collect data.',
        linkUrl: '/resources'
      }
    ],
    publishedAt: '2024-12-15',
    featured: true
  },
  {
    id: '2024-11',
    month: 'November',
    year: 2024,
    title: 'Social Media Privacy for Teens',
    featuredTopic: {
      title: 'Essential Tips for Helping Teenagers Navigate Social Media Safely',
      description: 'Practical strategies for parents to help their teenagers understand privacy settings, digital footprints, and safe social media practices.',
      articleUrl: '/guides/age-specific'
    },
    monthlyTip: {
      title: 'Enable Two-Factor Authentication',
      content: 'Help your teen set up two-factor authentication on all their social media accounts. This adds an extra layer of security to protect their accounts.',
      linkUrl: '/guides/device-setup'
    },
    newActivities: [
      {
        title: 'Teen Privacy Handbook',
        description: 'A comprehensive guide designed specifically for teenagers.',
        pageUrl: '/teen-handbook'
      }
    ],
    privacyNews: [
      {
        title: 'Platform Privacy Policy Changes',
        summary: 'Major social media platforms have updated their privacy policies. Review what\'s changed.',
        linkUrl: '/resources'
      }
    ],
    publishedAt: '2024-11-15',
    featured: false
  },
  {
    id: '2024-10',
    month: 'October',
    year: 2024,
    title: 'Back to School Privacy',
    featuredTopic: {
      title: 'Privacy Considerations for Students Returning to School',
      description: 'Important privacy considerations for students using educational apps, school-issued devices, and online learning platforms.',
      articleUrl: '/guides/device-setup'
    },
    monthlyTip: {
      title: 'Review School App Permissions',
      content: 'Take time to review what data educational apps collect and how they use it. You have the right to understand what information is being shared.',
      linkUrl: '/guides/app-selection'
    },
    newActivities: [
      {
        title: 'Digital Citizenship Activities',
        description: 'Activities to teach students about being good digital citizens.',
        pageUrl: '/digital-citizenship'
      }
    ],
    privacyNews: [
      {
        title: 'FERPA Updates',
        summary: 'Understanding your rights under the Family Educational Rights and Privacy Act.',
        linkUrl: '/resources'
      }
    ],
    publishedAt: '2024-10-15',
    featured: false
  }
];

export const getNewsletterById = (id: string): NewsletterContent | undefined => {
  return newsletterArchive.find(newsletter => newsletter.id === id);
};

export const getLatestNewsletter = (): NewsletterContent | undefined => {
  return newsletterArchive.length > 0 ? newsletterArchive[0] : undefined;
};

export const getNewslettersByYear = (year: number): NewsletterContent[] => {
  return newsletterArchive.filter(newsletter => newsletter.year === year);
};

