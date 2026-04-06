#!/bin/bash
set -e
echo "🚀 Setting up rn-health-tracker..."
command -v node >/dev/null 2>&1 || { echo "❌ Node.js 18+ required"; exit 1; }
npm install --legacy-peer-deps
echo "✅ Ready! Run: npx expo start"
