# Testing Quick Start Guide

## CRITICAL: Fix CI/CD First (Today - 15 min)

Your CI/CD pipeline is **BROKEN** because it expects tests but none are configured.

### Immediate Fix
1. Add this to `package.json` scripts section:
```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest --coverage"
}
```

2. This unblocks the pipeline temporarily while you implement tests.

---

## Phase 1: Setup Testing Framework (1-2 hours)

### 1. Install dependencies:
```bash
npm install --save-dev vitest @vitest/ui @vitest/coverage-v8
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev jsdom @vitest/environment-jsdom
```

### 2. Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: ['node_modules/', 'src/test/'],
      lines: 80,
      functions: 80,
      branches: 80
    }
  }
})
```

### 3. Create `src/test/setup.ts`:
```typescript
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

afterEach(() => cleanup())

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })
```

### 4. Test the setup:
```bash
npm run test
```

---

## Phase 2: Write Critical Tests (Priority Order)

### Tier 1 - MUST TEST BEFORE PRODUCTION (50 hours)

#### 1. Security Tests (3-4 hours)
**File**: `src/lib/htmlSanitizer.test.ts`
```typescript
import { describe, it, expect } from 'vitest'
import { sanitizeHtml } from './htmlSanitizer'

describe('sanitizeHtml', () => {
  it('should remove script tags', () => {
    const malicious = '<div>Test<script>alert("XSS")</script></div>'
    const result = sanitizeHtml(malicious)
    expect(result).not.toContain('<script>')
  })

  it('should remove event handlers', () => {
    const malicious = '<div onclick="alert()">Click</div>'
    const result = sanitizeHtml(malicious)
    expect(result).not.toContain('onclick')
  })

  it('should allow safe tags', () => {
    const safe = '<strong>Bold</strong> <em>Italic</em>'
    const result = sanitizeHtml(safe)
    expect(result).toContain('strong')
    expect(result).toContain('em')
  })
})
```

#### 2. Progress Context Tests (4-5 hours)
**File**: `src/contexts/ProgressContext.test.tsx`
- Test activity completion marking
- Test progress calculation accuracy
- Test import/export functionality
- Test LocalStorage persistence

#### 3. Gamification System Tests (3-4 hours)
**File**: `src/utils/gamificationSystem.test.ts`
- Test XP calculations
- Test level progression
- Test achievement unlocking
- Test streak logic

#### 4. Age Verification Tests (2-3 hours)
**File**: `src/contexts/AgeVerificationContext.test.tsx`
- Test age gate enforcement
- Test LocalStorage manipulation prevention
- Test content filtering by age

#### 5. Activity Logic Tests (8-10 hours)
- **QuizActivity**: Scoring, validation, timing
- **DragDropActivity**: Drop detection, constraints
- **ColoringActivity**: Drawing, undo/redo
- Other activities: Matching, Memory, Maze, Word Search, Connect Dots

#### 6. LocalStorage Manager (2-3 hours)
**File**: `src/utils/localStorageManager.test.ts`
- Test save/load operations
- Test data corruption handling
- Test quota exceeded scenarios

---

## Useful Commands

```bash
# Run tests once
npm run test:run

# Run tests in watch mode (during development)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm run test -- htmlSanitizer.test.ts

# Run tests matching pattern
npm run test -- --grep "XSS"
```

---

## Test File Template

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ComponentOrFunction } from './path'

describe('ComponentOrFunction Name', () => {
  beforeEach(() => {
    // Setup
    vi.clearAllMocks()
  })

  it('should do something', () => {
    // Arrange
    const input = 'test'
    
    // Act
    const result = ComponentOrFunction(input)
    
    // Assert
    expect(result).toBe('expected output')
  })
})
```

---

## Recommended Test Structure

```
src/
├── __tests__/
│   ├── fixtures/        # Mock data
│   └── utils/           # Test helpers
├── lib/
│   ├── htmlSanitizer.ts
│   └── htmlSanitizer.test.ts
├── contexts/
│   ├── ProgressContext.tsx
│   └── ProgressContext.test.tsx
├── utils/
│   ├── gamificationSystem.ts
│   └── gamificationSystem.test.ts
└── test/
    └── setup.ts
```

---

## CI/CD Integration

Update `.github/workflows/deploy.yml`:

Change line 36 from:
```yaml
run: npm test
```

To:
```yaml
run: npm run test:run
```

And add coverage reporting:
```yaml
- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/coverage-final.json
```

---

## Getting Help

- Vitest Docs: https://vitest.dev
- Testing Library Docs: https://testing-library.com/react
- Example test patterns: See other .test.ts files

---

## Checklist

- [ ] Install dependencies
- [ ] Create vitest.config.ts
- [ ] Create src/test/setup.ts
- [ ] Write security tests (htmlSanitizer)
- [ ] Write ProgressContext tests
- [ ] Write gamification tests
- [ ] Write age verification tests
- [ ] Write activity component tests
- [ ] Setup CI/CD coverage reporting
- [ ] Achieve 80% coverage
- [ ] Document testing standards

---

## Coverage Goals

| Component | Target | Priority |
|-----------|--------|----------|
| Security code (htmlSanitizer) | 100% | CRITICAL |
| Context providers | 90% | CRITICAL |
| Utility services | 85% | HIGH |
| Activities | 80% | HIGH |
| UI Components | 70% | MEDIUM |
| Pages | 50% | LOW |

---

Total Estimated Effort: 2-3 weeks (85-110 hours) for comprehensive testing
Focus on Tier 1 tests first before production launch.
