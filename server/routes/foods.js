const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get all foods with regional variants
router.get('/', async (req, res, next) => {
  try {
    const foods = await prisma.food.findMany({
      include: {
        regionalVariants: {
          include: {
            region: true,
            ingredients: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
    res.json(foods);
  } catch (error) {
    next(error);
  }
});

// Get food by ID
router.get('/:id', async (req, res, next) => {
  try {
    const food = await prisma.food.findUnique({
      where: { id: req.params.id },
      include: {
        regionalVariants: {
          include: {
            region: true,
            ingredients: true,
          },
        },
      },
    });
    
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    
    res.json(food);
  } catch (error) {
    next(error);
  }
});

// Get regional variant by food and region
router.get('/regional/:foodId/:regionId', async (req, res, next) => {
  try {
    const regionalFood = await prisma.regionalFood.findFirst({
      where: {
        foodId: req.params.foodId,
        regionId: req.params.regionId,
      },
      include: {
        food: true,
        region: true,
        ingredients: true,
      },
    });
    
    if (!regionalFood) {
      return res.status(404).json({ error: 'Regional variant not found' });
    }
    
    res.json(regionalFood);
  } catch (error) {
    next(error);
  }
});

// Search foods by name
router.get('/search/:query', async (req, res, next) => {
  try {
    const foods = await prisma.food.findMany({
      where: {
        name: {
          contains: req.params.query,
          mode: 'insensitive',
        },
      },
      include: {
        regionalVariants: {
          include: {
            region: true,
            ingredients: true,
          },
        },
      },
    });
    res.json(foods);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
