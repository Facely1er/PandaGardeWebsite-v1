# 🔧 Scripts

This directory contains utility scripts for database management and deployment.

## Available Scripts

### Database Migration
- `run-migration.js` - Executes database schema migration
- `verify-migration.js` - Verifies migration was successful

**Note:** These scripts contain database credentials and are gitignored for security.

### Deployment
- `deploy.sh` - Deployment script (if needed)

## Usage

### Running Migrations

```bash
# Run migration
node scripts/run-migration.js

# Verify migration
node scripts/verify-migration.js
```

## ⚠️ Security

Migration scripts are excluded from git because they contain database credentials. Always use environment variables or secure credential management in production.

