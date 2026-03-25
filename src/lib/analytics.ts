// No-op stub — analytics disabled in no-backend mode.
// No user data is tracked or sent to any external service.

export const AnalyticsEvents = {
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  USER_PROFILE_UPDATE: 'user_profile_update',
  PAGE_VIEW: 'page_view',
  NAVIGATION_CLICK: 'navigation_click',
  SEARCH_PERFORMED: 'search_performed',
  STORY_STARTED: 'story_started',
  STORY_COMPLETED: 'story_completed',
  ACTIVITY_STARTED: 'activity_started',
  ACTIVITY_COMPLETED: 'activity_completed',
  CERTIFICATE_GENERATED: 'certificate_generated',
  DOWNLOAD_INITIATED: 'download_initiated',
  FAMILY_CREATED: 'family_created',
  CHILD_ADDED: 'child_added',
  PROGRESS_VIEWED: 'progress_viewed',
  FAMILY_MEMBER_ADDED: 'family_member_added',
  FAMILY_MEMBER_REMOVED: 'family_member_removed',
  CHILD_PROGRESS_VIEWED: 'child_progress_viewed',
  FAMILY_GOAL_ADDED: 'family_goal_added',
  FAMILY_GOAL_COMPLETED: 'family_goal_completed',
  FEEDBACK_SUBMITTED: 'feedback_submitted',
  RESOURCE_VIEWED: 'resource_viewed',
  GUIDE_ACCESSED: 'guide_accessed',
  FAQ_VIEWED: 'faq_viewed',
  ERROR_OCCURRED: 'error_occurred',
  PERFORMANCE_METRIC: 'performance_metric',
  ALERT_CREATED: 'alert_created',
  ALERT_RESOLVED: 'alert_resolved',
  PILOT_PAGE_VIEWED: 'pilot_page_viewed',
  PILOT_BANNER_SHOWN: 'pilot_banner_shown',
  PILOT_BANNER_DISMISSED: 'pilot_banner_dismissed',
  PILOT_BANNER_CLICKED: 'pilot_banner_clicked',
  PILOT_CTA_CLICKED: 'pilot_cta_clicked',
  PILOT_JOIN_CLICKED: 'pilot_join_clicked',
  PILOT_LEARN_MORE_CLICKED: 'pilot_learn_more_clicked',
} as const;

export const initAnalytics = () => {};
export const trackPageView = (_path: string, _title?: string) => {};
export const trackEvent = (_eventName: string, _parameters?: Record<string, unknown>) => {};
export const trackUserAction = (_action: string, _details?: Record<string, unknown>) => {};
export const trackContentEngagement = (
  _contentType: string,
  _action: string,
  _contentId?: string,
  _details?: Record<string, unknown>
) => {};
export const trackPerformance = (_metricName: string, _value: number, _unit?: string) => {};
export const trackError = (_error: Error, _context?: Record<string, unknown>) => {};
export const setUserProperties = (_properties: Record<string, unknown>) => {};
export const setUserId = (_userId: string) => {};
export const trackConversion = (_conversionType: string, _value?: number, _currency?: string) => {};
export const isAnalyticsEnabled = () => false;
export const optOutAnalytics = () => {};
export const optInAnalytics = () => {};
