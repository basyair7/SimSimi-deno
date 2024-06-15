@echo off
cls
deno cache --reload --config=tsconfig.json --import-map=import_map.json src/server.ts

echo Press any key to continue...
pause > nul
echo Continuing script...