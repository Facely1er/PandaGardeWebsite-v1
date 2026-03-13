# PandaGarde Features Verification

Verification of planned MODPA/portal and related features in PandaGarde (PandaGardeWebsite-v1). Aligns with `edusoluceportal-monorepo/docs/MODPA_FEATURES_FOR_ALL.md`.

**Verification date:** March 2026

---

## 1. MODPA / Portal integration (planned, not yet implemented)

| Feature | Status | Location / Notes |
|--------|--------|------------------|
| **Digital Rights page – MODPA module** | ❌ Not implemented | `src/pages/DigitalRightsPage.tsx`: Has GDPR, CCPA, COPPA, International, Enforcement, Future. No MODPA module; no link to EduSoluce portal. |
| **Digital Rights page – portal CTA** | ❌ Not implemented | No `portal.edusoluce.com` or "Exercise your rights" link for Maryland/other residents. |
| **Footer – Maryland (MODPA) + portal link** | ❌ Not implemented | `src/components/Footer.tsx`: No "Maryland (MODPA)" or EduSoluce portal link. Footer has Privacy Policy, Terms, Cookies, Accessibility only. |
| **Privacy Policy – MODPA subsection** | ❌ Not implemented | `src/pages/PrivacyPolicyPage.tsx`: "Your Rights and Choices" exists; no MODPA subsection or portal link. |
| **Educator content – MODPA + portal** | ❌ Not implemented | `src/pages/EducatorToolsPage.tsx`: "Privacy law and digital rights education" only; no MODPA mention or portal link. |
| **Parent / Get Started – MODPA + portal** | ❌ Not implemented | GetStartedPage, FamilyPrivacyGuidePage, ParentToolkitPage, etc.: No MODPA line or portal link. |
| **Privacy Panda stories – MODPA** | ❌ Not implemented | Story/InteractiveStory pages exist; no MODPA sensitization (rights, opt-out, portal) in stories. |
| **Service catalog – MODPA/portal CTA** | ✅ Implemented | `ServiceCatalogPage.tsx`: MODPA section with "Maryland (MODPA) – Exercise your privacy rights" and links to `PRIVACY_PORTAL_URL` and `PRIVACY_PORTAL_OPT_OUT_URL`. `src/config/portal.ts` defines portal URLs. |
| **Family Hub app – Your rights / MODPA** | ❌ Not implemented | `family-hub/src`: No "Your rights", "Maryland (MODPA)", or portal link in Settings/Legal. |
| **Portal URL config** | ✅ Implemented | `src/config/portal.ts`: `PRIVACY_PORTAL_URL`, `PRIVACY_PORTAL_OPT_OUT_URL` for MODPA/portal links. |

---

## 2. Already implemented (no MODPA dependency)

| Feature | Status | Location |
|--------|--------|----------|
| **Digital Rights & Law page** | ✅ Implemented | `src/pages/DigitalRightsPage.tsx` – GDPR, CCPA, COPPA, International, Enforcement, Future. |
| **Footer – base links** | ✅ Implemented | `src/components/Footer.tsx` – Quick Links, Products, Curriculum, Support; Privacy/Terms/Cookies/Accessibility. |
| **Privacy Policy – Your Rights** | ✅ Implemented | `src/pages/PrivacyPolicyPage.tsx` – "Your Rights and Choices" / Access and Control (generic). |
| **Educator tools** | ✅ Implemented | `src/pages/EducatorToolsPage.tsx` – curricula, activities, assessments, digital rights education. |
| **Service catalog** | ✅ Implemented | `src/pages/ServiceCatalogPage.tsx`, `src/components/ServiceCatalog.tsx` – child services, categories, risk/exposure. |
| **Pilot 2026 page** | ✅ Implemented | `src/pages/PilotPage.tsx` – 2026 theme, key dates, green branding. |
| **Home pilot banner** | ✅ Implemented | `src/pages/HomePage.tsx` – "Join the PandaGarde Pilot 2026", green theme. |
| **Family Hub app – general** | ✅ Implemented | `family-hub/` – activities, privacy score, dashboard; no MODPA/rights/portal. |

---

## 3. Recommended next steps (to align with MODPA_FEATURES_FOR_ALL)

1. **Portal config**  
   Add `src/config/portal.ts` (or equivalent) with:
   - `PRIVACY_PORTAL_URL = 'https://portal.edusoluce.com/privacy/data-rights'`
   - Optional: `PRIVACY_PORTAL_OPT_OUT_URL` with `?type=opt_out`

2. **Digital Rights page**  
   - Add a MODPA (Maryland) law module (opt-out, access, timelines).  
   - Add a CTA/link: "Maryland residents: exercise your rights" → portal URL.

3. **Footer**  
   - Add "Maryland (MODPA)" with link to portal (use config).

4. **Privacy Policy**  
   - Add "Maryland Residents (MODPA)" subsection and portal link.

5. **Educator / parent / guides**  
   - One-line MODPA + portal link on EducatorToolsPage, GetStartedPage, FamilyPrivacyGuidePage (or Parent Toolkit).

6. **Service catalog**  
   - Short MODPA/rights line + "Exercise your rights" CTA linking to portal.

7. **Privacy Panda stories**  
   - Add MODPA sensitization (e.g. rights, opt-out, link to portal) in StoryPage/InteractiveStoryPage or educator notes.

8. **Family Hub app**  
   - In Settings or Legal: "Your rights" / "Maryland (MODPA)" with portal link (use same config if shared).

9. **Footer year**  
   - Update Footer "© 2025" to "© 2026" if desired.

---

## 4. Summary

- **MODPA/portal features:** None are implemented in PandaGarde yet; the checklist in Section 1 matches "Not yet" in `MODPA_FEATURES_FOR_ALL.md`.
- **Existing features:** Digital Rights page, Footer, Privacy Policy, Educator tools, Service catalog, Pilot 2026, and Family Hub are in place; they do not yet reference MODPA or the EduSoluce portal.

Use this document for implementation tracking and to update `MODPA_FEATURES_FOR_ALL.md` once each item is done.
