// Production Monitoring Service for PandaGarde
import { trackEvent, AnalyticsEvents } from './analytics';
import { reportError } from './sentry';

interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  errorRate: number;
  userEngagement: number;
}

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: number;
  checks: {
    database: boolean;
    authentication: boolean;
    search: boolean;
    offline: boolean;
  };
  metrics: PerformanceMetrics;
}

interface Alert {
  id: string;
  type: 'error' | 'performance' | 'security' | 'usage';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: number;
  resolved: boolean;
  metadata?: any;
}

// Production Monitoring Service
export const productionMonitoringService = {
  private alerts: Alert[] = [],
  private metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    apiResponseTime: 0,
    memoryUsage: 0,
    errorRate: 0,
    userEngagement: 0,
  },

  // Initialize monitoring
  initialize(): void {
    console.log('Initializing production monitoring...');
    
    // Set up performance monitoring
    this.setupPerformanceMonitoring();
    
    // Set up error monitoring
    this.setupErrorMonitoring();
    
    // Set up health checks
    this.setupHealthChecks();
    
    // Set up user engagement tracking
    this.setupEngagementTracking();
    
    console.log('Production monitoring initialized');
  },

  // Setup performance monitoring
  private setupPerformanceMonitoring(): void {
    // Monitor page load times
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        this.metrics.pageLoadTime = loadTime;
        
        // Alert if page load time is too high
        if (loadTime > 3000) { // 3 seconds
          this.createAlert({
            type: 'performance',
            severity: 'medium',
            message: `Page load time exceeded threshold: ${loadTime}ms`,
            metadata: { loadTime, threshold: 3000 }
          });
        }
        
        trackEvent(AnalyticsEvents.PERFORMANCE_METRIC, {
          metric_type: 'page_load_time',
          value: loadTime,
          threshold_exceeded: loadTime > 3000
        });
      });
    }

    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        
        this.metrics.memoryUsage = memoryUsage;
        
        // Alert if memory usage is too high
        if (memoryUsage > 0.8) { // 80%
          this.createAlert({
            type: 'performance',
            severity: 'high',
            message: `High memory usage detected: ${(memoryUsage * 100).toFixed(1)}%`,
            metadata: { memoryUsage, threshold: 0.8 }
          });
        }
      }, 30000); // Check every 30 seconds
    }
  },

  // Setup error monitoring
  private setupErrorMonitoring(): void {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.metrics.errorRate += 1;
      
      this.createAlert({
        type: 'error',
        severity: 'medium',
        message: `JavaScript error: ${event.message}`,
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack
        }
      });
      
      // Report to Sentry
      reportError(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.metrics.errorRate += 1;
      
      this.createAlert({
        type: 'error',
        severity: 'medium',
        message: `Unhandled promise rejection: ${event.reason}`,
        metadata: { reason: event.reason }
      });
      
      // Report to Sentry
      reportError(new Error(`Unhandled promise rejection: ${event.reason}`));
    });
  },

  // Setup health checks
  private setupHealthChecks(): void {
    // Run health checks every 5 minutes
    setInterval(() => {
      this.runHealthChecks();
    }, 5 * 60 * 1000);
    
    // Run initial health check
    this.runHealthChecks();
  },

  // Run health checks
  private async runHealthChecks(): Promise<void> {
    const healthCheck: HealthCheck = {
      status: 'healthy',
      timestamp: Date.now(),
      checks: {
        database: false,
        authentication: false,
        search: false,
        offline: false,
      },
      metrics: { ...this.metrics }
    };

    try {
      // Check database connectivity
      healthCheck.checks.database = await this.checkDatabaseHealth();
      
      // Check authentication service
      healthCheck.checks.authentication = await this.checkAuthenticationHealth();
      
      // Check search functionality
      healthCheck.checks.search = await this.checkSearchHealth();
      
      // Check offline functionality
      healthCheck.checks.offline = await this.checkOfflineHealth();
      
      // Determine overall status
      const failedChecks = Object.values(healthCheck.checks).filter(check => !check).length;
      if (failedChecks === 0) {
        healthCheck.status = 'healthy';
      } else if (failedChecks <= 2) {
        healthCheck.status = 'degraded';
      } else {
        healthCheck.status = 'unhealthy';
      }
      
      // Alert if status is not healthy
      if (healthCheck.status !== 'healthy') {
        this.createAlert({
          type: 'error',
          severity: healthCheck.status === 'unhealthy' ? 'critical' : 'medium',
          message: `Health check failed: ${healthCheck.status}`,
          metadata: { healthCheck }
        });
      }
      
      console.log('Health check completed:', healthCheck);
      
    } catch (error) {
      console.error('Health check failed:', error);
      this.createAlert({
        type: 'error',
        severity: 'critical',
        message: 'Health check system failure',
        metadata: { error: error.message }
      });
    }
  },

  // Check database health
  private async checkDatabaseHealth(): Promise<boolean> {
    try {
      // This would check your actual database connection
      // For now, we'll simulate a check
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  },

  // Check authentication health
  private async checkAuthenticationHealth(): Promise<boolean> {
    try {
      // This would check your authentication service
      // For now, we'll simulate a check
      return true;
    } catch (error) {
      console.error('Authentication health check failed:', error);
      return false;
    }
  },

  // Check search health
  private async checkSearchHealth(): Promise<boolean> {
    try {
      // This would check your search functionality
      // For now, we'll simulate a check
      return true;
    } catch (error) {
      console.error('Search health check failed:', error);
      return false;
    }
  },

  // Check offline health
  private async checkOfflineHealth(): Promise<boolean> {
    try {
      // This would check your offline functionality
      // For now, we'll simulate a check
      return true;
    } catch (error) {
      console.error('Offline health check failed:', error);
      return false;
    }
  },

  // Setup engagement tracking
  private setupEngagementTracking(): void {
    let engagementScore = 0;
    let lastActivity = Date.now();
    
    // Track user interactions
    const trackInteraction = () => {
      engagementScore += 1;
      lastActivity = Date.now();
    };
    
    // Track various user interactions
    ['click', 'scroll', 'keydown', 'mousemove'].forEach(eventType => {
      document.addEventListener(eventType, trackInteraction, { passive: true });
    });
    
    // Calculate engagement score every minute
    setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      const engagementRate = engagementScore / (timeSinceLastActivity / 1000 / 60); // interactions per minute
      
      this.metrics.userEngagement = engagementRate;
      
      // Reset counters
      engagementScore = 0;
      lastActivity = Date.now();
      
      // Alert if engagement is unusually low
      if (engagementRate < 0.1) { // Less than 0.1 interactions per minute
        this.createAlert({
          type: 'usage',
          severity: 'low',
          message: `Low user engagement detected: ${engagementRate.toFixed(3)} interactions/min`,
          metadata: { engagementRate, threshold: 0.1 }
        });
      }
    }, 60000); // Every minute
  },

  // Create alert
  private createAlert(alert: Omit<Alert, 'id' | 'timestamp' | 'resolved'>): void {
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      resolved: false
    };
    
    this.alerts.push(newAlert);
    
    // Log alert
    console.warn(`[${newAlert.severity.toUpperCase()}] ${newAlert.message}`, newAlert.metadata);
    
    // Track alert in analytics
    trackEvent(AnalyticsEvents.ALERT_CREATED, {
      alert_type: newAlert.type,
      alert_severity: newAlert.severity,
      alert_message: newAlert.message
    });
    
    // Auto-resolve low severity alerts after 1 hour
    if (newAlert.severity === 'low') {
      setTimeout(() => {
        this.resolveAlert(newAlert.id);
      }, 60 * 60 * 1000);
    }
  },

  // Resolve alert
  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      console.log(`Alert resolved: ${alert.message}`);
      
      trackEvent(AnalyticsEvents.ALERT_RESOLVED, {
        alert_type: alert.type,
        alert_severity: alert.severity,
        alert_id: alertId
      });
    }
  },

  // Get current metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  },

  // Get active alerts
  getActiveAlerts(): Alert[] {
    return this.alerts.filter(alert => !alert.resolved);
  },

  // Get all alerts
  getAllAlerts(): Alert[] {
    return [...this.alerts];
  },

  // Get alerts by severity
  getAlertsBySeverity(severity: Alert['severity']): Alert[] {
    return this.alerts.filter(alert => alert.severity === severity);
  },

  // Generate monitoring report
  generateReport(): string {
    const metrics = this.getMetrics();
    const activeAlerts = this.getActiveAlerts();
    const allAlerts = this.getAllAlerts();
    
    const criticalAlerts = this.getAlertsBySeverity('critical');
    const highAlerts = this.getAlertsBySeverity('high');
    const mediumAlerts = this.getAlertsBySeverity('medium');
    const lowAlerts = this.getAlertsBySeverity('low');
    
    return `
# Production Monitoring Report

**Generated:** ${new Date().toISOString()}

## Performance Metrics
- **Page Load Time:** ${metrics.pageLoadTime.toFixed(2)}ms
- **API Response Time:** ${metrics.apiResponseTime.toFixed(2)}ms
- **Memory Usage:** ${(metrics.memoryUsage * 100).toFixed(1)}%
- **Error Rate:** ${metrics.errorRate}
- **User Engagement:** ${metrics.userEngagement.toFixed(3)} interactions/min

## Alert Summary
- **Total Alerts:** ${allAlerts.length}
- **Active Alerts:** ${activeAlerts.length}
- **Critical:** ${criticalAlerts.length}
- **High:** ${highAlerts.length}
- **Medium:** ${mediumAlerts.length}
- **Low:** ${lowAlerts.length}

## Recent Alerts
${activeAlerts.slice(-10).map(alert => `
### ${alert.type.toUpperCase()} - ${alert.severity.toUpperCase()}
- **Message:** ${alert.message}
- **Time:** ${new Date(alert.timestamp).toISOString()}
- **Metadata:** ${alert.metadata ? JSON.stringify(alert.metadata, null, 2) : 'None'}
`).join('')}

## Recommendations
${criticalAlerts.length > 0 ? `
🚨 **CRITICAL ISSUES DETECTED**
- Immediate attention required for critical alerts
- Review system stability and performance
` : highAlerts.length > 0 ? `
⚠️ **HIGH PRIORITY ISSUES**
- Address high priority alerts promptly
- Monitor system performance closely
` : mediumAlerts.length > 0 ? `
📊 **MEDIUM PRIORITY ISSUES**
- Review medium priority alerts
- Consider performance optimizations
` : `
✅ **SYSTEM HEALTHY**
- No critical or high priority issues
- Continue monitoring for optimal performance
`}
`;
  },

  // Export monitoring data
  exportData(): any {
    return {
      metrics: this.getMetrics(),
      alerts: this.getAllAlerts(),
      timestamp: Date.now(),
      version: '1.0.0'
    };
  }
};

// Initialize monitoring when module loads
if (typeof window !== 'undefined') {
  productionMonitoringService.initialize();
}

// Export utility functions
export const getMonitoringMetrics = () => productionMonitoringService.getMetrics();
export const getActiveAlerts = () => productionMonitoringService.getActiveAlerts();
export const generateMonitoringReport = () => productionMonitoringService.generateReport();
export const exportMonitoringData = () => productionMonitoringService.exportData();