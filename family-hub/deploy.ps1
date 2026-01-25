# Family Hub PWA Deployment Script
# This script helps deploy the Family Hub PWA to Netlify or Vercel

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("netlify", "vercel", "build-only")]
    [string]$Platform = "netlify"
)

Write-Host "🚀 PandaGarde Family Hub PWA Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Change to family-hub directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Step 1: Build the PWA
Write-Host "📦 Building Family Hub PWA..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Step 2: Deploy based on platform
switch ($Platform) {
    "netlify" {
        Write-Host "🌐 Deploying to Netlify..." -ForegroundColor Yellow
        
        # Check if Netlify CLI is installed
        $netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
        if (-not $netlifyInstalled) {
            Write-Host "⚠️  Netlify CLI not found. Installing..." -ForegroundColor Yellow
            npm install -g netlify-cli
        }
        
        # Deploy to Netlify
        Write-Host "Deploying to production..." -ForegroundColor Cyan
        netlify deploy --prod --dir=dist
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Deployment successful!" -ForegroundColor Green
            Write-Host "🌐 Your PWA should be live on Netlify!" -ForegroundColor Cyan
        } else {
            Write-Host "❌ Deployment failed!" -ForegroundColor Red
            exit 1
        }
    }
    
    "vercel" {
        Write-Host "▲ Deploying to Vercel..." -ForegroundColor Yellow
        
        # Check if Vercel CLI is installed
        $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
        if (-not $vercelInstalled) {
            Write-Host "⚠️  Vercel CLI not found. Installing..." -ForegroundColor Yellow
            npm install -g vercel
        }
        
        # Deploy to Vercel
        Write-Host "Deploying to production..." -ForegroundColor Cyan
        vercel --prod
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Deployment successful!" -ForegroundColor Green
            Write-Host "▲ Your PWA should be live on Vercel!" -ForegroundColor Cyan
        } else {
            Write-Host "❌ Deployment failed!" -ForegroundColor Red
            exit 1
        }
    }
    
    "build-only" {
        Write-Host "✅ Build completed. Ready for manual deployment." -ForegroundColor Green
        Write-Host "📁 Production files are in the 'dist' directory." -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "📱 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Test the deployed PWA on mobile devices" -ForegroundColor White
Write-Host "   2. Verify PWA installation works" -ForegroundColor White
Write-Host "   3. Test offline functionality" -ForegroundColor White
Write-Host "   4. Check all routes work correctly" -ForegroundColor White
Write-Host ""

