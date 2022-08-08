Write-Host "##vso[task.setvariable variable=InfrDeploy]false"
Write-Host "##vso[task.setvariable variable=AppDeploy]false"
$editedFiles = git diff HEAD HEAD~ --name-only
Write-Output "Infr Value: $($env:InfrDeploy)"
Write-Output "App Value: $($env:AppDeploy)"
$editedFiles | ForEach-Object {
    Switch -Wildcard ($_ ) {
        'DevOps/*' { Write-Host "##vso[task.setvariable variable=InfrDeploy]true"}
        'src/*' { Write-Host "##vso[task.setvariable variable=AppDeploy]true"  }
        'test/*' { Write-Host "##vso[task.setvariable variable=AppDeploy]true"}
        'package*' { Write-Host "##vso[task.setvariable variable=AppDeploy]true"}
        # The rest of your path filters
    }

}

Write-Output "Infr Value: $($env:InfrDeploy)"
Write-Output "App Value: $($env:AppDeploy)"