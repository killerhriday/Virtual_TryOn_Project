#!/bin/bash

# Navigate to the script's directory
cd "$(dirname "$0")"

echo "🚀 Launching ImagiFit..."

# Start the Backend in the background
echo "📦 Starting Backend on port 3001..."
cd backend
node server.js &
BACKEND_PID=$!
cd ..

# Start the Frontend in the background
echo "🎨 Starting Frontend on port 5173..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Clean up background processes when the script is stopped (Ctrl+C)
trap "echo '🛑 Shutting down servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

# Give the backend a second to boot up
sleep 2

# Open the config page in the default Mac browser
echo "🔗 Opening Config Page in Browser..."
open "http://localhost:3001/config"

echo "✅ All systems running. Press Ctrl+C to stop."

# Wait indefinitely so the script doesn't exit (and kill the servers)
wait
