# Capture Screenshots via ADB
# This script helps you capture screenshots from Android device/emulator

$ErrorActionPreference = "Continue"

Write-Host "Screenshot Capture via ADB" -ForegroundColor Cyan
Write-Host "===========================" -ForegroundColor Cyan
Write-Host ""

# Check if ADB is available
try {
    $adbVersion = adb version 2>&1 | Select-Object -First 1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "ADB found" -ForegroundColor Green
    } else {
        Write-Host "ADB not found - Android SDK tools needed" -ForegroundColor Yellow
    }
} catch {
    Write-Host "ADB not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "ADB is included with Android Studio SDK" -ForegroundColor Yellow
    Write-Host "Location usually: C:\Users\YourName\AppData\Local\Android\Sdk\platform-tools\adb.exe" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Add to PATH or use full path" -ForegroundColor Yellow
    exit 1
}

# Check for connected devices
Write-Host ""
Write-Host "Checking for connected devices..." -ForegroundColor Blue
$devices = adb devices 2>&1 | Select-Object -Skip 1 | Where-Object { $_ -match "device$" }

if ($devices.Count -eq 0) {
    Write-Host "No devices found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "1. Connect a physical device via USB (enable USB debugging)" -ForegroundColor White
    Write-Host "2. Start an Android emulator" -ForegroundColor White
    Write-Host "3. Use Android Studio to run app and capture screenshots" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "Found $($devices.Count) device(s)" -ForegroundColor Green
Write-Host ""

# Create screenshots directory
$screenshotDir = "play-store-assets\screenshots"
if (-not (Test-Path $screenshotDir)) {
    New-Item -ItemType Directory -Path $screenshotDir -Force | Out-Null
    Write-Host "Created directory: $screenshotDir" -ForegroundColor Green
}

Write-Host "Screenshot Capture Instructions:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Navigate to the screen you want to capture in your app" -ForegroundColor White
Write-Host "2. Press Enter to capture screenshot" -ForegroundColor White
Write-Host "3. Screenshot will be saved to: $screenshotDir" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to exit" -ForegroundColor Yellow
Write-Host ""

$screenshotCount = 0

while ($true) {
    $input = Read-Host "Press Enter to capture screenshot (or 'q' to quit)"
    
    if ($input -eq 'q') {
        break
    }
    
    $screenshotCount++
    $filename = "play-store-screenshot-$screenshotCount.png"
    $filepath = Join-Path $screenshotDir $filename
    
    Write-Host "Capturing screenshot..." -ForegroundColor Blue
    
    try {
        # Capture screenshot
        adb exec-out screencap -p > $filepath
        
        if (Test-Path $filepath) {
            $fileSize = (Get-Item $filepath).Length
            Write-Host "Screenshot saved: $filename" -ForegroundColor Green
            Write-Host "Size: $([math]::Round($fileSize / 1KB, 2)) KB" -ForegroundColor Gray
            Write-Host "Location: $filepath" -ForegroundColor Gray
        } else {
            Write-Host "Screenshot capture failed" -ForegroundColor Red
        }
    } catch {
        Write-Host "Error capturing screenshot: $_" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host ""
Write-Host "Screenshots captured: $screenshotCount" -ForegroundColor Cyan
Write-Host "Location: $screenshotDir" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review screenshots" -ForegroundColor White
Write-Host "2. Resize if needed (should be 1080x1920 for phone)" -ForegroundColor White
Write-Host "3. Use for Play Store submission" -ForegroundColor White
Write-Host ""

