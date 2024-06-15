@echo off
cls

setlocal

set "filename=deno.lock"
@REM set "program=test/server.ts"
set "program=src/server.ts"

if exist "%filename%" (
    del %filename%
    deno cache --reload --config=deno.json %program%
) else (
    deno cache --reload --config=deno.json %program%
)

endlocal

echo Press any key to continue...
pause > nul
echo Continuing script...