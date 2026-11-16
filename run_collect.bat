@echo off
REM ============================================================
REM  Launcher for collect_toomore_files.ps1
REM  Keep BOTH files in the Toomore project root, then
REM  double-click this file. Output goes to your Desktop:
REM    Toomore_clarity_audit\   and   Toomore_clarity_audit.zip
REM ============================================================
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0collect_toomore_files.ps1" -Root "%~dp0"
echo.
pause
