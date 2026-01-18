# Backup Cleanup Script - AI News Site
# This script implements the backup retention policy to keep only the latest 5 backups

param(
    [int]$MaxBackups = 5,
    [string]$BackupDir = ".\backups"
)

Write-Host "Starting backup cleanup process..." -ForegroundColor Cyan
Write-Host "Backup directory: $BackupDir" -ForegroundColor Yellow
Write-Host "Maximum backups to keep: $MaxBackups" -ForegroundColor Yellow

# Get all backup directories (excluding non-backup folders)
$backupDirs = Get-ChildItem -Path $BackupDir -Directory | 
    Where-Object { $_.Name -like "backup-*" } |
    Sort-Object LastWriteTime -Descending

Write-Host "Found $($backupDirs.Count) backup directories" -ForegroundColor Blue

if ($backupDirs.Count -le $MaxBackups) {
    Write-Host "No cleanup needed. Current backup count ($($backupDirs.Count)) is within the limit ($MaxBackups)." -ForegroundColor Green
    exit 0
}

# Show which backups will be kept and which will be removed
$backupsToKeep = $backupDirs | Select-Object -First $MaxBackups
$backupsToRemove = $backupDirs | Select-Object -Skip $MaxBackups

Write-Host "`nBackups to KEEP (latest $MaxBackups):" -ForegroundColor Green
$backupsToKeep | ForEach-Object {
    Write-Host "  [KEEP] $($_.Name) - $($_.LastWriteTime)" -ForegroundColor Green
}

Write-Host "`nBackups to REMOVE:" -ForegroundColor Red
$backupsToRemove | ForEach-Object {
    Write-Host "  [REMOVE] $($_.Name) - $($_.LastWriteTime)" -ForegroundColor Red
}

# Confirm before deletion
Write-Host "`nWARNING: This will permanently delete $($backupsToRemove.Count) old backup directories!" -ForegroundColor Yellow
$confirmation = Read-Host "Do you want to continue? (y/N)"

if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "Backup cleanup cancelled by user." -ForegroundColor Red
    exit 0
}

# Remove old backups
Write-Host "`nRemoving old backups..." -ForegroundColor Red
$removedCount = 0

foreach ($backup in $backupsToRemove) {
    try {
        # Remove the backup directory
        Remove-Item -Path $backup.FullName -Recurse -Force
        Write-Host "  [REMOVED] $($backup.Name)" -ForegroundColor Green
        $removedCount++
        
        # Also remove the corresponding zip file if it exists
        $zipFile = Join-Path $BackupDir "$($backup.Name).zip"
        if (Test-Path $zipFile) {
            Remove-Item -Path $zipFile -Force
            Write-Host "  [REMOVED] $($backup.Name).zip" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "  [FAILED] $($backup.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Final summary
Write-Host "`nBackup cleanup completed!" -ForegroundColor Cyan
Write-Host "Backups removed: $removedCount" -ForegroundColor Green
Write-Host "Backups remaining: $($backupsToKeep.Count)" -ForegroundColor Green

# Show remaining backups
Write-Host "`nRemaining backups:" -ForegroundColor Green
Get-ChildItem -Path $BackupDir -Directory | 
    Where-Object { $_.Name -like "backup-*" } |
    Sort-Object LastWriteTime -Descending |
    ForEach-Object {
        Write-Host "  [KEEP] $($_.Name) - $($_.LastWriteTime)" -ForegroundColor Cyan
    }

Write-Host "`nBackup retention policy successfully implemented!" -ForegroundColor Green
