@echo off
cls
@REM deno run --config=deno.json --allow-net --allow-read --allow-env test/server.ts
deno run --config=deno.json --allow-net --allow-read --allow-env src/server.ts

echo Press any key to continue...
pause > nul
echo Continuing script...