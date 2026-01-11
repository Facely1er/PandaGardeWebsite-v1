# Prepare for Play Store Submission
# This script prepares everything possible before manual steps

$ErrorActionPreference = "Continue"

Write-Host "Preparing for Play Store Submission..." -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build web app
Write-Host "Step 1: Building web application..." -ForegroundColor Blue
if (Test-Path "dist\index.html") {
    Write-Host "  Web build already exists" -ForegroundColor Green
} else {
    Write-Host "  Building web app..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Web build complete" -ForegroundColor Green
    } else {
        Write-Host "  Web build failed!" -ForegroundColor Red
        exit 1
    }
}

# Step 2: Sync to Android
Write-Host ""
Write-Host "Step 2: Syncing to Android..." -ForegroundColor Blue
npx cap sync android
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Android sync complete" -ForegroundColor Green
} else {
    Write-Host "  Android sync failed!" -ForegroundColor Red
    exit 1
}

# Step 3: Check signing
Write-Host ""
Write-Host "Step 3: Checking signing setup..." -ForegroundColor Blue
$keystoreExists = Test-Path "pandagarde-familyhub-key.jks"
$keystorePropsExists = Test-Path "android\keystore.properties"

if ($keystoreExists -and $keystorePropsExists) {
    Write-Host "  Signing is configured" -ForegroundColor Green
} else {
    Write-Host "  Signing not set up yet" -ForegroundColor Yellow
    Write-Host "  Run: .\scripts\setup-signing-interactive.ps1" -ForegroundColor Cyan
}

# Step 4: Check icons
Write-Host ""
Write-Host "Step 4: Checking app icons..." -ForegroundColor Blue
$iconPath = "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png"
if (Test-Path $iconPath) {
    $iconSize = (Get-Item $iconPath).Length
    if ($iconSize -lt 50000) {
        Write-Host "  Icons need updating (still default)" -ForegroundColor Yellow
        Write-Host "  See: scripts\update-icons.md" -ForegroundColor Cyan
    } else {
        Write-Host "  Icons are configured" -ForegroundColor Green
    }
} else {
    Write-Host "  Icons missing" -ForegroundColor Red
}

# Step 5: Check Play Store assets
Write-Host ""
Write-Host "Step 5: Checking Play Store assets..." -ForegroundColor Blue
$assetsReady = $true
if (-not (Test-Path "play-store-icon-512.png")) {
    Write-Host "  App icon (512x512) not found" -ForegroundColor Yellow
    $assetsReady = $false
}
if (-not (Test-Path "play-store-feature-graphic-1024x500.png")) {
    Write-Host "  Feature graphic (1024x500) not found" -ForegroundColor Yellow
    $assetsReady = $false
}
if ($assetsReady) {
    Write-Host "  Play Store assets ready" -ForegroundColor Green
} else {
    Write-Host "  Play Store assets need to be created" -ForegroundColor Yellow
    Write-Host "  Run: .\scripts\prepare-play-store-assets.ps1" -ForegroundColor Cyan
}

# Summary
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$ready = $keystoreExists -and $keystorePropsExists

if ($ready) {
    Write-Host "Ready to build release AAB!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Update icons (if not done)" -ForegroundColor White
    Write-Host "2. Build: .\scripts\build-android.ps1 release" -ForegroundColor White
    Write-Host "3. Create Play Store assets" -ForegroundColor White
    Write-Host "4. Complete Play Console setup" -ForegroundColor White
} else {
    Write-Host "Almost ready! Remaining steps:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Set up signing:" -ForegroundColor Cyan
    Write-Host "   .\scripts\setup-signing-interactive.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Update icons:" -ForegroundColor Cyan
    Write-Host "   See: scripts\update-icons.md" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Build release AAB:" -ForegroundColor Cyan
    Write-Host "   .\scripts\build-android.ps1 release" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Create Play Store assets" -ForegroundColor Cyan
    Write-Host "5. Complete Play Console setup" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "See CONTINUE_HERE.md for detailed next steps" -ForegroundColor Gray

