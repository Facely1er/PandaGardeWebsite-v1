# Complete Signing Setup Script
# This script helps you complete the signing setup process

$ErrorActionPreference = "Continue"

Write-Host "Complete Signing Setup" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""

# Check if keystore already exists
$keystorePath = "pandagarde-familyhub-key.jks"
$keystorePropsPath = "android\keystore.properties"

if (Test-Path $keystorePath) {
    Write-Host "Keystore file exists: $keystorePath" -ForegroundColor Green
} else {
    Write-Host "Keystore file not found: $keystorePath" -ForegroundColor Yellow
}

if (Test-Path $keystorePropsPath) {
    Write-Host "keystore.properties exists: $keystorePropsPath" -ForegroundColor Green
} else {
    Write-Host "keystore.properties not found: $keystorePropsPath" -ForegroundColor Yellow
}

Write-Host ""

# Check Java/keytool
Write-Host "Checking for Java/keytool..." -ForegroundColor Blue
try {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Java found" -ForegroundColor Green
    } else {
        Write-Host "Java not in PATH" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Java not found - Android Studio may be needed" -ForegroundColor Yellow
}

Write-Host ""

# Provide setup options
Write-Host "Setup Options:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: Interactive Setup (Recommended)" -ForegroundColor Yellow
Write-Host "  Run: .\scripts\setup-signing-simple.ps1" -ForegroundColor White
Write-Host "  This will prompt you for all required information" -ForegroundColor Gray
Write-Host ""

Write-Host "Option 2: Non-Interactive Setup (Using Config File)" -ForegroundColor Yellow
Write-Host "  1. Copy keystore-config.example.txt to keystore-config.txt" -ForegroundColor White
Write-Host "  2. Fill in your values in keystore-config.txt" -ForegroundColor White
Write-Host "  3. Run: .\scripts\setup-signing-from-env.ps1" -ForegroundColor White
Write-Host ""

Write-Host "Option 3: Non-Interactive Setup (Using Environment Variables)" -ForegroundColor Yellow
Write-Host "  Set these environment variables:" -ForegroundColor White
Write-Host "    `$env:KEYSTORE_PASSWORD = 'your-password'" -ForegroundColor Gray
Write-Host "    `$env:KEY_PASSWORD = 'your-password'" -ForegroundColor Gray
Write-Host "    `$env:KEYSTORE_NAME = 'Your Name'" -ForegroundColor Gray
Write-Host "    `$env:KEYSTORE_ORG = 'PandaGarde'" -ForegroundColor Gray
Write-Host "    `$env:KEYSTORE_CITY = 'Your City'" -ForegroundColor Gray
Write-Host "    `$env:KEYSTORE_STATE = 'Your State'" -ForegroundColor Gray
Write-Host "    `$env:KEYSTORE_COUNTRY = 'US'" -ForegroundColor Gray
Write-Host "  Then run: .\scripts\setup-signing-from-env.ps1" -ForegroundColor White
Write-Host ""

Write-Host "Option 4: Manual Setup" -ForegroundColor Yellow
Write-Host "  See: scripts\setup-signing.md" -ForegroundColor White
Write-Host ""

if ((Test-Path $keystorePath) -and (Test-Path $keystorePropsPath)) {
    Write-Host "Signing appears to be configured!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Verify signing works: .\scripts\quick-build-check.ps1" -ForegroundColor White
    Write-Host "2. Build release AAB: .\scripts\build-android.ps1 release" -ForegroundColor White
} else {
    Write-Host "Signing setup is incomplete." -ForegroundColor Yellow
    Write-Host "Choose one of the options above to complete setup." -ForegroundColor Yellow
}

