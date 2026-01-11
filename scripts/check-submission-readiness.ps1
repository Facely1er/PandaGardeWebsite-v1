# Check Android Submission Readiness
# This script verifies what's ready and what's remaining

$ErrorActionPreference = "Continue"

Write-Host "🔍 Privacy Panda Family Hub - Submission Readiness Check" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

$ready = $true
$issues = @()

# Check 1: Web build
Write-Host "📦 Checking web build..." -ForegroundColor Blue
if (Test-Path "dist\index.html") {
    Write-Host "  ✅ Web build exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ Web build missing - run: npm run build" -ForegroundColor Red
    $ready = $false
    $issues += "Web build missing"
}

# Check 2: Android sync
Write-Host "📱 Checking Android sync..." -ForegroundColor Blue
if (Test-Path "android\app\src\main\assets\public\index.html") {
    Write-Host "  ✅ Android assets synced" -ForegroundColor Green
} else {
    Write-Host "  ❌ Android assets not synced - run: npx cap sync android" -ForegroundColor Red
    $ready = $false
    $issues += "Android assets not synced"
}

# Check 3: Keystore
Write-Host "🔐 Checking signing setup..." -ForegroundColor Blue
$keystoreExists = Test-Path "pandagarde-familyhub-key.jks"
$keystorePropsExists = Test-Path "android\keystore.properties"

if ($keystoreExists -and $keystorePropsExists) {
    Write-Host "  ✅ Signing configured" -ForegroundColor Green
} elseif ($keystoreExists -and -not $keystorePropsExists) {
    Write-Host "  ⚠️  Keystore exists but keystore.properties missing" -ForegroundColor Yellow
    $issues += "keystore.properties missing"
} else {
    Write-Host "  ❌ Signing not set up - run: .\scripts\setup-signing-interactive.ps1" -ForegroundColor Red
    $ready = $false
    $issues += "Signing not configured"
}

# Check 4: Icons
Write-Host "🎨 Checking app icons..." -ForegroundColor Blue
$iconPath = "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png"
if (Test-Path $iconPath) {
    # Check if it's still default Capacitor icon (small file size indicates default)
    $iconSize = (Get-Item $iconPath).Length
    if ($iconSize -lt 50000) {
        Write-Host "  ⚠️  Icons appear to be default - should update with Privacy Panda logo" -ForegroundColor Yellow
        $issues += "Icons need updating"
    } else {
        Write-Host "  ✅ Icons configured" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ Icons missing" -ForegroundColor Red
    $ready = $false
    $issues += "Icons missing"
}

# Check 5: Build configuration
Write-Host "⚙️  Checking build configuration..." -ForegroundColor Blue
if (Test-Path "android\app\build.gradle") {
    $buildGradle = Get-Content "android\app\build.gradle" -Raw
    if ($buildGradle -match "signingConfigs") {
        Write-Host "  ✅ Signing configuration in build.gradle" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Signing configuration missing from build.gradle" -ForegroundColor Yellow
        $issues += "Signing config missing from build.gradle"
    }
} else {
    Write-Host "  ❌ build.gradle missing" -ForegroundColor Red
    $ready = $false
    $issues += "build.gradle missing"
}

# Check 6: Java/Android Studio
Write-Host "☕ Checking Java/Android Studio..." -ForegroundColor Blue
try {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Java found" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Java not in PATH (may need Android Studio)" -ForegroundColor Yellow
        $issues += "Java not in PATH"
    }
} catch {
    Write-Host "  ⚠️  Java not found - Android Studio may be needed for building" -ForegroundColor Yellow
    $issues += "Java not found"
}

# Check 7: Play Store assets
Write-Host "📸 Checking Play Store assets..." -ForegroundColor Blue
$assetsReady = $true
if (-not (Test-Path "play-store-icon-512.png")) {
    Write-Host "  App icon 512x512 not found" -ForegroundColor Red
    $assetsReady = $false
    $issues += "Play Store icon missing"
}
if (-not (Test-Path "play-store-feature-graphic-1024x500.png")) {
    Write-Host "  Feature graphic 1024x500 not found" -ForegroundColor Red
    $assetsReady = $false
    $issues += "Feature graphic missing"
}
if ($assetsReady) {
    Write-Host "  ✅ Play Store assets ready" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Play Store assets need to be created" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "📊 Summary" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

if ($ready -and $assetsReady) {
    Write-Host "✅ Ready for Play Store submission!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Build release AAB: .\scripts\build-android.ps1 release" -ForegroundColor White
    Write-Host "2. Upload to Play Console" -ForegroundColor White
    Write-Host "3. Complete store listing" -ForegroundColor White
    Write-Host "4. Submit for review" -ForegroundColor White
} elseif ($ready) {
    Write-Host "✅ Technical setup complete!" -ForegroundColor Green
    Write-Host "⚠️  Play Store assets still needed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Remaining:" -ForegroundColor Cyan
    Write-Host "1. Create Play Store assets (icon, feature graphic, screenshots)" -ForegroundColor White
    Write-Host "2. Build release AAB: .\scripts\build-android.ps1 release" -ForegroundColor White
    Write-Host "3. Complete Play Console setup" -ForegroundColor White
} else {
    Write-Host "⚠️  Some setup still needed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Issues found:" -ForegroundColor Cyan
    foreach ($issue in $issues) {
        Write-Host "  • $issue" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "See ANDROID_SUBMISSION_COMPLETE.md for detailed steps" -ForegroundColor White
}

Write-Host ""
Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "  - ANDROID_SUBMISSION_COMPLETE.md - Complete guide" -ForegroundColor White
Write-Host "  - SUBMISSION_STATUS.md - Current status" -ForegroundColor White
Write-Host "  - PLAY_STORE_SUBMISSION_GUIDE.md - Detailed guide" -ForegroundColor White

