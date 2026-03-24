# Region Plate - Complete Setup Guide

## 🎯 Project Overview

Region Plate is a full-stack mobile app for tracking Indian food nutrition with **region-specific accuracy**. The same food (e.g., Chapati) has different nutritional values based on how it's prepared in different regions.

### Example: Chapati
- **Punjab**: Made with ghee → 260 kcal per 100g
- **Rajasthan**: Made without oil → 180 kcal per 100g

This regional granularity makes nutrition tracking more accurate for Indian users.

## 📁 Project Structure

```
region-plate/
├── app/                          # React Native app screens
│   ├── (tabs)/
│   │   ├── index.tsx            # Home screen (calorie ring, meals)
│   │   ├── scan.tsx             # Camera scan screen
│   │   ├── explore.tsx          # Food detail screen
│   │   └── profile.tsx          # Profile & preferences
│   └── _layout.tsx              # Root layout with fonts
├── components/                   # Reusable UI components
│   ├── calorie-ring.tsx         # SVG calorie progress ring
│   ├── meal-card.tsx            # Meal display card
│   └── region-tag.tsx           # Regional food tag
├── constants/
│   └── theme.ts                 # Color palette & fonts
├── lib/
│   └── api-client.ts            # API client for backend
└── server/                       # Express.js backend
    ├── routes/                   # API endpoints
    │   ├── regions.js
    │   ├── foods.js
    │   ├── meals.js
    │   └── profile.js
    ├── prisma/
    │   ├── schema.prisma         # Database schema
    │   ├── seed.js               # Sample data
    │   └── dev.db                # SQLite database (generated)
    ├── lib/
    │   └── prisma.js             # Prisma client
    └── app.js                    # Express app entry
```

## 🚀 Quick Start

### Option 1: Start Everything at Once (Recommended) 🎯

```bash
# One-time setup
npm install
cd server && npm install && cd ..
cd server && npx prisma db push && npm run seed && cd ..

# Every time you develop (single command!)
npm run dev
```

This starts both the backend server and mobile app simultaneously!

### Option 2: Start Separately (Manual)

#### 1️⃣ Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Initialize database
npx prisma db push

# Seed with sample data (regions & foods)
npm run seed

# Start server on http://localhost:3000
npm start
```

**Verify it's working:**
```bash
curl http://localhost:3000/api/regions
# Should return JSON array of Indian regions
```

### 2️⃣ Mobile App Setup

```bash
# Return to root directory
cd ..

# Install dependencies
npm install

# Configure API URL (important!)
cp .env.local.example .env.local

# Edit .env.local and set your IP:
# EXPO_PUBLIC_API_URL=http://YOUR_IP:3000/api

# Start Expo
npm start
```

## 🔗 API Integration

The mobile app connects to the backend via REST API using the `apiClient`:

```typescript
import { apiClient } from '@/lib/api-client';

// Example: Get today's meals
const meals = await apiClient.getTodayMeals(userId);

// Example: Log a new meal
await apiClient.logMeal({
  userId: 'user-123',
  foodId: 'chapati-1',
  regionalFoodId: 'punjab-chapati',
  portionSize: 'Medium',
  quantityGrams: 50,
  calories: 130,
  protein: 4,
  carbs: 24,
  fat: 2,
});
```

## 📊 Database Schema

### Key Models:

**User**
- Profile with region preferences
- Diet restrictions (Jain, vegetarian, etc.)
- Daily calorie & protein goals

**Region**
- Indian regions (Punjab, Tamil Nadu, etc.)
- Typical ingredients and characteristics

**Food**
- Base food items (Chapati, Dosa, etc.)

**RegionalFood** ⭐
- Region-specific variants
- Unique nutrition per 100g
- Preparation notes ("Ghee added", "No oil")

**Ingredient**
- Gram-level breakdown per regional food
- Displayed as bar charts in the app

**Meal**
- User meal logs with timestamps
- Calculated nutrition based on portion

## 🎨 Design System

### Colors
```typescript
forestGreen: '#1B4332'      // Primary (buttons, text)
saffron: '#F4A261'          // Secondary (highlights, rings)
warmCream: '#FFF9F0'        // Background
```

### Fonts
- **Fraunces**: Numbers, headings (serif, premium feel)
- **DM Sans**: Body text (sans-serif, readable)

## 🌟 Key Features Implemented

✅ **Home Screen**
- Animated calorie ring (SVG)
- Meal cards with regional tags
- Protein tracking

✅ **Scan Screen**
- Camera integration (expo-camera)
- Inline quantity adjustment
- Regional variant display

✅ **Food Detail Screen**
- Portion size picker
- Dynamic nutrition calculation
- Bar chart for macros
- Ingredient breakdown with percentages

✅ **Profile Screen**
- Primary & secondary regions
- Indian-specific diet filters
- Adjustable daily goals

✅ **Backend API**
- 4 resource endpoints (regions, foods, meals, profile)
- Seeded database with 6 regions, 3 foods
- Regional variants with authentic ingredients

## 📱 Testing

### Test the API:
```bash
# Get all regions
curl http://localhost:3000/api/regions

# Get all foods with regional variants
curl http://localhost:3000/api/foods

# Search for a food
curl http://localhost:3000/api/foods/search/dosa
```

### Test the Mobile App:
1. Ensure backend is running
2. Update `.env.local` with your IP
3. Start Expo: `npm start`
4. Press `i` (iOS) or `a` (Android)
5. Navigate through tabs to test UI components

## 🔮 Next Steps (Future Enhancements)

- [ ] AI food recognition (GPT-4 Vision API)
- [ ] User authentication (email/OAuth)
- [ ] Cloud database (PostgreSQL on Supabase/Railway)
- [ ] Image upload for meal photos
- [ ] Weekly meal planning
- [ ] Social features (share recipes)
- [ ] Multiple language support (Hindi, Tamil, etc.)
- [ ] Apple Health / Google Fit integration

## 🐛 Troubleshooting

### Issue: "Network request failed" in mobile app
**Solution**: Make sure:
1. Backend server is running (`cd server && npm start`)
2. `.env.local` has correct IP address (not localhost!)
3. Phone and computer are on same WiFi network

### Issue: "Cannot connect to database"
**Solution**:
```bash
cd server
npx prisma db push
npm run seed
```

### Issue: Prisma client errors
**Solution**:
```bash
cd server
npx prisma generate
```

## 📄 License

MIT

---

**Built with**: React Native, Expo, Express.js, Prisma, TypeScript, SQLite
