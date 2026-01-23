$content = Get-Content 'c:\Users\Acer\Documents\MRCOD\MrCOd.html' -Raw
$content = $content -replace '(?m)^;\r?\n', ''
Set-Content 'c:\Users\Acer\Documents\MRCOD\MrCOd.html' $content -Encoding UTF8
