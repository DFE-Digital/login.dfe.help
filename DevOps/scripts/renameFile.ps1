param ($applicationName, $environmentName)
$fileName = ".\Publish\config\login.dfe.$(applicationName).$(environmentName).json"
    if (Test-Path $fileName) {
        write-host existing config found, deleting
        Remove-Item $fileName
    }
write-host renaming pre-built config for $(applicationName) [$(environmentName)]
Rename-Item -path .\Publish\config\$(applicationName)-standalone.json -newname $fileName