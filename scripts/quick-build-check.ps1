# Quick Build Readiness Check
# Checks if everything is ready to build the release AAB

$ErrorActionPreference = "Continue"

Write-Host "Quick Build Readiness Check" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

$ready = $true
$warnings = @()

# Check web build
Write-Host "Checking web build..." -ForegroundColor Blue
if (Test-Path "dist\index.html") {
    Write-Host "  Web build exists" -ForegroundColor Green
} else {
    Write-Host "  Web build missing" -ForegroundColor Red
    $ready = $false
}

# Check Android sync
Write-Host "Checking Android sync..." -ForegroundColor Blue
if (Test-Path "android\app\src\main\assets\public\index.html") {
    Write-Host "  Android assets synced" -ForegroundColor Green
} else {
    Write-Host "  Android assets not synced" -ForegroundColor Red
    $ready = $false
}

# Check signing
Write-Host "Checking signing..." -ForegroundColor Blue
$keystoreExists = Test-Path "pandagarde-familyhub-key.jks"
$keystorePropsExists = Test-Path "android\keystore.properties"

if ($keystoreExists -and $keystorePropsExists) {
    Write-Host "  Signing configured" -ForegroundColor Green
} else {
    Write-Host "  Signing not set up" -ForegroundColor Red
    Write-Host "     Run: .\scripts\setup-signing-interactive.ps1" -ForegroundColor Yellow
    $ready = $false
}

# Check Java
Write-Host "Checking Java..." -ForegroundColor Blue
try {
    $null = java -version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Java found" -ForegroundColor Green
    } else {
        Write-Host "  Java not in PATH (may need Android Studio)" -ForegroundColor Yellow
        $warnings += "Java not in PATH"
    }
} catch {
    Write-Host "  Java not found - Android Studio may be needed" -ForegroundColor Yellow
    $warnings += "Java not found"
}

# Summary
Write-Host ""
Write-Host "==============================" -ForegroundColor Cyan
if ($ready -and $warnings.Count -eq 0) {
    Write-Host "Ready to build!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Run: .\scripts\build-android.ps1 release" -ForegroundColor Cyan
} elseif ($ready) {
    Write-Host "Ready to build (with warnings)" -ForegroundColor Yellow
    Write-Host ""
    foreach ($warning in $warnings) {
        Write-Host "  - $warning" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "You can try: .\scripts\build-android.ps1 release" -ForegroundColor Cyan
} else {
    Write-Host "Not ready to build" -ForegroundColor Red
    Write-Host ""
    Write-Host "Fix the issues above first" -ForegroundColor Yellow
}
