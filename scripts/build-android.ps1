# Android Build Script for Privacy Panda Family Hub (PowerShell)
# This script automates the build process for Android

$ErrorActionPreference = "Stop"

Write-Host "🚀 Building Privacy Panda Family Hub for Android..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Build web app
Write-Host "📦 Step 1: Building web application..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Web build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Web build complete" -ForegroundColor Green
Write-Host ""

# Step 2: Sync to Android
Write-Host "🔄 Step 2: Syncing web assets to Android..." -ForegroundColor Blue
npx cap sync android

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Sync failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Sync complete" -ForegroundColor Green
Write-Host ""

# Step 3: Build Android
Write-Host "📱 Step 3: Building Android app..." -ForegroundColor Blue
Set-Location android

# Check if release or debug
$BuildType = $args[0]
if (-not $BuildType) {
    $BuildType = "debug"
}

if ($BuildType -eq "release") {
    Write-Host "Building RELEASE bundle (AAB)..." -ForegroundColor Yellow
    .\gradlew.bat bundleRelease
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Release bundle created!" -ForegroundColor Green
        Write-Host "Location: android\app\build\outputs\bundle\release\app-release.aab" -ForegroundColor Green
    }
} else {
    Write-Host "Building DEBUG APK..." -ForegroundColor Yellow
    .\gradlew.bat assembleDebug
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Debug APK created!" -ForegroundColor Green
        Write-Host "Location: android\app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor Green
    }
}

Set-Location ..

Write-Host ""
Write-Host "🎉 Build complete!" -ForegroundColor Green

