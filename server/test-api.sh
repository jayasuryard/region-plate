#!/bin/bash

# Simple test script to verify API endpoints

API_URL="http://localhost:3000/api"

echo "Testing Region Plate API..."
echo "=============================="
echo ""

echo "1. Testing /api/regions"
curl -s "$API_URL/regions" | json_pp
echo ""

echo "2. Testing /api/foods"
curl -s "$API_URL/foods" | json_pp
echo ""

echo "3. Testing food search"
curl -s "$API_URL/foods/search/chapati" | json_pp
echo ""

echo "=============================="
echo "API test complete!"
echo ""
echo "If you see JSON data above, the API is working correctly!"
echo "If you see errors, make sure the server is running:"
echo "  cd server && npm start"
