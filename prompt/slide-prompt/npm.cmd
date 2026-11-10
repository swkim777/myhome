@echo off
if /i "%1"=="dev" (
    if /i "%2"=="run" (
        "C:\Program Files\nodejs\npm.cmd" run dev
        exit /b %errorlevel%
    )
)
"C:\Program Files\nodejs\npm.cmd" %*
