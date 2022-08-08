Write-Host "##vso[task.setvariable variable=InfrDeploy;isOutput=true]False"
Write-Host "##vso[task.setvariable variable=AppDeploy;isOutput=true]False"
$editedFiles = git diff HEAD HEAD~ --name-only
Write-Output "Infr Value: $($env:InfrDeploy)"
Write-Output "App Value: $($env:AppDeploy)"
$editedFiles | ForEach-Object {
    Write-Output $_
    Switch -Wildcard ($_ ) {
        'DevOps/*' { Write-Host "##vso[task.setvariable variable=InfrDeploy;isOutput=true]True"}
        'src/*' { Write-Host "##vso[task.setvariable variable=AppDeploy;isOutput=true]True"  }
        'test/*' { Write-Host "##vso[task.setvariable variable=AppDeploy;isOutput=true]True"}
        'package*' { Write-Host "##vso[task.setvariable variable=AppDeploy;isOutput=true]True"}
        # The rest of your path filters
    }

}

Write-Output "Infr Value: $($env:InfrDeploy)"
Write-Output "App Value: $($env:AppDeploy)"