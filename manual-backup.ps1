# manual-backup.ps1
# PowerShell script for manual, change-aware, compressed backups with retention policy
# Place this file in your project root: C:\Users\Raf\Desktop\AINewsSite\ai-news-site\manual-backup.ps1

# CONFIGURATION
$BackupDir = "backups"
$BackupLimit = 7
$Include = @("src", "netlify", "schemas", "astro.config.mjs", "package.json", "package-lock.json", "env.example", "README.md")

# Ensure backup directory exists
if (!(Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir | Out-Null
}

# Get latest git commit hash
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or not in PATH. Exiting."
    pause
    exit 1
}
$LatestCommit = git rev-parse HEAD

# Check for uncommitted changes and auto-commit if needed
$Status = git status --porcelain
if ($Status) {
    Write-Host "Uncommitted changes detected. Staging and committing..."
    git add .
    git commit -m "Auto-commit before backup"
    Write-Host "Changes committed."
} else {
    Write-Host "No uncommitted changes."
}

# Check if a backup for this commit already exists
$ExistingBackup = Get-ChildItem $BackupDir -Filter "*-${LatestCommit}.zip" | Select-Object -First 1
if ($ExistingBackup) {
    Write-Host "No changes since last backup ($($ExistingBackup.Name)). Skipping backup."
    pause
    exit 0
}

# Create timestamped backup name
$Timestamp = Get-Date -Format 'yyyy-MM-dd-HH-mm-ss'
$BackupName = "manual-backup-$Timestamp-$LatestCommit.zip"
$BackupPath = Join-Path $BackupDir $BackupName

# Create the compressed backup
Write-Host "Creating backup: $BackupPath"
Compress-Archive -Path $Include -DestinationPath $BackupPath -Force

# Retention: keep only the $BackupLimit most recent backups
$Backups = Get-ChildItem $BackupDir -Filter "manual-backup-*.zip" | Sort-Object LastWriteTime -Descending
if ($Backups.Count -gt $BackupLimit) {
    $ToDelete = $Backups | Select-Object -Skip $BackupLimit
    foreach ($OldBackup in $ToDelete) {
        Write-Host "Deleting old backup: $($OldBackup.Name)"
        Remove-Item $OldBackup.FullName -Force
    }
}

Write-Host "Backup complete. $BackupPath"
pause 