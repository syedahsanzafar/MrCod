@echo off
taskkill /F /IM chrome.exe /T
start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --kiosk-printing --kiosk "file:///D:/Mr_Cod/index.html"