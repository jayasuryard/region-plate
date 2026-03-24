const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get all regions
router.get('/', async (req, res, next) => {
  try {
    const regions = await prisma.region.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(regions);
  } catch (error) {
    next(error);
  }
});

// Get region by ID with foods
router.get('/:id', async (req, res, next) => {
  try {
    const region = await prisma.region.findUnique({
      where: { id: req.params.id },
      include: {
        foods: {
          include: {
            food: true,
            ingredients: true,
          },
        },
      },
    });
    
    if (!region) {
      return res.status(404).json({ error: 'Region not found' });
    }
    
    res.json(region);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
