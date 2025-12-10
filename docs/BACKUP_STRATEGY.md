# Database Backup Strategy

This document outlines the comprehensive backup strategy for the PandaGarde Supabase project to ensure data safety and disaster recovery.

## Overview

The backup strategy includes:
- Automated daily backups (Supabase managed)
- Manual backup triggers before major changes
- Off-platform exports using pg_dump
- Point-in-time recovery capabilities
- Cross-region backup replication

## Automated Backups

### Supabase Managed Backups

Supabase provides automated backups with the following retention periods:

- **Free Plan**: 7 days retention
- **Pro Plan**: 7 days retention
- **Team Plan**: 30 days retention
- **Enterprise Plan**: Custom retention (up to 1 year)

#### Backup Schedule
- **Frequency**: Daily at 2:00 AM UTC
- **Retention**: Based on plan
- **Storage**: Encrypted and stored securely
- **Access**: Via Supabase Dashboard → Settings → Database → Backups

#### Restore Process
```bash
# Restore from Supabase Dashboard
1. Go to Supabase Dashboard
2. Navigate to Settings → Database → Backups
3. Select the desired backup point
4. Click "Restore" and confirm

# Or via CLI
npx supabase db restore --project-ref your-project-ref --backup-id backup-id
```

## Manual Backup Procedures

### Pre-Deployment Backups

Before any major deployment or schema changes:

```bash
#!/bin/bash
# scripts/pre-deployment-backup.sh

PROJECT_REF="your-project-ref"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/pre_deployment_${TIMESTAMP}.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create manual backup
echo "Creating pre-deployment backup..."
npx supabase db dump --project-ref $PROJECT_REF > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Upload to cloud storage (optional)
# aws s3 cp "${BACKUP_FILE}.gz" s3://your-backup-bucket/

echo "Backup created: ${BACKUP_FILE}.gz"
```

### Scheduled Manual Backups

Create a cron job for additional backup frequency:

```bash
# Add to crontab (crontab -e)
# Daily backup at 6 AM UTC
0 6 * * * /path/to/scripts/daily-backup.sh

# Weekly full backup on Sundays at 3 AM UTC
0 3 * * 0 /path/to/scripts/weekly-backup.sh
```

### Backup Scripts

#### Daily Backup Script
```bash
#!/bin/bash
# scripts/daily-backup.sh

PROJECT_REF="your-project-ref"
BACKUP_DIR="./backups/daily"
TIMESTAMP=$(date +"%Y%m%d")
BACKUP_FILE="${BACKUP_DIR}/daily_${TIMESTAMP}.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup
npx supabase db dump --project-ref $PROJECT_REF > $BACKUP_FILE

# Compress
gzip $BACKUP_FILE

# Keep only last 30 days
find $BACKUP_DIR -name "daily_*.sql.gz" -mtime +30 -delete

echo "Daily backup completed: ${BACKUP_FILE}.gz"
```

#### Weekly Backup Script
```bash
#!/bin/bash
# scripts/weekly-backup.sh

PROJECT_REF="your-project-ref"
BACKUP_DIR="./backups/weekly"
TIMESTAMP=$(date +"%Y%m%d")
BACKUP_FILE="${BACKUP_DIR}/weekly_${TIMESTAMP}.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create full backup with schema and data
npx supabase db dump --project-ref $PROJECT_REF --schema-only > "${BACKUP_FILE}_schema.sql"
npx supabase db dump --project-ref $PROJECT_REF --data-only > "${BACKUP_FILE}_data.sql"

# Compress
gzip "${BACKUP_FILE}_schema.sql"
gzip "${BACKUP_FILE}_data.sql"

# Keep only last 12 weeks
find $BACKUP_DIR -name "weekly_*.sql.gz" -mtime +84 -delete

echo "Weekly backup completed: ${BACKUP_FILE}_schema.sql.gz, ${BACKUP_FILE}_data.sql.gz"
```

## Off-Platform Exports

### pg_dump Exports

For complete database exports including all objects:

```bash
#!/bin/bash
# scripts/full-export.sh

PROJECT_REF="your-project-ref"
DB_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
BACKUP_DIR="./backups/full"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/full_export_${TIMESTAMP}"

mkdir -p $BACKUP_DIR

# Full database export
pg_dump $DB_URL \
  --verbose \
  --clean \
  --create \
  --if-exists \
  --format=custom \
  --file="${BACKUP_FILE}.dump"

# Also create SQL format
pg_dump $DB_URL \
  --verbose \
  --clean \
  --create \
  --if-exists \
  --format=plain \
  --file="${BACKUP_FILE}.sql"

# Compress
gzip "${BACKUP_FILE}.dump"
gzip "${BACKUP_FILE}.sql"

echo "Full export completed: ${BACKUP_FILE}.dump.gz, ${BACKUP_FILE}.sql.gz"
```

### Selective Exports

Export specific tables or schemas:

```bash
#!/bin/bash
# scripts/selective-export.sh

PROJECT_REF="your-project-ref"
DB_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
BACKUP_DIR="./backups/selective"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

mkdir -p $BACKUP_DIR

# Export only pandagarde tables
pg_dump $DB_URL \
  --verbose \
  --table="pandagarde_*" \
  --format=custom \
  --file="${BACKUP_DIR}/pandagarde_tables_${TIMESTAMP}.dump"

# Export specific tables
pg_dump $DB_URL \
  --verbose \
  --table="pandagarde_users" \
  --table="pandagarde_activities" \
  --table="pandagarde_progress" \
  --format=custom \
  --file="${BACKUP_DIR}/core_tables_${TIMESTAMP}.dump"

echo "Selective export completed"
```

## Point-in-Time Recovery

### WAL Archiving

Enable Write-Ahead Log (WAL) archiving for point-in-time recovery:

```sql
-- Enable WAL archiving
ALTER SYSTEM SET wal_level = replica;
ALTER SYSTEM SET archive_mode = on;
ALTER SYSTEM SET archive_command = 'cp %p /path/to/wal_archive/%f';
ALTER SYSTEM SET max_wal_senders = 3;
ALTER SYSTEM SET wal_keep_segments = 32;

-- Reload configuration
SELECT pg_reload_conf();
```

### Recovery Procedures

```bash
#!/bin/bash
# scripts/point-in-time-recovery.sh

BACKUP_FILE="backups/full_export_20240101.dump.gz"
TARGET_TIME="2024-01-01 12:00:00"
RECOVERY_DIR="./recovery"

# Create recovery directory
mkdir -p $RECOVERY_DIR

# Extract backup
gunzip -c $BACKUP_FILE > $RECOVERY_DIR/base_backup.dump

# Restore to point-in-time
pg_restore \
  --verbose \
  --clean \
  --if-exists \
  --create \
  --dbname=postgres \
  $RECOVERY_DIR/base_backup.dump

echo "Point-in-time recovery completed"
```

## Cross-Region Backup Replication

### AWS S3 Backup Storage

```bash
#!/bin/bash
# scripts/upload-to-s3.sh

BACKUP_FILE=$1
BUCKET_NAME="pandagarde-backups"
REGION="us-west-2"

# Upload to S3 with encryption
aws s3 cp $BACKUP_FILE \
  s3://$BUCKET_NAME/database-backups/ \
  --region $REGION \
  --server-side-encryption AES256 \
  --storage-class STANDARD_IA

# Set lifecycle policy for old backups
aws s3api put-bucket-lifecycle-configuration \
  --bucket $BUCKET_NAME \
  --lifecycle-configuration file://lifecycle-policy.json
```

### Lifecycle Policy
```json
{
  "Rules": [
    {
      "ID": "DatabaseBackupLifecycle",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "database-backups/"
      },
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        },
        {
          "Days": 365,
          "StorageClass": "DEEP_ARCHIVE"
        }
      ],
      "Expiration": {
        "Days": 2555
      }
    }
  ]
}
```

## Backup Verification

### Automated Verification

```bash
#!/bin/bash
# scripts/verify-backup.sh

BACKUP_FILE=$1
TEST_DB="backup_test_db"

# Create test database
createdb $TEST_DB

# Restore backup to test database
pg_restore --dbname=$TEST_DB $BACKUP_FILE

# Run verification queries
psql $TEST_DB -c "SELECT COUNT(*) FROM pandagarde_users;"
psql $TEST_DB -c "SELECT COUNT(*) FROM pandagarde_activities;"
psql $TEST_DB -c "SELECT COUNT(*) FROM pandagarde_families;"

# Check data integrity
psql $TEST_DB -c "SELECT COUNT(*) FROM pandagarde_users u JOIN pandagarde_family_members fm ON u.id = fm.user_id;"

# Clean up test database
dropdb $TEST_DB

echo "Backup verification completed successfully"
```

### Data Integrity Checks

```sql
-- Check for orphaned records
SELECT COUNT(*) FROM pandagarde_activities a 
LEFT JOIN pandagarde_users u ON a.user_id = u.id 
WHERE u.id IS NULL;

-- Check for referential integrity
SELECT COUNT(*) FROM pandagarde_family_members fm 
LEFT JOIN pandagarde_families f ON fm.family_id = f.id 
WHERE f.id IS NULL;

-- Check for data consistency
SELECT COUNT(*) FROM pandagarde_progress p 
LEFT JOIN pandagarde_activities a ON p.activity_id = a.id 
WHERE a.id IS NULL;
```

## Disaster Recovery Plan

### Recovery Time Objectives (RTO)
- **Critical Systems**: 4 hours
- **Standard Systems**: 24 hours
- **Non-Critical Systems**: 72 hours

### Recovery Point Objectives (RPO)
- **Critical Data**: 1 hour
- **Standard Data**: 4 hours
- **Non-Critical Data**: 24 hours

### Recovery Procedures

#### 1. Database Corruption
```bash
# Stop application
# Restore from latest backup
# Verify data integrity
# Restart application
```

#### 2. Complete Data Loss
```bash
# Create new Supabase project
# Restore from off-platform backup
# Update application configuration
# Verify all functionality
```

#### 3. Partial Data Loss
```bash
# Identify affected tables
# Restore specific tables from backup
# Verify data consistency
# Resume normal operations
```

## Monitoring and Alerting

### Backup Monitoring

```bash
#!/bin/bash
# scripts/monitor-backups.sh

BACKUP_DIR="./backups"
ALERT_EMAIL="admin@pandagarde.com"

# Check if backup exists for today
TODAY=$(date +"%Y%m%d")
if [ ! -f "$BACKUP_DIR/daily_${TODAY}.sql.gz" ]; then
    echo "ALERT: Daily backup missing for $TODAY" | mail -s "Backup Alert" $ALERT_EMAIL
fi

# Check backup size (should be reasonable)
BACKUP_SIZE=$(stat -f%z "$BACKUP_DIR/daily_${TODAY}.sql.gz" 2>/dev/null || echo "0")
if [ $BACKUP_SIZE -lt 1000 ]; then
    echo "ALERT: Backup size suspiciously small: $BACKUP_SIZE bytes" | mail -s "Backup Alert" $ALERT_EMAIL
fi

# Check backup age
BACKUP_AGE=$(find $BACKUP_DIR -name "daily_*.sql.gz" -mtime -1 | wc -l)
if [ $BACKUP_AGE -eq 0 ]; then
    echo "ALERT: No recent backups found" | mail -s "Backup Alert" $ALERT_EMAIL
fi
```

### Automated Alerts

```yaml
# monitoring/backup-alerts.yml
alerts:
  - name: BackupMissing
    condition: backup_age > 25h
    severity: critical
    action: email_admin
    
  - name: BackupSizeAnomaly
    condition: backup_size < 1MB OR backup_size > 1GB
    severity: warning
    action: email_admin
    
  - name: BackupVerificationFailed
    condition: backup_verification_status == "failed"
    severity: critical
    action: email_admin
```

## Backup Retention Policy

### Retention Schedule
- **Daily Backups**: 30 days
- **Weekly Backups**: 12 weeks
- **Monthly Backups**: 12 months
- **Yearly Backups**: 7 years

### Cleanup Scripts

```bash
#!/bin/bash
# scripts/cleanup-old-backups.sh

BACKUP_DIR="./backups"

# Remove daily backups older than 30 days
find $BACKUP_DIR/daily -name "daily_*.sql.gz" -mtime +30 -delete

# Remove weekly backups older than 12 weeks
find $BACKUP_DIR/weekly -name "weekly_*.sql.gz" -mtime +84 -delete

# Remove monthly backups older than 12 months
find $BACKUP_DIR/monthly -name "monthly_*.sql.gz" -mtime +365 -delete

echo "Backup cleanup completed"
```

## Testing and Validation

### Regular Testing Schedule
- **Weekly**: Restore test database from latest backup
- **Monthly**: Full disaster recovery simulation
- **Quarterly**: Cross-region backup verification

### Test Procedures

```bash
#!/bin/bash
# scripts/test-backup-restore.sh

BACKUP_FILE="backups/daily_$(date +%Y%m%d).sql.gz"
TEST_DB="backup_test_$(date +%Y%m%d)"

# Create test database
createdb $TEST_DB

# Restore backup
gunzip -c $BACKUP_FILE | psql $TEST_DB

# Run validation tests
psql $TEST_DB -f tests/backup_validation.sql

# Clean up
dropdb $TEST_DB

echo "Backup test completed successfully"
```

## Documentation and Training

### Backup Procedures Documentation
- [ ] Backup script documentation
- [ ] Recovery procedure documentation
- [ ] Monitoring setup guide
- [ ] Disaster recovery plan
- [ ] Team training materials

### Regular Reviews
- [ ] Monthly backup strategy review
- [ ] Quarterly disaster recovery testing
- [ ] Annual backup policy updates
- [ ] Team training sessions

## Checklist

### Daily Tasks
- [ ] Verify automated backup completed
- [ ] Check backup size and age
- [ ] Monitor backup storage usage

### Weekly Tasks
- [ ] Test backup restoration
- [ ] Verify data integrity
- [ ] Review backup logs
- [ ] Update backup documentation

### Monthly Tasks
- [ ] Full disaster recovery test
- [ ] Review retention policies
- [ ] Update backup procedures
- [ ] Team training session

### Quarterly Tasks
- [ ] Cross-region backup verification
- [ ] Backup strategy review
- [ ] Disaster recovery plan update
- [ ] Compliance audit