#!/bin/bash

# Clear the screen
clear

# Set the environment variables
FILENAME="deno.lock"
# PROGRAM="test/server.ts"
PROGRAM="src/server.ts"
# PROGRAM="test/main.ts"

# Check if the lock file exists
if [ -f "$FILENAME" ]; then
    rm "$FILENAME"
    deno cache --reload --config=deno.json "$PROGRAM"
else
    deno cache --reload --config=deno.json "$PROGRAM"
fi

# Wait for the user to press any key
read -n 1 -s -r -p "Press any key to continue..."
echo "Continuing script..."
