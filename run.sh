#!/bin/bash

# Clear the screen
clear

# Set the environment variables
FILENAME=".env"
CREATE_ENV=true
DENO_TASK_STATE="dev"

# Check if the environment file exists or not
if [ "$CREATE_ENV" = true ]; then
    if [ -f "$FILENAME" ]; then
        deno task "$DENO_TASK_STATE"
    else
        echo "File $FILENAME tidak ditemukan, membuat file baru..."
        {
            echo "# Telegram Environment"
            echo "TELEBOT_TOKEN="
            echo "TELEBOT_USERNAME="
            echo "SERVERTIMEZONE="
            echo ""
            echo "# SimSimi Environment"
            echo "REGION="
            echo "SIMSIMI_APIURL="
            echo "SIMSIMI_APIKEYS="
        } > "$FILENAME"

        echo "File $FILENAME berhasil dibuat."
        echo "Silahkan isi environment bot, jika perlu bantuan hubungi author repositori ini \"$FILENAME\""
    fi
else
    deno task "$DENO_TASK_STATE"
fi

# Wait for the user to press any key
read -n 1 -s -r -p "Press any key to continue..."
echo "Continuing script..."
