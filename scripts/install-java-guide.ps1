# Java Installation Guide Script
# This script helps you install Java for Android signing

$ErrorActionPreference = "Continue"

Write-Host "Java Installation Guide" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# Check if Java is already installed
Write-Host "Checking for Java..." -ForegroundColor Blue
try {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Java is already installed!" -ForegroundColor Green
        Write-Host $javaVersion -ForegroundColor Gray
        Write-Host ""
        Write-Host "Verifying keytool..." -ForegroundColor Blue
        try {
            $keytoolVersion = keytool -version 2>&1 | Select-Object -First 1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "keytool is available!" -ForegroundColor Green
                Write-Host ""
                Write-Host "You can now run: .\scripts\setup-signing-from-env.ps1" -ForegroundColor Cyan
                exit 0
            }
        } catch {
            Write-Host "keytool not found, but Java is installed" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "Java is not installed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Java Installation Options:" -ForegroundColor Cyan
Write-Host ""

Write-Host "Option 1: Adoptium OpenJDK (Recommended)" -ForegroundColor Yellow
Write-Host "  1. Go to: https://adoptium.net/" -ForegroundColor White
Write-Host "  2. Click 'Download' for Windows x64" -ForegroundColor White
Write-Host "  3. Choose JDK 17 or later (LTS recommended)" -ForegroundColor White
Write-Host "  4. Download and run the installer" -ForegroundColor White
Write-Host "  5. During installation, check 'Add to PATH'" -ForegroundColor White
Write-Host "  6. Restart your terminal after installation" -ForegroundColor White
Write-Host ""

Write-Host "Option 2: Oracle JDK" -ForegroundColor Yellow
Write-Host "  1. Go to: https://www.oracle.com/java/technologies/downloads/" -ForegroundColor White
Write-Host "  2. Download JDK 17 or later for Windows" -ForegroundColor White
Write-Host "  3. Install and add to PATH manually" -ForegroundColor White
Write-Host ""

Write-Host "Option 3: Android Studio (Includes Java)" -ForegroundColor Yellow
Write-Host "  1. Go to: https://developer.android.com/studio" -ForegroundColor White
Write-Host "  2. Download and install Android Studio" -ForegroundColor White
Write-Host "  3. Java is included with Android Studio" -ForegroundColor White
Write-Host ""

Write-Host "After Installation:" -ForegroundColor Cyan
Write-Host "  1. Close and reopen your terminal" -ForegroundColor White
Write-Host "  2. Verify: java -version" -ForegroundColor White
Write-Host "  3. Verify: keytool -version" -ForegroundColor White
Write-Host "  4. Run: .\scripts\setup-signing-from-env.ps1" -ForegroundColor White
Write-Host ""

Write-Host "Quick Download Links:" -ForegroundColor Cyan
Write-Host "  Adoptium: https://adoptium.net/temurin/releases/?version=17" -ForegroundColor Blue
Write-Host "  Oracle: https://www.oracle.com/java/technologies/downloads/#java17" -ForegroundColor Blue
Write-Host "  Android Studio: https://developer.android.com/studio" -ForegroundColor Blue
Write-Host ""

