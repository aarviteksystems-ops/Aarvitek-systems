$ErrorActionPreference = 'Stop'
$nodeVersion = "v22.14.0"
$zipUrl = "https://nodejs.org/dist/$nodeVersion/node-$nodeVersion-win-x64.zip"
$installDir = "$env:LOCALAPPDATA\Programs\Nodejs"
$zipPath = "$env:TEMP\node.zip"

Write-Host "Downloading Node.js $nodeVersion..."
Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath

Write-Host "Extracting..."
if (Test-Path $installDir) { Remove-Item -Recurse -Force $installDir }
New-Item -ItemType Directory -Force -Path $installDir | Out-Null
Expand-Archive -Path $zipPath -DestinationPath $installDir -Force

$nodeBinDir = "$installDir\node-$nodeVersion-win-x64"

Write-Host "Updating PATH..."
$userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($userPath -notmatch [regex]::Escape($nodeBinDir)) {
    [Environment]::SetEnvironmentVariable("PATH", "$nodeBinDir;$userPath", "User")
}

Write-Host "Node.js successfully installed! Restart your terminal to apply the changes permanently."
