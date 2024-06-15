@echo off
cls
@REM deno cache --reload --config=deno.json test/server.ts
deno cache --reload --config=deno.json src/server.ts

echo Press any key to continue...
pause > nul
echo Continuing script...