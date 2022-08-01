param ($testUrl, $healthCheckEndpoint)
$uri = "$testUrl/$healthCheckEndpoint"
Write-Host "Testing $uri"

$Attempt = 0
$TimeOutSec = 8

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

while ($Attempt -lt 20) {
    $Attempt ++
    Write-Host " Attempting ping ($Attempt / 20) on $testUrl -> " -NoNewline
    try {
        $result = invoke-webrequest  -method Get -uri $uri -UseBasicParsing
        $jsonResult =  $result | ConvertFrom-Json
        
        if ($result.statuscode -eq 200 -and $jsonResult.status -eq "up") {
            Write-Host 'Service up.. at least'
            "##vso[task.complete result=Succeeded]"
            break;
        }
    } catch {
        Write-Host " $_"
        if($Attempt -eq 1){
            Start-Sleep -Seconds 20
        }
        else{
            Start-Sleep -Seconds 5
        }
            
        if ($Attempt -eq 20) {
            Write-Host " Retry limit reached. Failing task"
            "##vso[task.complete result=Failed]"
        }
    }
}