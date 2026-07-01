@echo off

git switch main

echo Executing git pull...
git pull
if %errorlevel% neq 0 (
    echo Error executing git pull.
    pause
    exit /b %errorlevel%
)

echo git pull completed successfully.

echo Executing docker-compose build...
docker-compose build
if %errorlevel% neq 0 (
    echo Error executing docker-compose build.
    pause
    exit /b %errorlevel%
)

echo docker-compose build completed successfully.

pause
