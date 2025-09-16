#!/bin/bash

# Environment Verification Script for PandaGarde
# This script checks for required environment variables and fails fast if any are missing

set -e

echo "🔍 Verifying environment variables..."

# Required environment variables
REQUIRED_VARS=(
  "VITE_SUPABASE_URL"
  "VITE_SUPABASE_ANON_KEY"
  "VITE_DB_SCHEMA_PREFIX"
)

# Optional but recommended environment variables
OPTIONAL_VARS=(
  "VITE_GA4_MEASUREMENT_ID"
  "VITE_SENTRY_DSN"
  "VITE_SENTRY_ORG"
  "VITE_SENTRY_PROJECT"
  "VITE_SENTRY_AUTH_TOKEN"
)

# Check required variables
MISSING_VARS=()
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    MISSING_VARS+=("$var")
  else
    echo "✅ $var is set"
  fi
done

# Check optional variables
MISSING_OPTIONAL=()
for var in "${OPTIONAL_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    MISSING_OPTIONAL+=("$var")
  else
    echo "✅ $var is set"
  fi
done

# Fail if required variables are missing
if [ ${#MISSING_VARS[@]} -ne 0 ]; then
  echo ""
  echo "❌ Missing required environment variables:"
  for var in "${MISSING_VARS[@]}"; do
    echo "   - $var"
  done
  echo ""
  echo "Please set these variables in your environment or GitHub Secrets."
  echo "Required for: Supabase connection and database schema isolation."
  exit 1
fi

# Warn about missing optional variables
if [ ${#MISSING_OPTIONAL[@]} -ne 0 ]; then
  echo ""
  echo "⚠️  Missing optional environment variables:"
  for var in "${MISSING_OPTIONAL[@]}"; do
    echo "   - $var"
  done
  echo ""
  echo "These are recommended for full functionality:"
  echo "  - VITE_GA4_MEASUREMENT_ID: Google Analytics 4 tracking"
  echo "  - VITE_SENTRY_*: Error monitoring and performance tracking"
  echo ""
fi

# Validate Supabase URL format
if [[ ! "$VITE_SUPABASE_URL" =~ ^https://[a-zA-Z0-9-]+\.supabase\.co$ ]]; then
  echo "❌ VITE_SUPABASE_URL format is invalid. Expected: https://your-project.supabase.co"
  exit 1
fi

# Validate schema prefix format
if [[ ! "$VITE_DB_SCHEMA_PREFIX" =~ ^[a-z][a-z0-9_]*$ ]]; then
  echo "❌ VITE_DB_SCHEMA_PREFIX format is invalid. Expected: lowercase letters, numbers, and underscores only"
  exit 1
fi

echo ""
echo "🎉 Environment verification passed!"
echo "   Supabase URL: $VITE_SUPABASE_URL"
echo "   Schema prefix: $VITE_DB_SCHEMA_PREFIX"
echo ""