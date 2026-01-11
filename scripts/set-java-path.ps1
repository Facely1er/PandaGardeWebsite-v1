# Set Java Path for Android Studio
# This script sets JAVA_HOME to Android Studio's Java

$ErrorActionPreference = "Continue"

Write-Host "Setting Java Path for Android Studio" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Find Android Studio Java
$javaPaths = @(
    "C:\Program Files\Android\Android Studio\jbr",
    "$env:LOCALAPPDATA\Android\Sdk\jbr",
    "$env:USERPROFILE\AppData\Local\Android\Sdk\jbr"
)

$javaHome = $null
foreach ($path in $javaPaths) {
    if (Test-Path $path) {
        $javaHome = $path
        Write-Host "Found Android Studio Java at: $path" -ForegroundColor Green
        break
    }
}

if (-not $javaHome) {
    Write-Host "Android Studio Java not found!" -ForegroundColor Red
    Write-Host "Please make sure Android Studio is installed" -ForegroundColor Yellow
    exit 1
}

# Set JAVA_HOME for current session
$env:JAVA_HOME = $javaHome
$env:PATH = "$javaHome\bin;$env:PATH"

Write-Host ""
Write-Host "JAVA_HOME set to: $env:JAVA_HOME" -ForegroundColor Green
Write-Host ""

# Verify Java works
Write-Host "Verifying Java..." -ForegroundColor Blue
try {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    Write-Host "Java version: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "Java verification failed" -ForegroundColor Red
}

# Update local.properties for Gradle
Write-Host ""
Write-Host "Updating android/local.properties..." -ForegroundColor Blue
$localPropsPath = "android\local.properties"

if (-not (Test-Path "android")) {
    Write-Host "android directory not found!" -ForegroundColor Red
    exit 1
}

# Read existing local.properties or create new
$localProps = @()
if (Test-Path $localPropsPath) {
    $localProps = Get-Content $localPropsPath
    # Remove existing sdk.dir and java.home if present
    $localProps = $localProps | Where-Object { $_ -notmatch "^sdk\.dir=" -and $_ -notmatch "^java\.home=" }
}

# Add Java home
$localProps += "java.home=$javaHome"

# Try to find Android SDK
$sdkPaths = @(
    "$env:LOCALAPPDATA\Android\Sdk",
    "$env:USERPROFILE\AppData\Local\Android\Sdk"
)

$sdkPath = $null
foreach ($path in $sdkPaths) {
    if (Test-Path $path) {
        $sdkPath = $path
        break
    }
}

if ($sdkPath) {
    $localProps += "sdk.dir=$sdkPath"
    Write-Host "Android SDK found at: $sdkPath" -ForegroundColor Green
} else {
    Write-Host "Android SDK not found - you may need to set it up in Android Studio" -ForegroundColor Yellow
}

# Write local.properties
$localProps | Out-File -FilePath $localPropsPath -Encoding ASCII

Write-Host "local.properties updated!" -ForegroundColor Green
Write-Host ""
Write-Host "You can now build:" -ForegroundColor Cyan
Write-Host "  .\scripts\build-android.ps1 release" -ForegroundColor White
Write-Host ""
Write-Host "Note: JAVA_HOME is set for this session only." -ForegroundColor Yellow
Write-Host "To make it permanent, add to System Environment Variables." -ForegroundColor Yellow

