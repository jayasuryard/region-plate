# Region Plate Server

Express.js backend API for the Region Plate food tracking app.

## Features

- **Regional Food Database**: Prisma ORM with SQLite
- **REST API**: Full CRUD operations for foods, meals, and user profiles
- **Regional Variants**: Same food with different nutrition based on region
- **Ingredient Tracking**: Detailed breakdown of ingredients per regional food

## Setup

```bash
# Install dependencies
npm install

# Initialize database and seed data
npx prisma db push
npm run seed

# Start server
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Regions
- `GET /api/regions` - Get all regions
- `GET /api/regions/:id` - Get region by ID with foods

### Foods
- `GET /api/foods` - Get all foods with regional variants
- `GET /api/foods/:id` - Get food by ID
- `GET /api/foods/regional/:foodId/:regionId` - Get specific regional variant
- `GET /api/foods/search/:query` - Search foods by name

### Meals
- `GET /api/meals/user/:userId` - Get all meals for a user
- `GET /api/meals/user/:userId/today` - Get today's meals
- `POST /api/meals` - Log a new meal
- `DELETE /api/meals/:id` - Delete a meal
- `GET /api/meals/user/:userId/summary?startDate=&endDate=` - Get nutrition summary

### Profile
- `GET /api/profile/:id` - Get user profile
- `POST /api/profile` - Create or update user profile
- `PATCH /api/profile/:id/goals` - Update user goals

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

## Database Schema

See `prisma/schema.prisma` for the complete database schema.

Key models:
- **User**: User profile with preferences and goals
- **Region**: Indian regions (Punjab, Tamil Nadu, etc.)
- **Food**: Base food items
- **RegionalFood**: Regional variants with unique nutrition
- **Ingredient**: Ingredient breakdown per regional food
- **Meal**: User meal logs

## Seeded Data

The database includes sample data for:
- 6 Indian regions (Punjab, Rajasthan, Tamil Nadu, Karnataka, Gujarat, Maharashtra)
- 3 foods (Chapati, Dosa, Paratha)
- Regional variants with authentic ingredient breakdowns

## Tech Stack

- Express.js
- Prisma ORM
- SQLite
- CORS enabled for mobile app
