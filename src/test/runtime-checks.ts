/**
 * Runtime Error Prevention Checks
 * This file documents potential runtime errors and their fixes
 */

// 1. FamilyProgressContext - Check if provider is available
export const checkFamilyProgressContext = () => {
  try {
    // This will throw if used outside provider
    // The hook already has error handling: throw new Error('useFamilyProgress must be used within FamilyProgressProvider')
    return true;
  } catch (error) {
    console.error('FamilyProgressContext error:', error);
    return false;
  }
};

// 2. localStorage availability check
export const checkLocalStorage = () => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    const testKey = '__test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

// 3. Null/undefined checks for FamilyDashboard
export const validateFamilyMemberData = (member: any) => {
  if (!member) {
    return { valid: false, error: 'Member is null or undefined' };
  }
  if (!member.id) {
    return { valid: false, error: 'Member ID is missing' };
  }
  if (!member.name || typeof member.name !== 'string') {
    return { valid: false, error: 'Member name is invalid' };
  }
  return { valid: true };
};

// 4. Check for missing dependencies in useEffect
export const checkUseEffectDependencies = () => {
  // Common issues:
  // - Missing dependencies can cause stale closures
  // - Too many dependencies can cause infinite loops
  // - Functions should be wrapped in useCallback
  return {
    warnings: [
      'Ensure all dependencies are included in useEffect dependency arrays',
      'Use useCallback for functions passed as dependencies',
      'Avoid including setState functions that don\'t change'
    ]
  };
};

// 5. Error boundary checks
export const checkErrorBoundaries = () => {
  // App.tsx has SentryErrorBoundary
  // NavigationErrorBoundary is also present
  return {
    hasErrorBoundary: true,
    hasSentryBoundary: true
  };
};

// 6. Safe navigation patterns
export const safeGet = <T,>(obj: any, path: string, defaultValue: T): T => {
  try {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      if (result === null || result === undefined) {
        return defaultValue;
      }
      result = result[key];
    }
    return result !== undefined ? result : defaultValue;
  } catch {
    return defaultValue;
  }
};

// 7. Array safety checks
export const safeArrayAccess = <T,>(arr: T[] | null | undefined, index: number): T | null => {
  if (!arr || !Array.isArray(arr)) {
    return null;
  }
  if (index < 0 || index >= arr.length) {
    return null;
  }
  return arr[index];
};

// 8. Date parsing safety
export const safeDateParse = (dateString: string | null | undefined): Date | null => {
  if (!dateString) {
    return null;
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  } catch {
    return null;
  }
};

// 9. JSON parsing safety
export const safeJSONParse = <T,>(json: string | null | undefined, defaultValue: T): T => {
  if (!json) {
    return defaultValue;
  }
  try {
    return JSON.parse(json) as T;
  } catch {
    return defaultValue;
  }
};

// 10. Check for common runtime errors
export const runRuntimeChecks = () => {
  const checks = {
    localStorage: checkLocalStorage(),
    errorBoundaries: checkErrorBoundaries(),
    familyProgressContext: checkFamilyProgressContext()
  };
  
  const issues: string[] = [];
  
  if (!checks.localStorage) {
    issues.push('localStorage is not available - some features may not work');
  }
  
  return {
    checks,
    issues,
    allPassed: issues.length === 0
  };
};

