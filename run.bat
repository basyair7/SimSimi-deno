@echo off
cls
setlocal

:: Nama file yang akan dicek
set "filename=.env"

:: Cek apakah file ada
if exist "%filename%" (
    @REM deno task test
    @REM deno task dev
    deno task start

) else (
    echo File %filename% tidak ditemukan, membuat file baru...
    
    (
        echo TELEBOT_TOKEN=?
        echo TELEBOT_USERNAME=?
        echo REGION=?
        echo SIMSIMI_APIURL=?
        echo SIMSIMI_APIKEYS=?
    ) > "%filename%"

    echo File %filename% berhasil dibuat.
    echo Silahkan isi environment bot, jika perlu bantuan hubungi author repositori ini "%filename%"
)

endlocal

echo Press any key to continue...
pause > nul
echo Continuing script...