#!/bin/bash
# Android Build Script for Privacy Panda Family Hub
# This script automates the build process for Android

set -e  # Exit on error

echo "🚀 Building Privacy Panda Family Hub for Android..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Build web app
echo -e "${BLUE}📦 Step 1: Building web application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}❌ Web build failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Web build complete${NC}"
echo ""

# Step 2: Sync to Android
echo -e "${BLUE}🔄 Step 2: Syncing web assets to Android...${NC}"
npx cap sync android

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}❌ Sync failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Sync complete${NC}"
echo ""

# Step 3: Build Android
echo -e "${BLUE}📱 Step 3: Building Android app...${NC}"
cd android

# Check if release or debug
BUILD_TYPE=${1:-debug}

if [ "$BUILD_TYPE" = "release" ]; then
    echo -e "${YELLOW}Building RELEASE bundle (AAB)...${NC}"
    ./gradlew bundleRelease
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Release bundle created!${NC}"
        echo -e "${GREEN}Location: android/app/build/outputs/bundle/release/app-release.aab${NC}"
    fi
else
    echo -e "${YELLOW}Building DEBUG APK...${NC}"
    ./gradlew assembleDebug
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Debug APK created!${NC}"
        echo -e "${GREEN}Location: android/app/build/outputs/apk/debug/app-debug.apk${NC}"
    fi
fi

cd ..

echo ""
echo -e "${GREEN}🎉 Build complete!${NC}"

