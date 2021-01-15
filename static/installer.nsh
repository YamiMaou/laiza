!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "QuietBrowser" "Software\Clients\StartMenuInternet\QuietBrowser\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\QuietBrowser" "" "QuietBrowser HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\QuietBrowser\Application" "AppUserModelId" "QuietBrowser"
  WriteRegStr SHCTX "SOFTWARE\Classes\QuietBrowser\Application" "ApplicationIcon" "$INSTDIR\QuietBrowser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\QuietBrowser\Application" "ApplicationName" "QuietBrowser"
  WriteRegStr SHCTX "SOFTWARE\Classes\QuietBrowser\Application" "ApplicationCompany" "QuietBrowser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\QuietBrowser\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\QuietBrowser\DefaultIcon" "DefaultIcon" "$INSTDIR\QuietBrowser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\QuietBrowser\shell\open\command" "" '"$INSTDIR\QuietBrowser.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "QuietBrowser" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "QuietBrowser" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser" "" "QuietBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\DefaultIcon" "" "$INSTDIR\QuietBrowser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\Capabilities" "ApplicationName" "QuietBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\Capabilities" "ApplicationIcon" "$INSTDIR\QuietBrowser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\Capabilities\FileAssociations" ".htm" "QuietBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\Capabilities\FileAssociations" ".html" "QuietBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\Capabilities\URLAssociations" "http" "QuietBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\Capabilities\URLAssociations" "https" "QuietBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\Capabilities\StartMenu" "StartMenuInternet" "QuietBrowser"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser\shell\open\command" "" "$INSTDIR\QuietBrowser.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\QuietBrowser"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\QuietBrowser"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "QuietBrowser"
!macroend