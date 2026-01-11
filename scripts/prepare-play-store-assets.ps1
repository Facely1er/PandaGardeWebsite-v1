# Prepare Play Store Assets Guide Script
# This script helps you prepare assets for Play Store submission

$ErrorActionPreference = "Continue"

Write-Host "📸 Play Store Assets Preparation Guide" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

$logoPath = "public\LogoPandagarde.png"

if (-not (Test-Path $logoPath)) {
    Write-Host "❌ Logo not found at: $logoPath" -ForegroundColor Red
    Write-Host "Please ensure LogoPandagarde.png exists in the public folder" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Logo found: $logoPath" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Required Play Store Assets:" -ForegroundColor Blue
Write-Host ""

Write-Host "1. App Icon (512x512 PNG)" -ForegroundColor Yellow
Write-Host "   - Size: 512x512 pixels" -ForegroundColor White
Write-Host "   - Format: PNG" -ForegroundColor White
Write-Host "   - Background: Transparent or solid color" -ForegroundColor White
Write-Host "   - Source: $logoPath" -ForegroundColor White
Write-Host "   - Save as: play-store-icon-512.png" -ForegroundColor White
Write-Host ""

Write-Host "2. Feature Graphic (1024x500 PNG)" -ForegroundColor Yellow
Write-Host "   - Size: 1024x500 pixels" -ForegroundColor White
Write-Host "   - Format: PNG" -ForegroundColor White
Write-Host "   - Content: App name, tagline, key features" -ForegroundColor White
Write-Host "   - Save as: play-store-feature-graphic-1024x500.png" -ForegroundColor White
Write-Host ""

Write-Host "3. Screenshots (2-5 images)" -ForegroundColor Yellow
Write-Host "   - Phone: 16:9 or 9:16 ratio (e.g., 1080x1920 or 1920x1080)" -ForegroundColor White
Write-Host "   - Tablet: Optional (16:9 or 9:16)" -ForegroundColor White
Write-Host "   - Recommended screenshots:" -ForegroundColor White
Write-Host "     • Family Dashboard" -ForegroundColor Gray
Write-Host "     • Child Progress Detail" -ForegroundColor Gray
Write-Host "     • Learning Hub / Games" -ForegroundColor Gray
Write-Host "     • Privacy Goals" -ForegroundColor Gray
Write-Host "     • Family Members Management" -ForegroundColor Gray
Write-Host ""

Write-Host "🛠️ Tools You Can Use:" -ForegroundColor Blue
Write-Host ""
Write-Host "For App Icon (512x512):" -ForegroundColor Yellow
Write-Host "  • Online: https://www.iloveimg.com/resize-image" -ForegroundColor White
Write-Host "  • Online: https://www.resizepixel.com/" -ForegroundColor White
Write-Host "  • Desktop: GIMP, Photoshop, Paint.NET" -ForegroundColor White
Write-Host ""

Write-Host "For Feature Graphic (1024x500):" -ForegroundColor Yellow
Write-Host "  • Canva: https://www.canva.com/ (free templates)" -ForegroundColor White
Write-Host "  • Figma: https://www.figma.com/ (free)" -ForegroundColor White
Write-Host "  • GIMP/Photoshop: Create custom design" -ForegroundColor White
Write-Host ""

Write-Host "For Screenshots:" -ForegroundColor Yellow
Write-Host "  • Android Studio Emulator" -ForegroundColor White
Write-Host "  • Physical device screenshot" -ForegroundColor White
Write-Host "  • AppMockup: https://app-mockup.com/ (add frames)" -ForegroundColor White
Write-Host ""

Write-Host "📝 Feature Graphic Content Suggestions:" -ForegroundColor Blue
Write-Host ""
Write-Host "Include:" -ForegroundColor Yellow
Write-Host "  • App Name: Privacy Panda Family Hub" -ForegroundColor White
Write-Host "  • Tagline: Your Family's Digital Privacy Companion" -ForegroundColor White
Write-Host "  • Key Features:" -ForegroundColor White
Write-Host "    - Family Dashboard" -ForegroundColor Gray
Write-Host "    - Progress Tracking" -ForegroundColor Gray
Write-Host "    - Privacy Education" -ForegroundColor Gray
Write-Host "    - COPPA Compliant" -ForegroundColor Gray
Write-Host "  • Use Privacy Panda branding colors" -ForegroundColor White
Write-Host ""

Write-Host "✅ Checklist:" -ForegroundColor Blue
Write-Host ""
Write-Host "After creating assets, verify:" -ForegroundColor Yellow
Write-Host "  [ ] App icon is 512x512 PNG" -ForegroundColor White
Write-Host "  [ ] Feature graphic is 1024x500 PNG" -ForegroundColor White
Write-Host "  [ ] Screenshots are correct size and ratio" -ForegroundColor White
Write-Host "  [ ] All files are in project root or assets folder" -ForegroundColor White
Write-Host "  [ ] Images are high quality and clear" -ForegroundColor White
Write-Host ""

Write-Host "📚 See STORE_LISTING_TEMPLATE.md for store listing content" -ForegroundColor Cyan
Write-Host ""

