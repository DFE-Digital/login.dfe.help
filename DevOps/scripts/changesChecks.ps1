$editedFiles = git diff HEAD HEAD~ --name-only
Write-Output "Infr Value: $($env:InfrDeploy)"
Write-Output "App Value: $($env:AppDeploy)"
$editedFiles | ForEach-Object {
    Switch -Wildcard ($_ ) {
        'DevOps/*' { Write-Host "##vso[task.setvariable variable=InfrDeploy]True" Write-Output "Infr:true" }
        'src/*' { Write-Host "##vso[task.setvariable variable=AppDeploy]True" Write-Output "App:true" }
        'test/*' { Write-Host "##vso[task.setvariable variable=AppDeploy]True" Write-Output "App:true"}
        'package*' { Write-Host "##vso[task.setvariable variable=AppDeploy]True"  Write-Output "App:true"}
        # The rest of your path filters
    }

}

Write-Output "Infr Value: $($env:InfrDeploy)"
Write-Output "App Value: $($env:AppDeploy)"