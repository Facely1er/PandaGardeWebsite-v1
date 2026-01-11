# Install Java JDK for Android Signing
# This script helps install Java JDK on Windows

$ErrorActionPreference = "Continue"

Write-Host "Java JDK Installation Helper" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

# Check if Java is already installed
Write-Host "Checking for existing Java installation..." -ForegroundColor Blue
try {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Java is already installed!" -ForegroundColor Green
        Write-Host $javaVersion -ForegroundColor Green
        Write-Host ""
        Write-Host "Verifying keytool..." -ForegroundColor Blue
        try {
            $keytoolVersion = keytool -version 2>&1 | Select-Object -First 1
            Write-Host "keytool is available!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Java setup is complete. You can now run:" -ForegroundColor Green
            Write-Host "  .\scripts\setup-signing-from-env.ps1" -ForegroundColor Cyan
            exit 0
        } catch {
            Write-Host "Java found but keytool not in PATH" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "Java not found in PATH" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Java JDK Installation Options:" -ForegroundColor Cyan
Write-Host ""

Write-Host "Option 1: Download and Install Manually (Recommended)" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Download Java JDK:" -ForegroundColor White
Write-Host "   - Adoptium (OpenJDK): https://adoptium.net/temurin/releases/" -ForegroundColor Gray
Write-Host "   - Oracle JDK: https://www.oracle.com/java/technologies/downloads/" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Choose:" -ForegroundColor White
Write-Host "   - Version: JDK 17 or later" -ForegroundColor Gray
Write-Host "   - Platform: Windows x64" -ForegroundColor Gray
Write-Host "   - Package: JDK (not JRE)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Install:" -ForegroundColor White
Write-Host "   - Run the installer" -ForegroundColor Gray
Write-Host "   - Follow installation wizard" -ForegroundColor Gray
Write-Host "   - Make sure to add Java to PATH (usually automatic)" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Verify:" -ForegroundColor White
Write-Host "   java -version" -ForegroundColor Gray
Write-Host "   keytool -version" -ForegroundColor Gray
Write-Host ""

Write-Host "Option 2: Install via Chocolatey (If you have Chocolatey)" -ForegroundColor Yellow
Write-Host ""
Write-Host "If you have Chocolatey package manager:" -ForegroundColor White
Write-Host "  choco install openjdk17" -ForegroundColor Gray
Write-Host "  Or: choco install temurin17-jdk" -ForegroundColor Gray
Write-Host ""

Write-Host "Option 3: Install via Winget (Windows 11/10)" -ForegroundColor Yellow
Write-Host ""
Write-Host "If you have Windows Package Manager (winget):" -ForegroundColor White
Write-Host "  winget install Microsoft.OpenJDK.17" -ForegroundColor Gray
Write-Host "  Or: winget install EclipseAdoptium.Temurin.17.JDK" -ForegroundColor Gray
Write-Host ""

Write-Host "Option 4: Install Android Studio (Includes Java)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Android Studio includes Java JDK:" -ForegroundColor White
Write-Host "  1. Download: https://developer.android.com/studio" -ForegroundColor Gray
Write-Host "  2. Install Android Studio" -ForegroundColor Gray
Write-Host "  3. Java will be at: C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\jbr\" -ForegroundColor Gray
Write-Host ""

Write-Host "After Installation:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Close and reopen PowerShell/terminal" -ForegroundColor White
Write-Host "2. Verify Java is installed:" -ForegroundColor White
Write-Host "   java -version" -ForegroundColor Gray
Write-Host "3. Verify keytool is available:" -ForegroundColor White
Write-Host "   keytool -version" -ForegroundColor Gray
Write-Host "4. Run signing setup:" -ForegroundColor White
Write-Host "   .\scripts\setup-signing-from-env.ps1" -ForegroundColor Gray
Write-Host ""

Write-Host "Quick Links:" -ForegroundColor Cyan
Write-Host "  - Adoptium (OpenJDK): https://adoptium.net/" -ForegroundColor Gray
Write-Host "  - Oracle JDK: https://www.oracle.com/java/technologies/downloads/" -ForegroundColor Gray
Write-Host "  - Android Studio: https://developer.android.com/studio" -ForegroundColor Gray
Write-Host ""

