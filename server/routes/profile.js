const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get user profile
router.get('/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Parse JSON fields
    const userWithParsedData = {
      ...user,
      secondaryRegions: JSON.parse(user.secondaryRegions || '[]'),
      dietPreferences: JSON.parse(user.dietPreferences || '[]'),
    };
    
    res.json(userWithParsedData);
  } catch (error) {
    next(error);
  }
});

// Create or update user profile
router.post('/', async (req, res, next) => {
  try {
    const {
      id,
      name,
      primaryRegion,
      secondaryRegions,
      dietPreferences,
      dailyCalorieGoal,
      dailyProteinGoal,
    } = req.body;
    
    const userData = {
      name,
      primaryRegion,
      secondaryRegions: JSON.stringify(secondaryRegions || []),
      dietPreferences: JSON.stringify(dietPreferences || []),
      dailyCalorieGoal: dailyCalorieGoal || 2000,
      dailyProteinGoal: dailyProteinGoal || 50,
    };
    
    let user;
    if (id) {
      // Update existing user
      user = await prisma.user.update({
        where: { id },
        data: userData,
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: userData,
      });
    }
    
    const userWithParsedData = {
      ...user,
      secondaryRegions: JSON.parse(user.secondaryRegions),
      dietPreferences: JSON.parse(user.dietPreferences),
    };
    
    res.status(id ? 200 : 201).json(userWithParsedData);
  } catch (error) {
    next(error);
  }
});

// Update user goals
router.patch('/:id/goals', async (req, res, next) => {
  try {
    const { dailyCalorieGoal, dailyProteinGoal } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        ...(dailyCalorieGoal && { dailyCalorieGoal }),
        ...(dailyProteinGoal && { dailyProteinGoal }),
      },
    });
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
