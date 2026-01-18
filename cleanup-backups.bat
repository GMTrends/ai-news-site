@echo off
REM Backup Cleanup Batch File - AI News Site
REM This batch file runs the PowerShell cleanup script to implement backup retention policy

echo.
echo ========================================
echo    AI News Site - Backup Cleanup
echo ========================================
echo.
echo This will clean up old backups to keep only the latest 5.
echo.

REM Check if PowerShell is available
powershell -Command "Get-Host" >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PowerShell is not available on this system.
    echo Please run the cleanup manually using the PowerShell script.
    pause
    exit /b 1
)

REM Run the PowerShell cleanup script
echo Running backup cleanup script...
powershell -ExecutionPolicy Bypass -File "cleanup-backups.ps1"

echo.
echo Cleanup process completed.
pause
