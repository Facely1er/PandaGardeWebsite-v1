# Simple Keystore Setup Script
# Run this to set up signing for your Android app

$ErrorActionPreference = "Stop"

Write-Host "Privacy Panda Family Hub - Keystore Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$keystorePath = "pandagarde-familyhub-key.jks"

if (Test-Path $keystorePath) {
    Write-Host "Keystore already exists: $keystorePath" -ForegroundColor Yellow
    $overwrite = Read-Host "Create new one? (y/N)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "Keeping existing keystore." -ForegroundColor Green
        exit 0
    }
}

Write-Host "This script will create a keystore for signing your Android app." -ForegroundColor White
Write-Host ""
Write-Host "IMPORTANT: You will need this keystore for ALL future app updates!" -ForegroundColor Yellow
Write-Host "Store it securely - if you lose it, you cannot update your app on Play Store." -ForegroundColor Yellow
Write-Host ""

Write-Host "Please provide the following information:" -ForegroundColor Blue
Write-Host ""

$keystorePassword = Read-Host "Enter keystore password (will be hidden)" -AsSecureString
$keystorePasswordConfirm = Read-Host "Confirm keystore password (will be hidden)" -AsSecureString

$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($keystorePassword)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
$BSTR2 = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($keystorePasswordConfirm)
$plainPasswordConfirm = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR2)

if ($plainPassword -ne $plainPasswordConfirm) {
    Write-Host "Passwords do not match!" -ForegroundColor Red
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
    Write-Host "Country code should be 2 letters. Using US as default." -ForegroundColor Yellow
    $country = "US"
}

Write-Host ""
Write-Host "Creating keystore..." -ForegroundColor Blue

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
        Write-Host "Keystore created successfully!" -ForegroundColor Green
        Write-Host "Location: $keystorePath" -ForegroundColor Green
        Write-Host ""
        
        Write-Host "Creating keystore.properties file..." -ForegroundColor Blue
        
        $keystorePropsPath = "android\keystore.properties"
        $keystorePropsContent = "storePassword=$plainPassword`nkeyPassword=$plainKeyPassword`nkeyAlias=pandagarde-familyhub`nstoreFile=../$keystorePath`n"
        
        if (-not (Test-Path "android")) {
            Write-Host "android directory not found!" -ForegroundColor Red
            exit 1
        }
        
        $keystorePropsContent | Out-File -FilePath $keystorePropsPath -Encoding ASCII -NoNewline
        
        Write-Host "keystore.properties created!" -ForegroundColor Green
        Write-Host "Location: $keystorePropsPath" -ForegroundColor Green
        Write-Host ""
        
        Write-Host "Signing setup complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Build release AAB: .\scripts\build-android.ps1 release" -ForegroundColor White
        Write-Host "2. Test the signed AAB before uploading to Play Store" -ForegroundColor White
        Write-Host ""
        Write-Host "SECURITY REMINDER:" -ForegroundColor Yellow
        Write-Host "- Never commit keystore files to Git" -ForegroundColor Yellow
        Write-Host "- Store keystore securely" -ForegroundColor Yellow
        Write-Host "- You will need this keystore for every app update!" -ForegroundColor Yellow
        
    } else {
        Write-Host "Keystore creation failed!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Error creating keystore" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure Java JDK is installed and keytool is available" -ForegroundColor Yellow
    exit 1
}

$plainPassword = $null
$plainPasswordConfirm = $null
$plainKeyPassword = $null

