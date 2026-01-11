# Interactive Keystore Setup Script for Privacy Panda Family Hub
# This script helps you create a keystore and configure signing

$ErrorActionPreference = "Stop"

Write-Host "🔐 Privacy Panda Family Hub - Keystore Setup" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if keystore already exists
$keystorePath = "pandagarde-familyhub-key.jks"
if (Test-Path $keystorePath) {
    Write-Host "⚠️  Keystore file already exists: $keystorePath" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to create a new one? (y/N)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "Keeping existing keystore." -ForegroundColor Green
        exit 0
    }
}

Write-Host "This script will help you create a keystore for signing your Android app." -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: You'll need this keystore for ALL future app updates!" -ForegroundColor Yellow
Write-Host "   Store it securely - if you lose it, you cannot update your app on Play Store." -ForegroundColor Yellow
Write-Host ""

# Get keystore information
Write-Host "Please provide the following information:" -ForegroundColor Blue
Write-Host ""

$keystorePassword = Read-Host "Enter keystore password (will be hidden)" -AsSecureString
$keystorePasswordConfirm = Read-Host "Confirm keystore password (will be hidden)" -AsSecureString

# Convert SecureString to plain text for comparison
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($keystorePassword)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
$BSTR2 = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($keystorePasswordConfirm)
$plainPasswordConfirm = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR2)

if ($plainPassword -ne $plainPasswordConfirm) {
    Write-Host "❌ Passwords do not match!" -ForegroundColor Red
    exit 1
}

$keyPassword = Read-Host "Enter key password (can be same as keystore, will be hidden)" -AsSecureString
$BSTR3 = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($keyPassword)
$plainKeyPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR3)

$name = Read-Host "Your name or organization name"
$orgUnit = Read-Host "Organizational Unit (optional, press Enter to skip)"
$organization = Read-Host "Organization [PandaGarde]"
if ([string]::IsNullOrWhiteSpace($organization)) {
    $organization = "PandaGarde"
}
$city = Read-Host "City"
$state = Read-Host "State/Province"
$country = Read-Host "Country Code (2 letters, e.g., US, CA, GB)"

if ($country.Length -ne 2) {
    Write-Host "⚠️  Country code should be 2 letters. Using 'US' as default." -ForegroundColor Yellow
    $country = "US"
}

Write-Host ""
Write-Host "Creating keystore..." -ForegroundColor Blue

# Build keytool command
$keytoolArgs = @(
    "-genkey",
    "-v",
    "-keystore", $keystorePath,
    "-keyalg", "RSA",
    "-keysize", "2048",
    "-validity", "10000",
    "-alias", "pandagarde-familyhub",
    "-storepass", $plainPassword,
    "-keypass", $plainKeyPassword,
    "-dname", "CN=$name, OU=$orgUnit, O=$organization, L=$city, ST=$state, C=$country"
)

try {
    & keytool $keytoolArgs
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Keystore created successfully!" -ForegroundColor Green
        Write-Host "   Location: $keystorePath" -ForegroundColor Green
        Write-Host ""
        
        # Create keystore.properties file
        Write-Host "Creating keystore.properties file..." -ForegroundColor Blue
        
        $keystorePropsPath = "android\keystore.properties"
        $keystorePropsContent = @"
storePassword=$plainPassword
keyPassword=$plainKeyPassword
keyAlias=pandagarde-familyhub
storeFile=../$keystorePath
"@
        
        # Ensure android directory exists
        if (-not (Test-Path "android")) {
            Write-Host "❌ android directory not found!" -ForegroundColor Red
            exit 1
        }
        
        $keystorePropsContent | Out-File -FilePath $keystorePropsPath -Encoding ASCII -NoNewline
        
        Write-Host "✅ keystore.properties created!" -ForegroundColor Green
        Write-Host "   Location: $keystorePropsPath" -ForegroundColor Green
        Write-Host ""
        
        Write-Host "🎉 Signing setup complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Verify keystore.properties is in .gitignore (should already be there)" -ForegroundColor White
        Write-Host "2. Build release AAB: .\scripts\build-android.ps1 release" -ForegroundColor White
        Write-Host "3. Test the signed AAB before uploading to Play Store" -ForegroundColor White
        Write-Host ""
        Write-Host "⚠️  SECURITY REMINDER:" -ForegroundColor Yellow
        Write-Host "   - Never commit $keystorePath or $keystorePropsPath to Git" -ForegroundColor Yellow
        Write-Host "   - Store keystore in a secure location (password manager, encrypted backup)" -ForegroundColor Yellow
        Write-Host "   - You'll need this keystore for every app update!" -ForegroundColor Yellow
        
    } else {
        Write-Host "❌ Keystore creation failed!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Error creating keystore: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure Java JDK is installed and keytool is in your PATH." -ForegroundColor Yellow
    exit 1
}

# Clear passwords from memory
$plainPassword = $null
$plainPasswordConfirm = $null
$plainKeyPassword = $null

