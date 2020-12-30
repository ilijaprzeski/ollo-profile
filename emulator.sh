#!/bin/bash
AVD_NAME="Pixel_2_XL_API_Q"
STATE=`adb get-state`

if [ -n "$STATE" ]; then
    echo "An emulator is already running."
    exit 0
else
    echo "Launching Android virtual device..."
    "$ANDROID_HOME/emulator/emulator" -avd "$AVD_NAME" -wipe-data
fi

