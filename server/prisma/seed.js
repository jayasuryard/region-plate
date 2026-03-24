const prisma = require('../lib/prisma');

async function main() {
  console.log('Seeding database...');

  // Create regions
  const punjab = await prisma.region.upsert({
    where: { name: 'Punjab' },
    update: {},
    create: {
      name: 'Punjab',
      category: 'North India',
      typicalIngredients: JSON.stringify(['wheat', 'ghee', 'dairy', 'mustard greens']),
      characteristics: 'Wheat-based, dairy heavy, rich in ghee',
    },
  });

  const rajasthan = await prisma.region.upsert({
    where: { name: 'Rajasthan' },
    update: {},
    create: {
      name: 'Rajasthan',
      category: 'West India',
      typicalIngredients: JSON.stringify(['bajra', 'millet', 'minimal oil', 'dry spices']),
      characteristics: 'Millet/bajra based, minimal oil, dry preparations',
    },
  });

  const tamilNadu = await prisma.region.upsert({
    where: { name: 'Tamil Nadu' },
    update: {},
    create: {
      name: 'Tamil Nadu',
      category: 'South India',
      typicalIngredients: JSON.stringify(['rice', 'lentils', 'coconut', 'sesame oil']),
      characteristics: 'Rice and lentil based, coconut heavy',
    },
  });

  const karnataka = await prisma.region.upsert({
    where: { name: 'Karnataka' },
    update: {},
    create: {
      name: 'Karnataka',
      category: 'South India',
      typicalIngredients: JSON.stringify(['rice', 'jowar', 'ragi', 'coconut']),
      characteristics: 'Mixed grain base, lighter preparations',
    },
  });

  const gujarat = await prisma.region.upsert({
    where: { name: 'Gujarat' },
    update: {},
    create: {
      name: 'Gujarat',
      category: 'West India',
      typicalIngredients: JSON.stringify(['mixed grains', 'sesame', 'jaggery', 'minimal spice']),
      characteristics: 'Sweet-savory balance, lighter on spices',
    },
  });

  const maharashtra = await prisma.region.upsert({
    where: { name: 'Maharashtra' },
    update: {},
    create: {
      name: 'Maharashtra',
      category: 'West India',
      typicalIngredients: JSON.stringify(['jowar', 'bajra', 'peanut', 'coconut']),
      characteristics: 'Millet-based breads, peanut-coconut flavors',
    },
  });

  console.log('Regions created');

  // Create foods
  const chapati = await prisma.food.upsert({
    where: { id: 'chapati-1' },
    update: {},
    create: {
      id: 'chapati-1',
      name: 'Chapati',
      category: 'Bread',
    },
  });

  const dosa = await prisma.food.upsert({
    where: { id: 'dosa-1' },
    update: {},
    create: {
      id: 'dosa-1',
      name: 'Dosa',
      category: 'Rice dish',
    },
  });

  const paratha = await prisma.food.upsert({
    where: { id: 'paratha-1' },
    update: {},
    create: {
      id: 'paratha-1',
      name: 'Paratha',
      category: 'Bread',
    },
  });

  console.log('Foods created');

  // Create regional variants for Chapati
  const chapatiPunjab = await prisma.regionalFood.upsert({
    where: { foodId_regionId: { foodId: chapati.id, regionId: punjab.id } },
    update: {},
    create: {
      foodId: chapati.id,
      regionId: punjab.id,
      caloriesPer100g: 260,
      proteinPer100g: 8,
      carbsPer100g: 48,
      fatPer100g: 4,
      fiberPer100g: 6,
      preparationNote: 'Ghee added',
    },
  });

  await prisma.ingredient.createMany({
    data: [
      { regionalFoodId: chapatiPunjab.id, name: 'Whole wheat flour', quantity: 65, unit: 'g' },
      { regionalFoodId: chapatiPunjab.id, name: 'Ghee', quantity: 10, unit: 'g' },
      { regionalFoodId: chapatiPunjab.id, name: 'Water', quantity: 20, unit: 'ml' },
      { regionalFoodId: chapatiPunjab.id, name: 'Salt', quantity: 1, unit: 'g' },
      { regionalFoodId: chapatiPunjab.id, name: 'Oil', quantity: 4, unit: 'g' },
    ],
  });

  const chapatiRajasthan = await prisma.regionalFood.upsert({
    where: { foodId_regionId: { foodId: chapati.id, regionId: rajasthan.id } },
    update: {},
    create: {
      foodId: chapati.id,
      regionId: rajasthan.id,
      caloriesPer100g: 180,
      proteinPer100g: 7,
      carbsPer100g: 40,
      fatPer100g: 1,
      fiberPer100g: 6,
      preparationNote: 'No oil',
    },
  });

  await prisma.ingredient.createMany({
    data: [
      { regionalFoodId: chapatiRajasthan.id, name: 'Whole wheat flour', quantity: 70, unit: 'g' },
      { regionalFoodId: chapatiRajasthan.id, name: 'Water', quantity: 28, unit: 'ml' },
      { regionalFoodId: chapatiRajasthan.id, name: 'Salt', quantity: 2, unit: 'g' },
    ],
  });

  // Create regional variants for Dosa
  const dosaTamilNadu = await prisma.regionalFood.upsert({
    where: { foodId_regionId: { foodId: dosa.id, regionId: tamilNadu.id } },
    update: {},
    create: {
      foodId: dosa.id,
      regionId: tamilNadu.id,
      caloriesPer100g: 168,
      proteinPer100g: 4,
      carbsPer100g: 28,
      fatPer100g: 4,
      fiberPer100g: 2,
      preparationNote: 'Ghee roasted',
    },
  });

  await prisma.ingredient.createMany({
    data: [
      { regionalFoodId: dosaTamilNadu.id, name: 'Rice batter', quantity: 60, unit: 'g' },
      { regionalFoodId: dosaTamilNadu.id, name: 'Urad dal batter', quantity: 25, unit: 'g' },
      { regionalFoodId: dosaTamilNadu.id, name: 'Ghee', quantity: 8, unit: 'g' },
      { regionalFoodId: dosaTamilNadu.id, name: 'Salt', quantity: 2, unit: 'g' },
      { regionalFoodId: dosaTamilNadu.id, name: 'Water', quantity: 5, unit: 'ml' },
    ],
  });

  const dosaKarnataka = await prisma.regionalFood.upsert({
    where: { foodId_regionId: { foodId: dosa.id, regionId: karnataka.id } },
    update: {},
    create: {
      foodId: dosa.id,
      regionId: karnataka.id,
      caloriesPer100g: 133,
      proteinPer100g: 4,
      carbsPer100g: 28,
      fatPer100g: 1.5,
      fiberPer100g: 2,
      preparationNote: 'Light oil',
    },
  });

  await prisma.ingredient.createMany({
    data: [
      { regionalFoodId: dosaKarnataka.id, name: 'Rice batter', quantity: 65, unit: 'g' },
      { regionalFoodId: dosaKarnataka.id, name: 'Urad dal batter', quantity: 25, unit: 'g' },
      { regionalFoodId: dosaKarnataka.id, name: 'Oil', quantity: 3, unit: 'g' },
      { regionalFoodId: dosaKarnataka.id, name: 'Salt', quantity: 2, unit: 'g' },
      { regionalFoodId: dosaKarnataka.id, name: 'Water', quantity: 5, unit: 'ml' },
    ],
  });

  // Create regional variants for Paratha
  const parathaPunjab = await prisma.regionalFood.upsert({
    where: { foodId_regionId: { foodId: paratha.id, regionId: punjab.id } },
    update: {},
    create: {
      foodId: paratha.id,
      regionId: punjab.id,
      caloriesPer100g: 320,
      proteinPer100g: 6,
      carbsPer100g: 45,
      fatPer100g: 12,
      fiberPer100g: 4,
      preparationNote: 'Butter layered',
    },
  });

  await prisma.ingredient.createMany({
    data: [
      { regionalFoodId: parathaPunjab.id, name: 'Whole wheat flour', quantity: 60, unit: 'g' },
      { regionalFoodId: parathaPunjab.id, name: 'Butter', quantity: 15, unit: 'g' },
      { regionalFoodId: parathaPunjab.id, name: 'Ghee', quantity: 10, unit: 'g' },
      { regionalFoodId: parathaPunjab.id, name: 'Water', quantity: 12, unit: 'ml' },
      { regionalFoodId: parathaPunjab.id, name: 'Salt', quantity: 3, unit: 'g' },
    ],
  });

  console.log('Regional foods and ingredients created');
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
