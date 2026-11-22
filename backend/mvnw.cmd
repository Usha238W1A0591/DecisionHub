@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------
@echo off
set MAVEN_PROJECTBASEDIR=%~dp0

for /F "usebackq tokens=1,2 delims==" %%a in ("%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.properties") do (
    if "%%a"=="distributionUrl" set DISTRIBUTION_URL=%%b
)

set MAVEN_HOME=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6
set MVN_EXE=%MAVEN_HOME%\bin\mvn.cmd

if exist "%MVN_EXE%" goto run

echo Downloading Maven...
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol='Tls12'; Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip' -OutFile '%USERPROFILE%\maven.zip'}"
powershell -Command "Expand-Archive -Path '%USERPROFILE%\maven.zip' -DestinationPath '%USERPROFILE%\.m2\wrapper\dists' -Force"
rename "%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6" apache-maven-3.9.6

:run
"%MVN_EXE%" %*
