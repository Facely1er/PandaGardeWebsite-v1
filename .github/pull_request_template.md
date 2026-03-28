## Summary

<!-- Briefly describe what this PR changes and why. -->

---

## PR review checklist (blockers)

**If any blocker fails → reject the PR.**

### 1. System consistency (BLOCKER)

- [ ] Uses approved spacing scale (8px system only)
- [ ] No random Tailwind values (e.g. `p-[13px]`, `mt-[22px]`)
- [ ] Typography follows defined scale (no arbitrary sizes)
- [ ] Colors come from design tokens (no random hex values)
- [ ] Border radius consistent with system
- [ ] Shadows follow defined levels

### 2. Component enforcement (BLOCKER)

- [ ] Buttons use shared component (no inline styling)
- [ ] Cards follow standard structure (padding, header, content)
- [ ] Forms use consistent inputs, labels, validation
- [ ] No duplicate component patterns created
- [ ] Tables follow standard layout

> “Quick-built” one-off UI → reject immediately.

### 3. Layout & alignment (BLOCKER)

- [ ] Containers use standard max-width
- [ ] Section spacing consistent (no uneven gaps)
- [ ] Grid alignment correct (no misaligned columns)
- [ ] No overflow or clipped content
- [ ] Visual balance is correct (not left-heavy / right-broken)

### 4. Responsiveness (BLOCKER)

**Manually tested on mobile (small), tablet, and desktop:**

- [ ] No broken layouts
- [ ] Buttons usable on mobile
- [ ] Text readable (no overflow)
- [ ] Navigation works correctly

> If not tested → reject.

### 5. UI states (BLOCKER)

- [ ] Empty state exists (no blank screens)
- [ ] Loading state exists (skeleton / spinner)
- [ ] Error state exists (clear message)
- [ ] Success feedback exists where needed

> Blank UI → immediate rejection.

### 6. Real data / visual quality (CRITICAL)

- [ ] No fake / empty dashboards shipped
- [ ] Demo / seed data present if needed
- [ ] Content meaningful (not placeholder text)
- [ ] Screens look credible (enterprise-grade)

### 7. Accessibility (MANDATORY)

- [ ] Inputs have labels
- [ ] Focus states visible
- [ ] Contrast readable
- [ ] Buttons identifiable
- [ ] No click-only UI (keyboard possible)

### 8. Interaction quality

- [ ] Hover states exist (buttons, cards, links)
- [ ] Click feedback is clear
- [ ] No dead UI elements
- [ ] Transitions are smooth (not broken or missing)

### 9. Code quality (NO EXCUSES)

- [ ] No unused components
- [ ] No duplicated logic
- [ ] No inline styles replacing system
- [ ] No dead code
- [ ] Clean structure

---

## Testing notes

<!-- How you verified the above (devices, browsers, flows). -->

## Screenshots / recordings (if UI)

<!-- Optional: attach for visual changes. -->
