# iOS App Setup Guide

This folder contains the iOS native app configuration for Privacy Panda Family Hub.

## Prerequisites

- macOS with Xcode installed (latest version recommended)
- CocoaPods installed: `sudo gem install cocoapods`
- Node.js and npm installed
- Capacitor CLI installed: `npm install -g @capacitor/cli`

## Initial Setup

### 1. Install iOS Platform

If you haven't already added the iOS platform:

```bash
npm install @capacitor/ios
npx cap add ios
```

### 2. Install Dependencies

```bash
cd ios/App
pod install
```

### 3. Sync Web Assets

After building your web app:

```bash
npm run build
npx cap sync ios
```

## Building the App

### Open in Xcode

```bash
npx cap open ios
```

Or manually open:
```
ios/App/App.xcworkspace
```

**Important**: Always open the `.xcworkspace` file, not the `.xcodeproj` file when using CocoaPods.

### Build and Run

1. Select your target device or simulator in Xcode
2. Click the Run button (⌘R) or go to Product > Run
3. The app will build and launch on your selected device/simulator

## App Store Submission

### 1. Configure App Identifier

- Open Xcode
- Select the App target
- Go to Signing & Capabilities
- Set your Team and Bundle Identifier (e.g., `com.pandagarde.familyhub`)

### 2. Configure App Icons

- Add app icons to `App/Assets.xcassets/AppIcon.appiconset`
- Required sizes:
  - 20x20pt (@2x, @3x)
  - 29x29pt (@2x, @3x)
  - 40x40pt (@2x, @3x)
  - 60x60pt (@2x, @3x)
  - 1024x1024pt (App Store)

### 3. Configure Launch Screen

- Update `LaunchScreen.storyboard` or create launch images
- Ensure it matches your app's branding

### 4. Build for App Store

1. In Xcode, select "Any iOS Device" or "Generic iOS Device"
2. Go to Product > Archive
3. Once archived, click "Distribute App"
4. Select "App Store Connect"
5. Follow the distribution wizard

### 5. Upload to App Store Connect

- Use Xcode Organizer or Transporter app
- Upload the `.ipa` file to App Store Connect
- Complete the App Store listing in App Store Connect

## Configuration Files

- `Podfile` - CocoaPods dependencies
- `App/App/Info.plist` - App configuration and permissions
- `App/Assets.xcassets/` - App icons and images
- `capacitor.config.ts` - Capacitor configuration (in project root)

## iOS-Specific Settings

Update `capacitor.config.ts` to include iOS-specific settings:

```typescript
ios: {
  contentInset: 'automatic',
  scrollEnabled: true,
  backgroundColor: '#16a34a'
}
```

## Troubleshooting

### Pod Install Issues

```bash
cd ios/App
pod deintegrate
pod install
```

### Build Errors

1. Clean build folder: Product > Clean Build Folder (⇧⌘K)
2. Delete Derived Data
3. Reinstall pods: `pod install`
4. Rebuild

### Sync Issues

```bash
npx cap sync ios --force
```

## Resources

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)

