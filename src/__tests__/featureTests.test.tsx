import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock service worker
Object.defineProperty(navigator, 'serviceWorker', {
  value: {
    register: jest.fn(),
    addEventListener: jest.fn(),
  },
});

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('Feature Tests Suite', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('Privacy Rights: Template Generation', () => {
    test('should generate privacy policy templates', () => {
      const generatePrivacyTemplate = (templateType: string, userData: any) => {
        const templates = {
          'basic': {
            title: 'Basic Privacy Policy',
            content: `This privacy policy explains how we collect, use, and protect your information.`,
            sections: ['Data Collection', 'Data Usage', 'Data Protection']
          },
          'comprehensive': {
            title: 'Comprehensive Privacy Policy',
            content: `This comprehensive privacy policy covers all aspects of data handling.`,
            sections: ['Data Collection', 'Data Usage', 'Data Protection', 'User Rights', 'Contact Information']
          },
          'gdpr': {
            title: 'GDPR Compliant Privacy Policy',
            content: `This privacy policy is designed to comply with GDPR requirements.`,
            sections: ['Legal Basis', 'Data Subject Rights', 'Data Protection Officer', 'Breach Notification']
          }
        };
        return templates[templateType as keyof typeof templates];
      };

      const basicTemplate = generatePrivacyTemplate('basic', {});
      expect(basicTemplate.title).toBe('Basic Privacy Policy');
      expect(basicTemplate.sections).toContain('Data Collection');
      expect(basicTemplate.sections).toContain('Data Usage');
      expect(basicTemplate.sections).toContain('Data Protection');

      const gdprTemplate = generatePrivacyTemplate('gdpr', {});
      expect(gdprTemplate.title).toBe('GDPR Compliant Privacy Policy');
      expect(gdprTemplate.sections).toContain('Legal Basis');
      expect(gdprTemplate.sections).toContain('Data Subject Rights');
    });

    test('should customize templates with user data', () => {
      const customizeTemplate = (template: any, userData: any) => {
        return {
          ...template,
          content: template.content.replace('we', userData.companyName || 'we'),
          contactEmail: userData.contactEmail || 'privacy@company.com',
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      };

      const template = {
        title: 'Privacy Policy',
        content: 'This privacy policy explains how we collect data.'
      };

      const userData = {
        companyName: 'TestCorp',
        contactEmail: 'privacy@testcorp.com'
      };

      const customized = customizeTemplate(template, userData);
      expect(customized.content).toContain('TestCorp');
      expect(customized.contactEmail).toBe('privacy@testcorp.com');
      expect(customized.lastUpdated).toBeDefined();
    });

    test('should validate template completeness', () => {
      const validateTemplate = (template: any) => {
        const requiredFields = ['title', 'content', 'sections'];
        const hasAllFields = requiredFields.every(field => template[field]);
        const hasMinimumSections = template.sections && template.sections.length >= 3;
        return hasAllFields && hasMinimumSections;
      };

      const validTemplate = {
        title: 'Test Policy',
        content: 'Test content',
        sections: ['Section 1', 'Section 2', 'Section 3']
      };

      const invalidTemplate = {
        title: 'Test Policy',
        content: 'Test content',
        sections: ['Section 1']
      };

      expect(validateTemplate(validTemplate)).toBe(true);
      expect(validateTemplate(invalidTemplate)).toBe(false);
    });
  });

  describe('Privacy Rights: Request Tracking', () => {
    test('should track privacy requests', () => {
      const requestTracker = {
        requests: [],
        addRequest: function(type: string, userId: string, details: any) {
          this.requests.push({
            id: Date.now().toString(),
            type,
            userId,
            details,
            timestamp: new Date().toISOString(),
            status: 'pending'
          });
        },
        getRequestsByUser: function(userId: string) {
          return this.requests.filter(req => req.userId === userId);
        },
        updateRequestStatus: function(requestId: string, status: string) {
          const request = this.requests.find(req => req.id === requestId);
          if (request) {
            request.status = status;
            request.updatedAt = new Date().toISOString();
          }
        }
      };

      requestTracker.addRequest('data_deletion', 'user123', { reason: 'account closure' });
      requestTracker.addRequest('data_access', 'user123', { format: 'json' });

      const userRequests = requestTracker.getRequestsByUser('user123');
      expect(userRequests).toHaveLength(2);
      expect(userRequests[0].type).toBe('data_deletion');
      expect(userRequests[1].type).toBe('data_access');

      requestTracker.updateRequestStatus(userRequests[0].id, 'completed');
      expect(userRequests[0].status).toBe('completed');
    });

    test('should generate request reports', () => {
      const generateReport = (requests: any[]) => {
        const report = {
          totalRequests: requests.length,
          byType: {},
          byStatus: {},
          timeline: []
        };

        requests.forEach(req => {
          report.byType[req.type] = (report.byType[req.type] || 0) + 1;
          report.byStatus[req.status] = (report.byStatus[req.status] || 0) + 1;
          report.timeline.push({
            date: req.timestamp.split('T')[0],
            count: 1
          });
        });

        return report;
      };

      const mockRequests = [
        { type: 'data_deletion', status: 'completed', timestamp: '2024-01-01T10:00:00Z' },
        { type: 'data_access', status: 'pending', timestamp: '2024-01-02T10:00:00Z' },
        { type: 'data_deletion', status: 'completed', timestamp: '2024-01-03T10:00:00Z' }
      ];

      const report = generateReport(mockRequests);
      expect(report.totalRequests).toBe(3);
      expect(report.byType['data_deletion']).toBe(2);
      expect(report.byType['data_access']).toBe(1);
      expect(report.byStatus['completed']).toBe(2);
      expect(report.byStatus['pending']).toBe(1);
    });

    test('should handle request expiration', () => {
      const checkRequestExpiration = (requests: any[]) => {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        return requests.map(req => {
          const requestDate = new Date(req.timestamp);
          const isExpired = requestDate < thirtyDaysAgo;
          return {
            ...req,
            isExpired,
            daysSinceRequest: Math.floor((now.getTime() - requestDate.getTime()) / (24 * 60 * 60 * 1000))
          };
        });
      };

      const mockRequests = [
        { id: '1', timestamp: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '2', timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() }
      ];

      const processedRequests = checkRequestExpiration(mockRequests);
      expect(processedRequests[0].isExpired).toBe(true);
      expect(processedRequests[1].isExpired).toBe(false);
      expect(processedRequests[0].daysSinceRequest).toBeGreaterThan(30);
    });
  });

  describe('Education: Module Loading', () => {
    test('should load educational modules correctly', () => {
      const moduleLoader = {
        modules: new Map(),
        loadModule: function(moduleId: string, ageGroup: string) {
          const moduleData = {
            'privacy-basics': {
              title: 'Privacy Basics',
              content: 'Learn the fundamentals of online privacy',
              ageGroups: ['5-8', '9-12', '13-17'],
              duration: 15,
              activities: ['quiz', 'interactive-story']
            },
            'data-protection': {
              title: 'Data Protection',
              content: 'Understanding how to protect your personal data',
              ageGroups: ['9-12', '13-17'],
              duration: 20,
              activities: ['simulation', 'worksheet']
            }
          };

          const module = moduleData[moduleId as keyof typeof moduleData];
          if (module && module.ageGroups.includes(ageGroup)) {
            this.modules.set(moduleId, { ...module, loadedAt: new Date().toISOString() });
            return module;
          }
          return null;
        },
        getLoadedModules: function() {
          return Array.from(this.modules.values());
        }
      };

      const module1 = moduleLoader.loadModule('privacy-basics', '9-12');
      expect(module1).toBeDefined();
      expect(module1.title).toBe('Privacy Basics');
      expect(module1.ageGroups).toContain('9-12');

      const module2 = moduleLoader.loadModule('data-protection', '5-8');
      expect(module2).toBeNull(); // Not available for age group 5-8

      const loadedModules = moduleLoader.getLoadedModules();
      expect(loadedModules).toHaveLength(1);
    });

    test('should validate module prerequisites', () => {
      const checkPrerequisites = (moduleId: string, userProgress: any) => {
        const prerequisites = {
          'advanced-privacy': ['privacy-basics', 'data-protection'],
          'cybersecurity': ['privacy-basics'],
          'digital-citizenship': ['privacy-basics', 'data-protection', 'advanced-privacy']
        };

        const requiredModules = prerequisites[moduleId as keyof typeof prerequisites] || [];
        const completedModules = userProgress.completedModules || [];

        return requiredModules.every(module => completedModules.includes(module));
      };

      const userProgress1 = { completedModules: ['privacy-basics', 'data-protection'] };
      const userProgress2 = { completedModules: ['privacy-basics'] };

      expect(checkPrerequisites('advanced-privacy', userProgress1)).toBe(true);
      expect(checkPrerequisites('advanced-privacy', userProgress2)).toBe(false);
      expect(checkPrerequisites('cybersecurity', userProgress2)).toBe(true);
    });

    test('should track module completion', () => {
      const trackCompletion = (moduleId: string, userId: string, score: number) => {
        const completion = {
          moduleId,
          userId,
          score,
          completedAt: new Date().toISOString(),
          timeSpent: Math.floor(Math.random() * 30) + 10 // 10-40 minutes
        };

        // Save to localStorage
        const key = `module-completion-${userId}`;
        const existing = JSON.parse(localStorageMock.getItem(key) || '[]');
        existing.push(completion);
        localStorageMock.setItem(key, JSON.stringify(existing));

        return completion;
      };

      const completion = trackCompletion('privacy-basics', 'user123', 85);
      expect(completion.moduleId).toBe('privacy-basics');
      expect(completion.userId).toBe('user123');
      expect(completion.score).toBe(85);
      expect(completion.completedAt).toBeDefined();
      expect(completion.timeSpent).toBeGreaterThan(0);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'module-completion-user123',
        expect.stringContaining('"moduleId":"privacy-basics"')
      );
    });
  });

  describe('Education: Progress Saving', () => {
    test('should save user progress correctly', () => {
      const saveProgress = (userId: string, progress: any) => {
        const progressData = {
          userId,
          ...progress,
          lastSaved: new Date().toISOString(),
          version: '1.0'
        };

        localStorageMock.setItem(`progress-${userId}`, JSON.stringify(progressData));
        return progressData;
      };

      const progress = {
        currentModule: 'privacy-basics',
        completedModules: ['intro'],
        xp: 150,
        achievements: ['first-step'],
        streak: 3
      };

      const savedProgress = saveProgress('user123', progress);
      expect(savedProgress.userId).toBe('user123');
      expect(savedProgress.currentModule).toBe('privacy-basics');
      expect(savedProgress.xp).toBe(150);
      expect(savedProgress.lastSaved).toBeDefined();

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'progress-user123',
        expect.stringContaining('"xp":150')
      );
    });

    test('should auto-save progress periodically', () => {
      const autoSaveManager = {
        saveInterval: 30000, // 30 seconds
        lastSave: 0,
        pendingChanges: false,
        
        markChanged: function() {
          this.pendingChanges = true;
        },
        
        shouldAutoSave: function() {
          const now = Date.now();
          return this.pendingChanges && (now - this.lastSave) >= this.saveInterval;
        },
        
        autoSave: function(userId: string, progress: any) {
          if (this.shouldAutoSave()) {
            this.saveProgress(userId, progress);
            this.lastSave = Date.now();
            this.pendingChanges = false;
            return true;
          }
          return false;
        },
        
        saveProgress: function(userId: string, progress: any) {
          localStorageMock.setItem(`autosave-${userId}`, JSON.stringify({
            ...progress,
            autoSavedAt: new Date().toISOString()
          }));
        }
      };

      autoSaveManager.markChanged();
      autoSaveManager.lastSave = Date.now() - 35000; // 35 seconds ago

      const progress = { xp: 200, currentModule: 'advanced-privacy' };
      const saved = autoSaveManager.autoSave('user123', progress);
      
      expect(saved).toBe(true);
      expect(autoSaveManager.pendingChanges).toBe(false);
    });

    test('should handle progress conflicts', () => {
      const resolveProgressConflict = (localProgress: any, serverProgress: any) => {
        // Simple conflict resolution: use the most recent save
        const localTime = new Date(localProgress.lastSaved).getTime();
        const serverTime = new Date(serverProgress.lastSaved).getTime();
        
        if (serverTime > localTime) {
          return {
            ...serverProgress,
            conflictResolved: true,
            resolutionMethod: 'server-wins'
          };
        } else {
          return {
            ...localProgress,
            conflictResolved: true,
            resolutionMethod: 'local-wins'
          };
        }
      };

      const localProgress = {
        xp: 100,
        lastSaved: '2024-01-01T10:00:00Z'
      };

      const serverProgress = {
        xp: 150,
        lastSaved: '2024-01-01T11:00:00Z'
      };

      const resolved = resolveProgressConflict(localProgress, serverProgress);
      expect(resolved.xp).toBe(150);
      expect(resolved.resolutionMethod).toBe('server-wins');
      expect(resolved.conflictResolved).toBe(true);
    });
  });

  describe('Device Security: Platform-Specific Checklists', () => {
    test('should provide platform-specific security checklists', () => {
      const getSecurityChecklist = (platform: string) => {
        const checklists = {
          'ios': [
            'Enable Screen Time restrictions',
            'Set up Family Sharing',
            'Configure App Store restrictions',
            'Enable Find My iPhone',
            'Set up Screen Time passcode',
            'Review app permissions'
          ],
          'android': [
            'Enable Google Family Link',
            'Set up parental controls',
            'Configure app permissions',
            'Enable location services',
            'Set up device administrator',
            'Review Google Play restrictions'
          ],
          'windows': [
            'Set up Microsoft Family Safety',
            'Configure Windows Defender',
            'Enable parental controls',
            'Set up user accounts',
            'Configure browser settings',
            'Install security software'
          ],
          'macos': [
            'Enable Screen Time',
            'Set up Family Sharing',
            'Configure parental controls',
            'Enable Find My Mac',
            'Set up user accounts',
            'Configure Safari restrictions'
          ]
        };

        return checklists[platform as keyof typeof checklists] || [];
      };

      const iosChecklist = getSecurityChecklist('ios');
      expect(iosChecklist).toContain('Enable Screen Time restrictions');
      expect(iosChecklist).toContain('Set up Family Sharing');
      expect(iosChecklist).toContain('Enable Find My iPhone');

      const androidChecklist = getSecurityChecklist('android');
      expect(androidChecklist).toContain('Enable Google Family Link');
      expect(androidChecklist).toContain('Set up parental controls');

      const unknownPlatform = getSecurityChecklist('unknown');
      expect(unknownPlatform).toHaveLength(0);
    });

    test('should track checklist completion', () => {
      const checklistTracker = {
        completedItems: new Set(),
        
        markComplete: function(item: string) {
          this.completedItems.add(item);
        },
        
        isComplete: function(item: string) {
          return this.completedItems.has(item);
        },
        
        getCompletionPercentage: function(totalItems: number) {
          return (this.completedItems.size / totalItems) * 100;
        },
        
        getRemainingItems: function(allItems: string[]) {
          return allItems.filter(item => !this.completedItems.has(item));
        }
      };

      const iosChecklist = [
        'Enable Screen Time restrictions',
        'Set up Family Sharing',
        'Configure App Store restrictions'
      ];

      checklistTracker.markComplete('Enable Screen Time restrictions');
      checklistTracker.markComplete('Set up Family Sharing');

      expect(checklistTracker.isComplete('Enable Screen Time restrictions')).toBe(true);
      expect(checklistTracker.isComplete('Configure App Store restrictions')).toBe(false);
      expect(checklistTracker.getCompletionPercentage(iosChecklist.length)).toBe(66.67);
      
      const remaining = checklistTracker.getRemainingItems(iosChecklist);
      expect(remaining).toHaveLength(1);
      expect(remaining[0]).toBe('Configure App Store restrictions');
    });

    test('should validate security settings', () => {
      const validateSecuritySettings = (platform: string, settings: any) => {
        const validators = {
          'ios': {
            screenTimeEnabled: (val: boolean) => val === true,
            familySharingEnabled: (val: boolean) => val === true,
            appStoreRestrictions: (val: boolean) => val === true
          },
          'android': {
            familyLinkEnabled: (val: boolean) => val === true,
            parentalControlsEnabled: (val: boolean) => val === true,
            locationServicesEnabled: (val: boolean) => val === true
          }
        };

        const validator = validators[platform as keyof typeof validators];
        if (!validator) {return { valid: false, errors: ['Unknown platform'] };}

        const errors = [];
        for (const [key, validate] of Object.entries(validator)) {
          if (!validate(settings[key])) {
            errors.push(`${key} is not properly configured`);
          }
        }

        return {
          valid: errors.length === 0,
          errors
        };
      };

      const iosSettings = {
        screenTimeEnabled: true,
        familySharingEnabled: true,
        appStoreRestrictions: true
      };

      const androidSettings = {
        familyLinkEnabled: true,
        parentalControlsEnabled: false,
        locationServicesEnabled: true
      };

      const iosValidation = validateSecuritySettings('ios', iosSettings);
      expect(iosValidation.valid).toBe(true);
      expect(iosValidation.errors).toHaveLength(0);

      const androidValidation = validateSecuritySettings('android', androidSettings);
      expect(androidValidation.valid).toBe(false);
      expect(androidValidation.errors).toContain('parentalControlsEnabled is not properly configured');
    });
  });

  describe('Emergency Kit: Scenario Coverage', () => {
    test('should cover all emergency scenarios', () => {
      const emergencyScenarios = {
        'cyberbullying': {
          title: 'Cyberbullying Incident',
          severity: 'high',
          immediateActions: [
            'Document all evidence',
            'Block the perpetrator',
            'Report to platform',
            'Contact school if applicable'
          ],
          supportResources: [
            'National Suicide Prevention Lifeline',
            'Cyberbullying Research Center',
            'School counselor'
          ]
        },
        'privacy-breach': {
          title: 'Privacy Breach',
          severity: 'critical',
          immediateActions: [
            'Change all passwords',
            'Enable two-factor authentication',
            'Check for unauthorized access',
            'Review privacy settings'
          ],
          supportResources: [
            'Identity theft protection services',
            'Credit monitoring',
            'Legal consultation'
          ]
        },
        'online-exploitation': {
          title: 'Online Exploitation',
          severity: 'critical',
          immediateActions: [
            'Call 911 if immediate danger',
            'Contact CyberTipline',
            'Preserve all evidence',
            'Contact law enforcement'
          ],
          supportResources: [
            'National Center for Missing & Exploited Children',
            'Child advocacy centers',
            'Professional counseling'
          ]
        },
        'sexting-incident': {
          title: 'Sexting Incident',
          severity: 'high',
          immediateActions: [
            'Stop all communication',
            'Document evidence',
            'Report to platform',
            'Contact school administration'
          ],
          supportResources: [
            'School counselor',
            'Family therapist',
            'Legal consultation'
          ]
        },
        'identity-theft': {
          title: 'Identity Theft',
          severity: 'critical',
          immediateActions: [
            'Freeze credit reports',
            'File police report',
            'Contact financial institutions',
            'Monitor accounts'
          ],
          supportResources: [
            'Identity theft protection services',
            'Credit monitoring',
            'Legal consultation'
          ]
        }
      };

      const scenarioTypes = Object.keys(emergencyScenarios);
      expect(scenarioTypes).toContain('cyberbullying');
      expect(scenarioTypes).toContain('privacy-breach');
      expect(scenarioTypes).toContain('online-exploitation');
      expect(scenarioTypes).toContain('sexting-incident');
      expect(scenarioTypes).toContain('identity-theft');

      // Verify each scenario has required fields
      scenarioTypes.forEach(scenarioType => {
        const scenario = emergencyScenarios[scenarioType as keyof typeof emergencyScenarios];
        expect(scenario.title).toBeDefined();
        expect(scenario.severity).toBeDefined();
        expect(scenario.immediateActions).toBeDefined();
        expect(scenario.supportResources).toBeDefined();
        expect(scenario.immediateActions.length).toBeGreaterThan(0);
        expect(scenario.supportResources.length).toBeGreaterThan(0);
      });
    });

    test('should provide appropriate response based on severity', () => {
      const getResponsePlan = (scenarioType: string, severity: string) => {
        const responsePlans = {
          'critical': {
            immediateContact: ['911', 'CyberTipline', 'Law Enforcement'],
            timeframe: 'Immediate',
            escalation: 'High',
            documentation: 'Preserve all evidence'
          },
          'high': {
            immediateContact: ['Platform Support', 'School Administration'],
            timeframe: 'Within 24 hours',
            escalation: 'Medium',
            documentation: 'Document evidence'
          },
          'medium': {
            immediateContact: ['Platform Support'],
            timeframe: 'Within 48 hours',
            escalation: 'Low',
            documentation: 'Keep records'
          }
        };

        return responsePlans[severity as keyof typeof responsePlans];
      };

      const criticalResponse = getResponsePlan('online-exploitation', 'critical');
      expect(criticalResponse.immediateContact).toContain('911');
      expect(criticalResponse.timeframe).toBe('Immediate');
      expect(criticalResponse.escalation).toBe('High');

      const highResponse = getResponsePlan('cyberbullying', 'high');
      expect(highResponse.immediateContact).toContain('Platform Support');
      expect(highResponse.timeframe).toBe('Within 24 hours');
    });

    test('should track emergency response progress', () => {
      const emergencyTracker = {
        incidents: [],
        
        createIncident: function(scenarioType: string, userId: string, details: any) {
          const incident = {
            id: Date.now().toString(),
            scenarioType,
            userId,
            details,
            status: 'active',
            createdAt: new Date().toISOString(),
            actions: [],
            resources: []
          };
          
          this.incidents.push(incident);
          return incident;
        },
        
        addAction: function(incidentId: string, action: string, completed: boolean = false) {
          const incident = this.incidents.find(i => i.id === incidentId);
          if (incident) {
            incident.actions.push({
              action,
              completed,
              timestamp: new Date().toISOString()
            });
          }
        },
        
        addResource: function(incidentId: string, resource: string) {
          const incident = this.incidents.find(i => i.id === incidentId);
          if (incident) {
            incident.resources.push(resource);
          }
        },
        
        getIncidentStatus: function(incidentId: string) {
          const incident = this.incidents.find(i => i.id === incidentId);
          if (!incident) {return null;}
          
          const completedActions = incident.actions.filter(a => a.completed).length;
          const totalActions = incident.actions.length;
          
          return {
            ...incident,
            progress: totalActions > 0 ? (completedActions / totalActions) * 100 : 0
          };
        }
      };

      const incident = emergencyTracker.createIncident('cyberbullying', 'user123', {
        platform: 'Instagram',
        perpetrator: 'unknown',
        evidence: 'screenshots'
      });

      emergencyTracker.addAction(incident.id, 'Document evidence', true);
      emergencyTracker.addAction(incident.id, 'Block perpetrator', false);
      emergencyTracker.addResource(incident.id, 'School counselor');

      const status = emergencyTracker.getIncidentStatus(incident.id);
      expect(status.scenarioType).toBe('cyberbullying');
      expect(status.actions).toHaveLength(2);
      expect(status.resources).toHaveLength(1);
      expect(status.progress).toBe(50);
    });
  });

  describe('Monitoring: Alert Display', () => {
    test('should display alerts correctly', () => {
      const alertSystem = {
        alerts: [],
        
        createAlert: function(type: string, message: string, severity: string, userId: string) {
          const alert = {
            id: Date.now().toString(),
            type,
            message,
            severity,
            userId,
            timestamp: new Date().toISOString(),
            read: false,
            dismissed: false
          };
          
          this.alerts.push(alert);
          return alert;
        },
        
        getAlertsForUser: function(userId: string) {
          return this.alerts.filter(alert => 
            alert.userId === userId && !alert.dismissed
          );
        },
        
        markAsRead: function(alertId: string) {
          const alert = this.alerts.find(a => a.id === alertId);
          if (alert) {
            alert.read = true;
          }
        },
        
        dismissAlert: function(alertId: string) {
          const alert = this.alerts.find(a => a.id === alertId);
          if (alert) {
            alert.dismissed = true;
          }
        }
      };

      const alert1 = alertSystem.createAlert(
        'privacy_breach',
        'Unusual login detected from new location',
        'high',
        'user123'
      );

      const alert2 = alertSystem.createAlert(
        'app_permission',
        'App requesting camera permission',
        'medium',
        'user123'
      );

      const userAlerts = alertSystem.getAlertsForUser('user123');
      expect(userAlerts).toHaveLength(2);
      expect(userAlerts[0].type).toBe('privacy_breach');
      expect(userAlerts[0].severity).toBe('high');

      alertSystem.markAsRead(alert1.id);
      expect(alertSystem.alerts[0].read).toBe(true);

      alertSystem.dismissAlert(alert2.id);
      const remainingAlerts = alertSystem.getAlertsForUser('user123');
      expect(remainingAlerts).toHaveLength(1);
    });

    test('should prioritize alerts by severity', () => {
      const prioritizeAlerts = (alerts: any[]) => {
        const severityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
        
        return alerts.sort((a, b) => {
          const aSeverity = severityOrder[a.severity as keyof typeof severityOrder] || 0;
          const bSeverity = severityOrder[b.severity as keyof typeof severityOrder] || 0;
          
          if (aSeverity !== bSeverity) {
            return bSeverity - aSeverity; // Higher severity first
          }
          
          // If same severity, sort by timestamp (newest first)
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
      };

      const alerts = [
        { id: '1', severity: 'medium', timestamp: '2024-01-01T10:00:00Z' },
        { id: '2', severity: 'critical', timestamp: '2024-01-01T09:00:00Z' },
        { id: '3', severity: 'high', timestamp: '2024-01-01T11:00:00Z' },
        { id: '4', severity: 'low', timestamp: '2024-01-01T12:00:00Z' }
      ];

      const prioritized = prioritizeAlerts(alerts);
      expect(prioritized[0].severity).toBe('critical');
      expect(prioritized[1].severity).toBe('high');
      expect(prioritized[2].severity).toBe('medium');
      expect(prioritized[3].severity).toBe('low');
    });

    test('should handle alert notifications', () => {
      const notificationManager = {
        notifications: [],
        
        sendNotification: function(alert: any) {
          const notification = {
            id: alert.id,
            title: this.getNotificationTitle(alert.type),
            body: alert.message,
            icon: this.getNotificationIcon(alert.severity),
            timestamp: new Date().toISOString(),
            delivered: false
          };
          
          this.notifications.push(notification);
          return notification;
        },
        
        getNotificationTitle: function(type: string) {
          const titles = {
            'privacy_breach': 'Privacy Alert',
            'app_permission': 'Permission Request',
            'suspicious_activity': 'Security Alert',
            'data_access': 'Data Access Request'
          };
          return titles[type as keyof typeof titles] || 'Alert';
        },
        
        getNotificationIcon: function(severity: string) {
          const icons = {
            'critical': '🚨',
            'high': '⚠️',
            'medium': 'ℹ️',
            'low': '💡'
          };
          return icons[severity as keyof typeof icons] || 'ℹ️';
        },
        
        getUnreadNotifications: function() {
          return this.notifications.filter(n => !n.delivered);
        }
      };

      const alert = {
        id: 'alert123',
        type: 'privacy_breach',
        message: 'Unauthorized access detected',
        severity: 'critical'
      };

      const notification = notificationManager.sendNotification(alert);
      expect(notification.title).toBe('Privacy Alert');
      expect(notification.body).toBe('Unauthorized access detected');
      expect(notification.icon).toBe('🚨');

      const unreadNotifications = notificationManager.getUnreadNotifications();
      expect(unreadNotifications).toHaveLength(1);
    });
  });
});