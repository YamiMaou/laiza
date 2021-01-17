!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "Laizaser" "Software\Clients\StartMenuInternet\Laizaser\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\Laizaser" "" "Laizaser HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\Laizaser\Application" "AppUserModelId" "Laizaser"
  WriteRegStr SHCTX "SOFTWARE\Classes\Laizaser\Application" "ApplicationIcon" "$INSTDIR\Laizaser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Laizaser\Application" "ApplicationName" "Laizaser"
  WriteRegStr SHCTX "SOFTWARE\Classes\Laizaser\Application" "ApplicationCompany" "Laizaser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Laizaser\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Laizaser\DefaultIcon" "DefaultIcon" "$INSTDIR\Laizaser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Laizaser\shell\open\command" "" '"$INSTDIR\Laizaser.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "Laizaser" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "Laizaser" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser" "" "Laizaser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\DefaultIcon" "" "$INSTDIR\Laizaser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\Capabilities" "ApplicationName" "Laizaser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\Capabilities" "ApplicationIcon" "$INSTDIR\Laizaser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\Capabilities\FileAssociations" ".htm" "Laizaser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\Capabilities\FileAssociations" ".html" "Laizaser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\Capabilities\URLAssociations" "http" "Laizaser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\Capabilities\URLAssociations" "https" "Laizaser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\Capabilities\StartMenu" "StartMenuInternet" "Laizaser"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser\shell\open\command" "" "$INSTDIR\Laizaser.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\Laizaser"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\Laizaser"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "Laizaser"
!macroend