##REQUIRED VARS
param ($applicationName, $slotName, $rg)

##SLOT CREATE
$slotConfig = az webapp deployment slot list --resource-group $rg --name $applicationName --query "[?name=='$slotName']" | ConvertFrom-JSON

if($null -eq $slotConfig){
    Write-Host "Slot '$slotName' does not exist for rg/app '$rg/$applicationName'."

    az webapp deployment slot create --name $applicationName --resource-group $rg --slot $slotName --configuration-source $applicationName

    Write-Host "Slot '$slotName' created. Waiting 90 sec before the deployemnt"
}else{
    Write-Host "Slot '$($slotConfig.name)' already exists in app '$($slotConfig.repositorySiteName)'."
}

## Waiting 150 sec before the deployemnt 
Start-Sleep -Seconds 150