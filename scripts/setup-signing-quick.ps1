# Quick Signing Setup Script for Windows
# This script helps you set up app signing quickly

Write-Host "🔐 Privacy Panda Family Hub - App Signing Setup" -ForegroundColor Cyan
Write-Host ""

# Check if keystore already exists
if (Test-Path "pandagarde-familyhub-key.jks") {
    Write-Host "⚠️  Keystore already exists: pandagarde-familyhub-key.jks" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to create a new one? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Using existing keystore." -ForegroundColor Green
        exit
    }
}

Write-Host "Creating keystore..." -ForegroundColor Blue
Write-Host ""
Write-Host "You'll be asked for the following information:" -ForegroundColor Yellow
Write-Host "  - Keystore password (SAVE THIS SECURELY!)" -ForegroundColor Yellow
Write-Host "  - Your name or organization name" -ForegroundColor Yellow
Write-Host "  - Organization: PandaGarde" -ForegroundColor Yellow
Write-Host "  - City, State, Country" -ForegroundColor Yellow
Write-Host ""

# Create keystore
keytool -genkey -v -keystore pandagarde-familyhub-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias pandagarde-familyhub

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Keystore created successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Check if keystore.properties exists
    if (-not (Test-Path "android\keystore.properties")) {
        Write-Host "Creating keystore.properties file..." -ForegroundColor Blue
        Write-Host ""
        Write-Host "Please enter your keystore password:" -ForegroundColor Yellow
        $storePassword = Read-Host -AsSecureString
        $storePasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($storePassword))
        
        Write-Host "Please enter your key password (or press Enter to use same as keystore):" -ForegroundColor Yellow
        $keyPassword = Read-Host -AsSecureString
        if ($keyPassword.Length -eq 0) {
            $keyPasswordPlain = $storePasswordPlain
        } else {
            $keyPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($keyPassword))
        }
        
        $propertiesContent = @"
storePassword=$storePasswordPlain
keyPassword=$keyPasswordPlain
keyAlias=pandagarde-familyhub
storeFile=../pandagarde-familyhub-key.jks
"@
        
        $propertiesContent | Out-File -FilePath "android\keystore.properties" -Encoding ASCII
        
        Write-Host ""
        Write-Host "✅ keystore.properties created!" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠️  IMPORTANT: Keep your keystore and passwords secure!" -ForegroundColor Yellow
        Write-Host "   - Keystore file: pandagarde-familyhub-key.jks" -ForegroundColor Yellow
        Write-Host "   - Config file: android\keystore.properties" -ForegroundColor Yellow
        Write-Host "   - Both are in .gitignore (won't be committed)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  keystore.properties already exists. Update it manually if needed." -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Update android/app/build.gradle with signing config (see scripts/setup-signing.md)" -ForegroundColor White
    Write-Host "2. Test signing: cd android && .\gradlew.bat assembleRelease" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Keystore creation failed!" -ForegroundColor Red
    Write-Host "Please check the error messages above." -ForegroundColor Red
}

