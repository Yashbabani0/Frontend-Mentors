#!/usr/bin/env pwsh

# Ensure we're in the right directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Step 1: Run npm build
Write-Host "Running npm build..."
npm run build

# Check if build was successful
if (-not $?) {
    Write-Error "Build failed. Exiting script."
    exit 1
}

# Step 2: Create .vercel/output/static directory
Write-Host "Creating .vercel/output/static directory..."
New-Item -ItemType Directory -Path ".vercel/output/static" -Force | Out-Null

# Step 3: Copy all files from dist/ to .vercel/output/static/
Write-Host "Copying files from dist/ to .vercel/output/static/..."
Copy-Item -Path "dist/*" -Destination ".vercel/output/static/" -Recurse -Force

# Step 4: Create config.json file with necessary configuration
Write-Host "Creating config.json file..."
$configJson = @{
    version = 3
    routes = @(
        @{
            src = "^/assets/(.*)$"
            headers = @{
                "cache-control" = "public, max-age=31536000, immutable"
            }
            continue = $true
        }
        @{
            handle = "filesystem"
        }
        @{
            src = "/.*"
            dest = "/index.html"
        }
    )
} | ConvertTo-Json -Depth 10

Set-Content -Path ".vercel/output/config.json" -Value $configJson

Write-Host "Build completed successfully! You can now run 'vercel deploy --prebuilt' to deploy to Vercel."

