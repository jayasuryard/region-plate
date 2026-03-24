# Region Plate - Available Commands

## 🚀 Main Commands

### Development
```bash
npm run dev
```
**Starts both server AND app together** ⭐ (Recommended for development)
- Backend server on `http://localhost:3000`
- Expo dev server for mobile app
- Color-coded output: SERVER (cyan), APP (magenta)

### Individual Services
```bash
npm run start:server    # Start backend server only
npm run start:app       # Start mobile app only (same as npm start)
```

## 📱 Mobile App Commands

```bash
npm start              # Start Expo dev server
npm run android        # Open on Android emulator
npm run ios            # Open on iOS simulator  
npm run web            # Open in web browser
```

## 🔧 Backend Server Commands

```bash
cd server

npm start              # Start Express server
npm run seed           # Seed database with sample data
npx prisma db push     # Create/update database schema
npx prisma generate    # Generate Prisma client
npx prisma studio      # Open Prisma Studio (database GUI)
```

## 🛠️ Utility Commands

```bash
npm run lint           # Run ESLint
npm run reset-project  # Reset to clean slate
```

## 💡 Typical Development Workflow

### First Time Setup:
```bash
# 1. Install dependencies
npm install
cd server && npm install && cd ..

# 2. Set up database
cd server
npx prisma db push
npm run seed
cd ..

# 3. Configure API URL (if testing on physical device)
cp .env.local.example .env.local
# Edit .env.local with your IP address

# 4. Start development
npm run dev
```

### Daily Development:
```bash
# Just run this every time!
npm run dev

# Then press in the Expo terminal:
# - 'i' for iOS simulator
# - 'a' for Android emulator
# - 'w' for web browser
```

## 🧪 Testing

### Test Backend API:
```bash
# Make sure server is running first (npm run dev)

# Test regions endpoint
curl http://localhost:3000/api/regions

# Test foods endpoint
curl http://localhost:3000/api/foods

# Or run the test script
cd server && bash test-api.sh
```

### Test Mobile App:
1. Ensure backend is running
2. Update `.env.local` with your IP (for physical devices)
3. Start app: `npm run dev`
4. Open on device/simulator
5. Navigate through tabs to test features

## 📊 Database Commands

```bash
cd server

# View database in browser GUI
npx prisma studio

# Reset database (careful!)
rm prisma/dev.db
npx prisma db push
npm run seed

# Create a migration (for production)
npx prisma migrate dev --name init
```

## 🐛 Troubleshooting Commands

### Fix Prisma Issues:
```bash
cd server
rm -rf node_modules
npm install
npx prisma generate
```

### Fix Mobile App Issues:
```bash
# Clear Expo cache
npx expo start -c

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Check What's Running:
```bash
# Check if server is running
curl http://localhost:3000/api/regions

# Check Node processes
lsof -i :3000    # Check what's on port 3000
lsof -i :8081    # Check what's on port 8081 (Expo)
```

## 🎯 Quick Reference

| Command | What It Does |
|---------|-------------|
| `npm run dev` | ⭐ Start server + app (use this!) |
| `npm start` | Start mobile app only |
| `npm run android` | Open Android emulator |
| `npm run ios` | Open iOS simulator |
| `cd server && npm start` | Start backend only |
| `cd server && npm run seed` | Add sample data to database |

---

**Pro Tip**: Keep `npm run dev` running during development. It auto-restarts the server when you make changes and hot-reloads the mobile app! 🔥
