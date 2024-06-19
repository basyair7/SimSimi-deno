@echo off
cls
setlocal

:: variable file environment
set filename=.env

:: set configuration environment
:: true or false
set create_env=true

:: deno task state
:: test, dev, start
set deno_task_state=dev

:: check if file env exist or not
if %create_env% == true (
    if exist "%filename%" (
        deno task %deno_task_state%
    ) else (
        echo File %filename% tidak ditemukan, membuat file baru...
        (
            echo TELEBOT_TOKEN=
            echo TELEBOT_USERNAME=
            echo REGION=
            echo SIMSIMI_APIURL=
            echo SIMSIMI_APIKEYS=
        ) > "%filename%"

        echo File %filename% berhasil dibuat.
        echo Silahkan isi environment bot, jika perlu bantuan hubungi author repositori ini "%filename%"
    )
) else (
    deno task %deno_task_state%
)
endlocal

echo Press any key to continue...
pause > nul
echo Continuing script...