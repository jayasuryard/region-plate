# Region Plate - Regional Indian Food Tracker

A full-stack React Native app for tracking nutrition with region-specific Indian food data. 

**Frontend**: React Native (Expo) + TypeScript  
**Backend**: Express.js + Prisma ORM + SQLite

## 🎨 Design Philosophy

**Color Palette**: Deep forest green (#1B4332) + warm saffron (#F4A261), inspired by Indian spice markets

**Typography**:
- **Fraunces** - Serif font for numbers and headings (premium, distinctive)
- **DM Sans** - Sans-serif for body text (clean, readable)

## 🏗️ Architecture

```
┌─────────────────────────┐
│   React Native App      │
│   (Expo + TypeScript)   │
│                         │
│  - Home (Calorie Ring)  │
│  - Scan (Camera)        │
│  - Food Detail          │
│  - Profile              │
└───────────┬─────────────┘
            │ REST API
            │ HTTP Requests
            ▼
┌─────────────────────────┐
│   Express.js Server     │
│   (Node.js + Prisma)    │
│                         │
│  API Routes:            │
│  - /api/regions         │
│  - /api/foods           │
│  - /api/meals           │
│  - /api/profile         │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   SQLite Database       │
│   (Prisma ORM)          │
│                         │
│  Tables:                │
│  - User                 │
│  - Region               │
│  - Food                 │
│  - RegionalFood         │
│  - Ingredient           │
│  - Meal                 │
└─────────────────────────┘
```

## 📦 Installation

### Quick Start (Recommended)

```bash
# Install all dependencies (root + server)
npm install
cd server && npm install && cd ..

# Set up backend database
cd server
npx prisma db push
npm run seed
cd ..

# Start both server and app with one command! 🚀
npm run dev
```

This will start:
- ✅ Express server on `http://localhost:3000`
- ✅ Expo dev server for the mobile app

### Manual Setup (Alternative)

#### Backend Server Setup

```bash
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Initialize database and seed data
npx prisma db push
npm run seed

# Start server (runs on http://localhost:3000)
npm start
```

### Mobile App Setup

```bash
# Return to root directory
cd ..

# Install dependencies
npm install

# Set up environment variables for API connection
cp .env.local.example .env.local
# Edit .env.local and add your local IP address

# Start the development server
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

## 🌐 Connecting Mobile App to Backend

When testing on a **physical device**, you need to use your computer's local IP address:

### Find Your IP Address:

**macOS/Linux:**
```bash
ipconfig getifaddr en0
# or
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
# Look for IPv4 Address
```

### Update .env.local:
```env
EXPO_PUBLIC_API_URL=http://YOUR_IP_ADDRESS:3000/api
# Example: EXPO_PUBLIC_API_URL=http://192.168.1.100:3000/api
```

## ✨ Features

### 🏠 **Home Screen**
- **Calorie Ring**: Visual progress indicator showing daily calorie consumption vs goal
- **Meal Cards**: Each logged meal displays:
  - Food name with regional tag (e.g., "Punjab · Ghee added" vs "Rajasthan · No oil")
  - Calories, protein, and quantity at a glance
  - Time logged
- **Macro Summary**: Protein tracking and meal count

### 📸 **Scan Screen**
- **Camera Integration**: Live camera viewfinder for food scanning
- **Regional Detection**: Shows detected food with region-specific variant
  - "Punjab · Ghee added"
  - "Rajasthan · No oil"
  - "Tamil Nadu · Ghee roasted"
- **Quantity Adjustment**: +/− buttons to adjust portion size inline
- **Quick Logging**: One-tap meal confirmation

### 🔍 **Food Detail Screen** (Explore Tab)
- **Portion Picker**: Quick selection (Small/Medium/Large) or custom gram input
- **Nutrition Display**: Dynamic calories and macros based on selected portion
- **Visual Bar Chart**: Macro breakdown visualization (Protein/Carbs/Fat)
- **Ingredient Breakdown**: Gram-level ingredient list with:
  - Individual quantities
  - Visual percentage bars
  - Total composition analysis

### 👤 **Profile Screen**
- **Region Selector**:
  - Primary region selection
  - Mix multiple regions (e.g., Karnataka + Delhi)
  - Reflects real eating patterns
- **Diet Preferences**:
  - Indian-specific filters:
    - No onion/garlic (Jain)
    - Vegetarian
    - Vegan
    - Gluten-free
- **Daily Goals**: Adjustable calorie and protein targets

## 🗄️ Database Schema (Prisma)

The app uses Prisma ORM with SQLite for local data storage:

- **User**: Profile with region preferences, diet restrictions, and goals
- **Region**: Indian regions with typical ingredients and characteristics
- **Food**: Base food items (Chapati, Dosa, Paratha, etc.)
- **RegionalFood**: Region-specific variants with unique nutrition profiles
- **Ingredient**: Detailed ingredient breakdown per regional food
- **Meal**: Logged meals with portion tracking
- **CustomRecipe**: User-defined recipes with nutritional data

## 🛠️ Tech Stack

- **Frontend**: React Native (Expo)
- **Navigation**: Expo Router (file-based routing)
- **Database**: Prisma ORM + SQLite
- **Camera**: expo-camera
- **Charts**: react-native-chart-kit
- **Fonts**: @expo-google-fonts (Fraunces + DM Sans)
- **Language**: TypeScript

## 📦 Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start the development server
npm start
```

## 🚀 Running the App

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 Screens

1. **Home** (`/`) - Calorie ring, meal history, macro tracking
2. **Scan** (`/scan`) - Camera-based food scanning with regional detection
3. **Food Detail** (`/explore`) - Detailed nutrition breakdown with ingredient analysis
4. **Profile** (`/profile`) - User preferences, region selection, diet filters

## 🎯 Core Differentiation

**Regional Accuracy**: The same food item (e.g., Chapati) has different nutritional values based on regional preparation:
- Punjab: Made with ghee, higher calories (~130 kcal)
- Rajasthan: Made without oil, lower calories (~90 kcal)
- Maharashtra: Bhakri style with jowar, different macro profile

This regional granularity makes nutrition tracking more accurate for Indian users.

## 🔮 Future Features

- AI-powered food recognition via GPT-4 Vision
- Backend API integration (Node.js + Supabase/PostgreSQL)
- Meal planning with regional suggestions
- Social features (share recipes, regional food discoveries)
- Integration with health apps
- Voice logging in multiple Indian languages

## 📄 License

MIT


- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
