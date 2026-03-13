# Production Launch Checklist

Use this checklist to finalize and verify production launch for PandaGarde.

---

## 1. Environment & build

- [ ] **Environment variables** (for build and runtime as needed):
  - `VITE_SUPABASE_URL` – Supabase project URL (optional if not using Supabase)
  - `VITE_SUPABASE_ANON_KEY` – Supabase anon key (optional)
  - `VITE_GA4_MEASUREMENT_ID` – Google Analytics 4 (optional)
  - `VITE_SENTRY_DSN`, `VITE_SENTRY_ORG`, `VITE_SENTRY_PROJECT`, `VITE_SENTRY_AUTH_TOKEN` – Sentry (optional)
- [ ] **Build**: `npm ci && npm run build` succeeds.
- [ ] **Lint**: `npm run lint` passes.
- [ ] **Type check**: `npx tsc --noEmit` passes.

---

## 2. Supporting features (pre-launch)

- [x] **Footer**: Maryland (MODPA) link to EduSoluce Privacy Portal; © 2026.
- [x] **Service catalog**: MODPA/portal CTA; `src/config/portal.ts` for portal URLs.
- [x] **Digital Rights page**: MODPA module + “Maryland residents: exercise your rights” CTA with portal links.
- [x] **Privacy Policy**: “Maryland Residents (MODPA)” subsection and portal link.
- [ ] **Educator / parent pages**: Optional one-line MODPA + portal link (GetStartedPage, EducatorToolsPage, FamilyPrivacyGuidePage).
- [ ] **Family Hub**: Optional “Your rights” / Maryland (MODPA) + portal link in Settings or Legal (if applicable).

---

## 3. CI/CD (GitHub Actions)

- [ ] **Deploy workflow** (`.github/workflows/deploy.yml`): Trigger is manual (`workflow_dispatch`). Enable push to `main` when ready.
- [ ] **Secrets**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (and optional GA4, Sentry, `PRODUCTION_URL`, Slack) set in repo/organization.
- [ ] **Tests**: Workflow uses `npm run test --if-present` with `continue-on-error: true` so missing tests do not block deploy. Add tests when possible (see `tests/TESTING_README.md`).
- [ ] **Post-deploy**: Health check step is non-blocking (`continue-on-error: true`). Set `PRODUCTION_URL` for post-deploy curl if desired.

---

## 4. Security & compliance

- [ ] **No hardcoded secrets** in source (use env and secrets).
- [ ] **Privacy Policy** and **Terms** are up to date and linked from Footer.
- [ ] **Cookie / consent** banner or policy linked and compliant with intended regions (e.g. GDPR, MODPA).

---

## 5. Post-launch

- [ ] Verify production URL loads and key routes work (Home, Get Started, Digital Footprint, Service Catalog, Privacy Policy, Digital Rights).
- [ ] Confirm portal links (Maryland MODPA) open the correct EduSoluce portal pages.
- [ ] Monitor Sentry (or chosen tool) for errors; fix critical issues.
- [ ] Optional: Add Tier 1 tests per `tests/TESTING_QUICK_START.md` for critical paths.

---

## Portal URLs (single source)

Defined in `src/config/portal.ts`:

- **Data rights**: `https://portal.edusoluce.com/privacy/data-rights`
- **Opt-out**: `https://portal.edusoluce.com/privacy/data-rights?type=opt_out`

Use these constants across the app so a single change updates all MODPA/portal links.

---

*Last updated for production launch support. Align with `PANDAGARDE_FEATURES_VERIFICATION.md` and `edusoluceportal-monorepo/docs/MODPA_FEATURES_FOR_ALL.md` as needed.*
