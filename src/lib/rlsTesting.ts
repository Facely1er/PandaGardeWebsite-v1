// Row Level Security (RLS) Testing Utility for PandaGarde
import { supabase, isSupabaseConfigured } from './supabase';

interface RLSTestResult {
  testName: string;
  passed: boolean;
  error?: string;
  details?: any;
}

interface RLSTestSuite {
  suiteName: string;
  results: RLSTestResult[];
  passed: number;
  failed: number;
  total: number;
}

// RLS Testing Service
export const rlsTestingService = {
  // Test user isolation
  async testUserIsolation(): Promise<RLSTestResult[]> {
    const results: RLSTestResult[] = [];
    
    if (!isSupabaseConfigured || !supabase) {
      results.push({
        testName: 'User Isolation Test',
        passed: false,
        error: 'Supabase not configured - cannot test RLS'
      });
      return results;
    }

    try {
      // Test 1: Users can only see their own data
      const { data: userData, error: userError } = await supabase
        .from('pandagarde_users')
        .select('*');

      if (userError) {
        results.push({
          testName: 'User Data Access',
          passed: false,
          error: `Failed to access user data: ${userError.message}`
        });
      } else {
        // Check if user can only see their own data
        const currentUser = await supabase.auth.getUser();
        const isOwnData = userData?.every(user => user.id === currentUser.data.user?.id);
        
        results.push({
          testName: 'User Data Access',
          passed: isOwnData || userData?.length === 0,
          details: {
            dataCount: userData?.length || 0,
            isOwnData,
            currentUserId: currentUser.data.user?.id
          }
        });
      }

      // Test 2: Activities isolation
      const { data: activityData, error: activityError } = await supabase
        .from('pandagarde_activities')
        .select('*');

      if (activityError) {
        results.push({
          testName: 'Activity Data Access',
          passed: false,
          error: `Failed to access activity data: ${activityError.message}`
        });
      } else {
        const currentUser = await supabase.auth.getUser();
        const isOwnActivities = activityData?.every(activity => activity.user_id === currentUser.data.user?.id);
        
        results.push({
          testName: 'Activity Data Access',
          passed: isOwnActivities || activityData?.length === 0,
          details: {
            dataCount: activityData?.length || 0,
            isOwnActivities,
            currentUserId: currentUser.data.user?.id
          }
        });
      }

      // Test 3: Progress isolation
      const { data: progressData, error: progressError } = await supabase
        .from('pandagarde_progress')
        .select('*');

      if (progressError) {
        results.push({
          testName: 'Progress Data Access',
          passed: false,
          error: `Failed to access progress data: ${progressError.message}`
        });
      } else {
        const currentUser = await supabase.auth.getUser();
        const isOwnProgress = progressData?.every(progress => progress.user_id === currentUser.data.user?.id);
        
        results.push({
          testName: 'Progress Data Access',
          passed: isOwnProgress || progressData?.length === 0,
          details: {
            dataCount: progressData?.length || 0,
            isOwnProgress,
            currentUserId: currentUser.data.user?.id
          }
        });
      }

    } catch (error) {
      results.push({
        testName: 'User Isolation Test',
        passed: false,
        error: `Test failed with error: ${error}`
      });
    }

    return results;
  },

  // Test anonymous access restrictions
  async testAnonymousAccess(): Promise<RLSTestResult[]> {
    const results: RLSTestResult[] = [];
    
    if (!isSupabaseConfigured || !supabase) {
      results.push({
        testName: 'Anonymous Access Test',
        passed: false,
        error: 'Supabase not configured - cannot test RLS'
      });
      return results;
    }

    try {
      // Sign out to test anonymous access
      await supabase.auth.signOut();

      // Test 1: Anonymous users cannot access user data
      const { data: userData, error: userError } = await supabase
        .from('pandagarde_users')
        .select('*');

      results.push({
        testName: 'Anonymous User Data Access',
        passed: !userData || userData.length === 0,
        details: {
          dataCount: userData?.length || 0,
          error: userError?.message
        }
      });

      // Test 2: Anonymous users cannot access activities
      const { data: activityData, error: activityError } = await supabase
        .from('pandagarde_activities')
        .select('*');

      results.push({
        testName: 'Anonymous Activity Data Access',
        passed: !activityData || activityData.length === 0,
        details: {
          dataCount: activityData?.length || 0,
          error: activityError?.message
        }
      });

      // Test 3: Anonymous users cannot access progress
      const { data: progressData, error: progressError } = await supabase
        .from('pandagarde_progress')
        .select('*');

      results.push({
        testName: 'Anonymous Progress Data Access',
        passed: !progressData || progressData.length === 0,
        details: {
          dataCount: progressData?.length || 0,
          error: progressError?.message
        }
      });

      // Test 4: Anonymous users can access public content (if any)
      const { data: publicData, error: publicError } = await supabase
        .from('pandagarde_search_content')
        .select('*')
        .eq('is_active', true);

      results.push({
        testName: 'Anonymous Public Content Access',
        passed: !publicError,
        details: {
          dataCount: publicData?.length || 0,
          error: publicError?.message
        }
      });

    } catch (error) {
      results.push({
        testName: 'Anonymous Access Test',
        passed: false,
        error: `Test failed with error: ${error}`
      });
    }

    return results;
  },

  // Test CRUD operations
  async testCRUDOperations(): Promise<RLSTestResult[]> {
    const results: RLSTestResult[] = [];
    
    if (!isSupabaseConfigured || !supabase) {
      results.push({
        testName: 'CRUD Operations Test',
        passed: false,
        error: 'Supabase not configured - cannot test RLS'
      });
      return results;
    }

    try {
      const currentUser = await supabase.auth.getUser();
      if (!currentUser.data.user) {
        results.push({
          testName: 'CRUD Operations Test',
          passed: false,
          error: 'No authenticated user for CRUD testing'
        });
        return results;
      }

      // Test CREATE operation
      const testActivity = {
        user_id: currentUser.data.user.id,
        activity_type: 'test_activity',
        activity_data: { test: true },
        completed_at: null
      };

      const { data: createdActivity, error: createError } = await supabase
        .from('pandagarde_activities')
        .insert(testActivity)
        .select()
        .single();

      results.push({
        testName: 'CREATE Activity',
        passed: !createError && createdActivity,
        details: {
          createdId: createdActivity?.id,
          error: createError?.message
        }
      });

      if (createdActivity) {
        // Test READ operation
        const { data: readActivity, error: readError } = await supabase
          .from('pandagarde_activities')
          .select('*')
          .eq('id', createdActivity.id)
          .single();

        results.push({
          testName: 'READ Activity',
          passed: !readError && readActivity,
          details: {
            readId: readActivity?.id,
            error: readError?.message
          }
        });

        // Test UPDATE operation
        const { data: updatedActivity, error: updateError } = await supabase
          .from('pandagarde_activities')
          .update({ activity_data: { test: true, updated: true } })
          .eq('id', createdActivity.id)
          .select()
          .single();

        results.push({
          testName: 'UPDATE Activity',
          passed: !updateError && updatedActivity,
          details: {
            updatedId: updatedActivity?.id,
            error: updateError?.message
          }
        });

        // Test DELETE operation
        const { error: deleteError } = await supabase
          .from('pandagarde_activities')
          .delete()
          .eq('id', createdActivity.id);

        results.push({
          testName: 'DELETE Activity',
          passed: !deleteError,
          details: {
            deletedId: createdActivity.id,
            error: deleteError?.message
          }
        });
      }

    } catch (error) {
      results.push({
        testName: 'CRUD Operations Test',
        passed: false,
        error: `Test failed with error: ${error}`
      });
    }

    return results;
  },

  // Test role-based access
  async testRoleBasedAccess(): Promise<RLSTestResult[]> {
    const results: RLSTestResult[] = [];
    
    if (!isSupabaseConfigured || !supabase) {
      results.push({
        testName: 'Role-Based Access Test',
        passed: false,
        error: 'Supabase not configured - cannot test RLS'
      });
      return results;
    }

    try {
      const currentUser = await supabase.auth.getUser();
      if (!currentUser.data.user) {
        results.push({
          testName: 'Role-Based Access Test',
          passed: false,
          error: 'No authenticated user for role testing'
        });
        return results;
      }

      // Get user profile to check role
      const { data: userProfile } = await supabase
        .from('pandagarde_users')
        .select('profile_data')
        .eq('id', currentUser.data.user.id)
        .single();

      const userRole = userProfile?.profile_data?.role;

      // Test parent-specific access
      if (userRole === 'parent') {
        // Parents should be able to access family-related data
        const { data: familyData, error: familyError } = await supabase
          .from('pandagarde_users')
          .select('*')
          .eq('profile_data->familyId', userProfile?.profile_data?.familyId);

        results.push({
          testName: 'Parent Family Data Access',
          passed: !familyError,
          details: {
            familyDataCount: familyData?.length || 0,
            error: familyError?.message
          }
        });
      }

      // Test child-specific restrictions
      if (userRole === 'child') {
        // Children should have limited access to certain operations
        const { data: restrictedData, error: restrictedError } = await supabase
          .from('pandagarde_contact_submissions')
          .select('*');

        results.push({
          testName: 'Child Restricted Data Access',
          passed: !restrictedData || restrictedData.length === 0,
          details: {
            dataCount: restrictedData?.length || 0,
            error: restrictedError?.message
          }
        });
      }

    } catch (error) {
      results.push({
        testName: 'Role-Based Access Test',
        passed: false,
        error: `Test failed with error: ${error}`
      });
    }

    return results;
  },

  // Run comprehensive RLS test suite
  async runFullRLSTestSuite(): Promise<RLSTestSuite> {
    const suiteName = 'Comprehensive RLS Test Suite';
    const results: RLSTestResult[] = [];

    console.log('Starting RLS test suite...');

    // Run all test categories
    const [
      userIsolationResults,
      anonymousAccessResults,
      crudResults,
      roleBasedResults
    ] = await Promise.all([
      this.testUserIsolation(),
      this.testAnonymousAccess(),
      this.testCRUDOperations(),
      this.testRoleBasedAccess()
    ]);

    results.push(...userIsolationResults);
    results.push(...anonymousAccessResults);
    results.push(...crudResults);
    results.push(...roleBasedResults);

    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    const total = results.length;

    const suite: RLSTestSuite = {
      suiteName,
      results,
      passed,
      failed,
      total
    };

    console.log(`RLS test suite completed: ${passed}/${total} tests passed`);
    
    // Log failed tests
    const failedTests = results.filter(r => !r.passed);
    if (failedTests.length > 0) {
      console.warn('Failed RLS tests:', failedTests);
    }

    return suite;
  },

  // Generate RLS test report
  generateTestReport(suite: RLSTestSuite): string {
    const report = `
# RLS Test Report

**Suite:** ${suite.suiteName}
**Date:** ${new Date().toISOString()}
**Results:** ${suite.passed}/${suite.total} tests passed

## Summary
- ✅ Passed: ${suite.passed}
- ❌ Failed: ${suite.failed}
- 📊 Success Rate: ${((suite.passed / suite.total) * 100).toFixed(1)}%

## Test Results

${suite.results.map(result => `
### ${result.testName}
- **Status:** ${result.passed ? '✅ PASSED' : '❌ FAILED'}
${result.error ? `- **Error:** ${result.error}` : ''}
${result.details ? `- **Details:** ${JSON.stringify(result.details, null, 2)}` : ''}
`).join('')}

## Recommendations

${suite.failed > 0 ? `
⚠️ **Security Issues Found**
- Review failed tests and fix RLS policies
- Ensure proper user isolation
- Verify role-based access controls
- Test edge cases and potential bypasses
` : `
✅ **All Tests Passed**
- RLS policies are working correctly
- User isolation is properly enforced
- Role-based access is functioning
- Consider adding more edge case tests
`}
`;

    return report;
  }
};

// Utility function to run RLS tests
export const runRLSTests = async (): Promise<RLSTestSuite> => {
  return await rlsTestingService.runFullRLSTestSuite();
};

// Utility function to generate and log test report
export const generateRLSReport = async (): Promise<string> => {
  const suite = await runRLSTests();
  const report = rlsTestingService.generateTestReport(suite);
  
  console.log(report);
  return report;
};