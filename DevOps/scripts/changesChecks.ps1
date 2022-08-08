$editedFiles = git diff HEAD HEAD~ --name-only
$editedFiles | ForEach-Object {
    Switch -Wildcard ($_ ) {
        'DevOps/*' { Write-Output "##vso[task.setvariable variable=InfrDeploy]True" Write-Output "Infr:true" }
        'src/*' { Write-Output "##vso[task.setvariable variable=AppDeploy]True" Write-Output "App:true" }
        'test/*' { Write-Output "##vso[task.setvariable variable=AppDeploy]True" Write-Output "App:true"}
        'package*' { Write-Output "##vso[task.setvariable variable=AppDeploy]True"  Write-Output "App:true"}
        # The rest of your path filters
    }

}