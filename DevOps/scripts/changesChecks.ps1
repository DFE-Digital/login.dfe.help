$Check= "true"
$editedFiles = git diff HEAD HEAD~ --name-only
$editedFiles | ForEach-Object {
    Write-Output $_
    Switch -Wildcard ($_ ) {
        'DevOps/*' { Write-Output "##vso[task.setvariable variable=InfrDeploy;isOutput=true]$Check" }
        'src/*' { Write-Host "##vso[task.setvariable variable=AppDeploy;isOutput=true]$Check"  }
        'test/*' { Write-Host "##vso[task.setvariable variable=AppDeploy;isOutput=true]$Check" }
        '*package*' { Write-Host "##vso[task.setvariable variable=AppDeploy;isOutput=true]$Check" }
        # The rest of your path filters
    }

}