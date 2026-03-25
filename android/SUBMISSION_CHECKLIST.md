# Play Store Submission Checklist

## What's done (code-complete on branch `claude/android-play-store-ready-T42sV`)

- [x] Android project initialised (`android/`, Gradle, Capacitor 7)
- [x] App ID: `com.pandagarde.familyhub`
- [x] App name: `Privacy Panda Family Hub`
- [x] Capacitor config (`capacitor.config.ts`) — splash, HTTPS, minSdk 23, targetSdk 35
- [x] Release signing config in `android/app/build.gradle` (reads `keystore.properties`)
- [x] Network security config — cleartext disabled
- [x] All mipmap icon densities present (mdpi → xxxhdpi + anydpi adaptive)
- [x] Supabase auth — real `getSession` + `onAuthStateChange` replacing stub
- [x] Protected routes — `AuthGuard` redirects unauthenticated users to `/family-hub/login`
- [x] Login/signup page — email + password form with role selector
- [x] COPPA consent gate — child signup (age < 13) requires parent email, triggers
  `coppaComplianceManager.requestParentalConsent()` and redirects to pending consent page
- [x] `AgeVerificationContext` — zero-data mode for unverified under-13 users

---

## What you need to do before submitting

### 1. Set up Supabase (CRITICAL — without this auth won't work)

1. Create a project at https://supabase.com
2. In Supabase SQL editor run:
```sql
create table profiles (
  id uuid references auth.users primary key,
  email text,
  profile_data jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users can read own profile" on profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);
```
3. Create `.env` from `.env.example` and fill in your project URL and anon key
4. Enable Email auth in Supabase Auth settings

### 2. Create a keystore for signing

```bash
keytool -genkey -v \
  -keystore pandagarde.keystore \
  -alias pandagarde \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Then create `android/keystore.properties` (never commit this):
```properties
storeFile=../pandagarde.keystore
storePassword=YOUR_STORE_PASSWORD
keyAlias=pandagarde
keyPassword=YOUR_KEY_PASSWORD
```

**Keep the keystore file safe — you cannot update the app without it.**

### 3. Build the release AAB

```bash
# 1. Build the web app
npm run build

# 2. Sync to Android
npx cap sync android

# 3. Build the signed release bundle
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### 4. Create a privacy policy page

Required for all Play Store apps, especially children's apps.
Your privacy policy must say that the app collects minimal data and implements COPPA
parental consent for users under 13.

Host it at a public URL (e.g. `https://pandagarde.com/privacy`) and add that URL in
Play Console under "App content > Privacy policy".

### 5. Play Console store listing assets

| Asset | Size | Notes |
|-------|------|-------|
| App icon | 512 × 512 px PNG | Already set in Android res |
| Feature graphic | 1024 × 500 px JPG/PNG | Required for store listing |
| Phone screenshots | min 1280 × 720 px | Min 2, recommended 4–8 |

Tips for screenshots:
- Show the home/activities screen
- Show a quiz or game in action  
- Show the parent dashboard
- Show the privacy score / certificate

### 6. Play Console setup

1. Create app at https://play.google.com/console
2. Store listing:
   - **App name**: Privacy Panda Family Hub
   - **Short description** (80 chars): Help kids learn digital safety with fun interactive activities
   - **Category**: Education
3. **Content rating**: complete questionnaire → select that the app is directed at children
4. **Target audience**: ages 5–12 (this triggers Families policy review)
5. **Data safety form**: declare that you collect email address for account creation,
   that it's used for app functionality, and that you implement COPPA parental consent
6. Upload the `.aab` file to the Internal Testing track first to validate
7. After testing passes, promote to Production

### 7. Families policy requirements checklist

- [x] No advertising SDKs directed at children
- [x] COPPA parental consent flow for under-13 signups  
- [x] No cleartext HTTP traffic
- [ ] Privacy policy publicly accessible URL
- [ ] App reviewed by teacher/parent before submission (recommended)
- [ ] Families content rating: EVERYONE or EVERYONE 10+

---

## Build commands summary

```bash
# Dev
npm run dev

# Production build + sync
npm run build && npx cap sync android

# Open in Android Studio (for testing on device)
npx cap open android

# Release bundle
cd android && ./gradlew bundleRelease
```

## Key files

| File | Purpose |
|------|---------|
| `capacitor.config.ts` | App ID, splash screen, scheme |
| `android/app/build.gradle` | Version code/name, signing config |
| `android/app/src/main/AndroidManifest.xml` | Permissions, activity config |
| `android/app/src/main/res/values/strings.xml` | App name, package name |
| `android/keystore.properties` | Signing credentials (do not commit!) |
| `.env` | Supabase keys (do not commit!) |
