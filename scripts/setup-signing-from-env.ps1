# Non-Interactive Keystore Setup Script
# Uses environment variables or config file for signing setup

$ErrorActionPreference = "Stop"

Write-Host "Privacy Panda Family Hub - Keystore Setup (Non-Interactive)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

$keystorePath = "pandagarde-familyhub-key.jks"

# Check if keystore already exists
if (Test-Path $keystorePath) {
    Write-Host "Keystore already exists: $keystorePath" -ForegroundColor Yellow
    Write-Host "Skipping creation. If you need a new one, delete the existing file first." -ForegroundColor Yellow
    exit 0
}

# Try to get values from environment variables first
$keystorePassword = $env:KEYSTORE_PASSWORD
$keyPassword = $env:KEY_PASSWORD
$name = $env:KEYSTORE_NAME
$organization = $env:KEYSTORE_ORG
$orgUnit = $env:KEYSTORE_ORG_UNIT
$city = $env:KEYSTORE_CITY
$state = $env:KEYSTORE_STATE
$country = $env:KEYSTORE_COUNTRY

# If not in environment, try config file
if (-not $keystorePassword) {
    $configFile = "keystore-config.txt"
    if (Test-Path $configFile) {
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
    }
}

# If still not found, use defaults or prompt
if (-not $keystorePassword) {
    Write-Host ""
    Write-Host "No keystore configuration found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Option 1: Set environment variables:" -ForegroundColor Yellow
    Write-Host "  `$env:KEYSTORE_PASSWORD = 'your-password'" -ForegroundColor White
    Write-Host "  `$env:KEY_PASSWORD = 'your-password'" -ForegroundColor White
    Write-Host "  `$env:KEYSTORE_NAME = 'Your Name'" -ForegroundColor White
    Write-Host "  `$env:KEYSTORE_ORG = 'PandaGarde'" -ForegroundColor White
    Write-Host "  `$env:KEYSTORE_CITY = 'Your City'" -ForegroundColor White
    Write-Host "  `$env:KEYSTORE_STATE = 'Your State'" -ForegroundColor White
    Write-Host "  `$env:KEYSTORE_COUNTRY = 'US'" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Create keystore-config.txt file (see keystore-config.example.txt)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 3: Run the interactive script:" -ForegroundColor Yellow
    Write-Host "  .\scripts\setup-signing-simple.ps1" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Set defaults for missing values
if (-not $keyPassword) { $keyPassword = $keystorePassword }
if (-not $organization) { $organization = "PandaGarde" }
if (-not $orgUnit) { $orgUnit = "" }
if (-not $country) { $country = "US" }
if ($country.Length -ne 2) { $country = "US" }

# Validate required fields
if (-not $name -or -not $city -or -not $state) {
    Write-Host "Missing required information!" -ForegroundColor Red
    Write-Host "Required: KEYSTORE_NAME, KEYSTORE_CITY, KEYSTORE_STATE" -ForegroundColor Yellow
    exit 1
}

Write-Host "Creating keystore with provided configuration..." -ForegroundColor Blue
Write-Host ""

# Build keytool command
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
    & keytool $keytoolArgs 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Keystore created successfully!" -ForegroundColor Green
        Write-Host "Location: $keystorePath" -ForegroundColor Green
        Write-Host ""
        
        # Create keystore.properties file
        Write-Host "Creating keystore.properties file..." -ForegroundColor Blue
        
        $keystorePropsPath = "android\keystore.properties"
        $keystorePropsContent = "storePassword=$keystorePassword`nkeyPassword=$keyPassword`nkeyAlias=pandagarde-familyhub`nstoreFile=../$keystorePath`n"
        
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
        Write-Host "1. Verify keystore.properties is in .gitignore" -ForegroundColor White
        Write-Host "2. Build release AAB: .\scripts\build-android.ps1 release" -ForegroundColor White
        Write-Host "3. Store keystore password securely (see KEYSTORE_PASSWORD_STORAGE.md)" -ForegroundColor White
        Write-Host ""
        Write-Host "SECURITY REMINDER:" -ForegroundColor Yellow
        Write-Host "- Never commit keystore files to Git" -ForegroundColor Yellow
        Write-Host "- Store keystore and password securely" -ForegroundColor Yellow
        Write-Host "- You will need this for every app update!" -ForegroundColor Yellow
        
    } else {
        Write-Host "Keystore creation failed!" -ForegroundColor Red
        Write-Host "Make sure Java JDK is installed and keytool is available" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "Error creating keystore" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure Java JDK is installed and keytool is available" -ForegroundColor Yellow
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

