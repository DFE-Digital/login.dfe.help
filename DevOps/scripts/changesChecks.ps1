Write-Output "##vso[task.setvariable variable=InfrDeploy]False"
Write-Output "##vso[task.setvariable variable=AppDeploy]False"
$editedFiles = git diff HEAD HEAD~ --name-only
Write-Output "Infr Value: $($env:InfrDeploy)"
Write-Output "App Value: $($env:AppDeploy)"
$editedFiles | ForEach-Object {
    Switch -Wildcard ($_ ) {
        'DevOps/*' { Write-Output "##vso[task.setvariable variable=InfrDeploy]True"}
        'src/*' { Write-Output "##vso[task.setvariable variable=AppDeploy]True"  }
        'test/*' { Write-Output "##vso[task.setvariable variable=AppDeploy]True"}
        'package*' { Write-Output "##vso[task.setvariable variable=AppDeploy]True"}
        # The rest of your path filters
    }

}

Write-Output "Infr Value: $($env:InfrDeploy)"
Write-Output "App Value: $($env:AppDeploy)"