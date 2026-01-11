# Signing Setup Using Android Studio's Java
# This script finds Android Studio's Java and uses it for signing

$ErrorActionPreference = "Stop"

Write-Host "Signing Setup with Android Studio" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Find Android Studio's Java
$keytoolPaths = @(
    "$env:LOCALAPPDATA\Android\Sdk\jbr\bin\keytool.exe",
    "$env:USERPROFILE\AppData\Local\Android\Sdk\jbr\bin\keytool.exe",
    "$env:ProgramFiles\Android\Android Studio\jbr\bin\keytool.exe",
    "$env:ProgramFiles(x86)\Android\Android Studio\jbr\bin\keytool.exe"
)

$keytoolPath = $null
foreach ($path in $keytoolPaths) {
    if (Test-Path $path) {
        $keytoolPath = $path
        Write-Host "Found keytool at: $path" -ForegroundColor Green
        break
    }
}

if (-not $keytoolPath) {
    Write-Host "Android Studio Java not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Android Studio:" -ForegroundColor Yellow
    Write-Host "  1. Download: https://developer.android.com/studio" -ForegroundColor White
    Write-Host "  2. Install Android Studio" -ForegroundColor White
    Write-Host "  3. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or install Java JDK separately:" -ForegroundColor Yellow
    Write-Host "  Download: https://adoptium.net/" -ForegroundColor White
    exit 1
}

# Read config file
$configFile = "keystore-config.txt"
if (-not (Test-Path $configFile)) {
    Write-Host "Config file not found: $configFile" -ForegroundColor Red
    Write-Host "Please create keystore-config.txt first" -ForegroundColor Yellow
    exit 1
}

Write-Host "Reading configuration from $configFile..." -ForegroundColor Blue
$config = Get-Content $configFile | ConvertFrom-StringData

$keystorePassword = $config.KEYSTORE_PASSWORD
$keyPassword = $config.KEY_PASSWORD
$name = $config.KEYSTORE_NAME
$organization = $config.KEYSTORE_ORG
$orgUnit = $config.KEYSTORE_ORG_UNIT
$city = $config.KEYSTORE_CITY
$state = $config.KEYSTORE_STATE
$country = $config.KEYSTORE_COUNTRY

# Set defaults
if (-not $keyPassword) { $keyPassword = $keystorePassword }
if (-not $organization) { $organization = "PandaGarde" }
if (-not $orgUnit) { $orgUnit = "" }
if (-not $country) { $country = "US" }
if ($country.Length -ne 2) { $country = "US" }

# Validate
if (-not $keystorePassword -or -not $name -or -not $city -or -not $state) {
    Write-Host "Missing required information in config file!" -ForegroundColor Red
    exit 1
}

$keystorePath = "pandagarde-familyhub-key.jks"

if (Test-Path $keystorePath) {
    Write-Host "Keystore already exists: $keystorePath" -ForegroundColor Yellow
    Write-Host "Skipping creation." -ForegroundColor Yellow
} else {
    Write-Host "Creating keystore..." -ForegroundColor Blue
    
    $keytoolArgs = @(
        "-genkey",
        "-v",
        "-keystore", $keystorePath,
        "-keyalg", "RSA",
        "-keysize", "2048",
        "-validity", "10000",
        "-alias", "pandagarde-familyhub",
        "-storepass", $keystorePassword,
        "-keypass", $keyPassword,
        "-dname", "CN=$name, OU=$orgUnit, O=$organization, L=$city, ST=$state, C=$country"
    )
    
    try {
        & $keytoolPath $keytoolArgs 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Keystore created successfully!" -ForegroundColor Green
        } else {
            Write-Host "Keystore creation failed!" -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "Error creating keystore: $_" -ForegroundColor Red
        exit 1
    }
}

# Create keystore.properties
Write-Host "Creating keystore.properties..." -ForegroundColor Blue

$keystorePropsPath = "android\keystore.properties"
$keystorePropsContent = "storePassword=$keystorePassword`nkeyPassword=$keyPassword`nkeyAlias=pandagarde-familyhub`nstoreFile=../$keystorePath`n"

if (-not (Test-Path "android")) {
    Write-Host "android directory not found!" -ForegroundColor Red
    exit 1
}

$keystorePropsContent | Out-File -FilePath $keystorePropsPath -Encoding ASCII -NoNewline

Write-Host "keystore.properties created!" -ForegroundColor Green
Write-Host ""
Write-Host "Signing setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Verify: .\scripts\complete-signing-setup.ps1" -ForegroundColor White
Write-Host "2. Build release AAB: .\scripts\build-android.ps1 release" -ForegroundColor White
Write-Host ""

