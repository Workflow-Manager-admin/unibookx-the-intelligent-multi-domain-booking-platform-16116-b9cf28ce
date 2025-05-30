#!/bin/bash
cd /home/kavia/workspace/code-generation/unibookx-the-intelligent-multi-domain-booking-platform-16116-b9cf28ce/uni_bookx_platform
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

