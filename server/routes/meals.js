const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get all meals for a user
router.get('/user/:userId', async (req, res, next) => {
  try {
    const meals = await prisma.meal.findMany({
      where: { userId: req.params.userId },
      include: {
        food: {
          include: {
            regionalVariants: {
              include: {
                region: true,
              },
            },
          },
        },
      },
      orderBy: { loggedAt: 'desc' },
    });
    res.json(meals);
  } catch (error) {
    next(error);
  }
});

// Get today's meals for a user
router.get('/user/:userId/today', async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const meals = await prisma.meal.findMany({
      where: {
        userId: req.params.userId,
        loggedAt: {
          gte: today,
        },
      },
      include: {
        food: {
          include: {
            regionalVariants: {
              include: {
                region: true,
              },
            },
          },
        },
      },
      orderBy: { loggedAt: 'desc' },
    });
    res.json(meals);
  } catch (error) {
    next(error);
  }
});

// Log a new meal
router.post('/', async (req, res, next) => {
  try {
    const {
      userId,
      foodId,
      regionalFoodId,
      portionSize,
      quantityGrams,
      calories,
      protein,
      carbs,
      fat,
      mealType,
      notes,
      photoUrl,
    } = req.body;
    
    const meal = await prisma.meal.create({
      data: {
        userId,
        foodId,
        regionalFoodId,
        portionSize,
        quantityGrams,
        calories,
        protein,
        carbs,
        fat,
        mealType,
        notes,
        photoUrl,
      },
      include: {
        food: {
          include: {
            regionalVariants: {
              include: {
                region: true,
              },
            },
          },
        },
      },
    });
    
    res.status(201).json(meal);
  } catch (error) {
    next(error);
  }
});

// Delete a meal
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.meal.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get nutrition summary for a date range
router.get('/user/:userId/summary', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    const meals = await prisma.meal.findMany({
      where: {
        userId: req.params.userId,
        loggedAt: {
          gte: new Date(startDate || Date.now()),
          lte: new Date(endDate || Date.now()),
        },
      },
    });
    
    const summary = meals.reduce(
      (acc, meal) => ({
        totalCalories: acc.totalCalories + meal.calories,
        totalProtein: acc.totalProtein + meal.protein,
        totalCarbs: acc.totalCarbs + meal.carbs,
        totalFat: acc.totalFat + meal.fat,
        mealCount: acc.mealCount + 1,
      }),
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0, mealCount: 0 }
    );
    
    res.json(summary);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
