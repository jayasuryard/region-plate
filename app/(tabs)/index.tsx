import { CalorieRing } from '@/components/calorie-ring';
import { MealCard } from '@/components/meal-card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

// Mock data - in production, this would come from Prisma
const mockMeals = [
  {
    id: '1',
    foodName: 'Chapati',
    region: 'Punjab',
    regionNote: 'Ghee added',
    calories: 130,
    protein: 4,
    quantity: 50,
    timeAgo: '2h ago',
  },
  {
    id: '2',
    foodName: 'Dosa',
    region: 'Tamil Nadu',
    regionNote: 'Ghee roasted',
    calories: 168,
    protein: 4,
    quantity: 100,
    timeAgo: '5h ago',
  },
  {
    id: '3',
    foodName: 'Paratha',
    region: 'Rajasthan',
    regionNote: 'No oil',
    calories: 90,
    protein: 3,
    quantity: 40,
    timeAgo: '8h ago',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [calorieGoal] = useState(2000);
  const [consumedCalories] = useState(
    mockMeals.reduce((sum, meal) => sum + meal.calories, 0)
  );
  const [proteinGoal] = useState(50);
  const [consumedProtein] = useState(
    mockMeals.reduce((sum, meal) => sum + meal.protein, 0)
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>Today</Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        
        {/* Calorie Ring */}
        <View style={styles.ringContainer}>
          <CalorieRing consumed={consumedCalories} goal={calorieGoal} />
        </View>
        
        {/* Macros Summary */}
        <View style={[styles.macrosCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: colors.tint }]}>
              {consumedProtein}g
            </Text>
            <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>
              Protein
            </Text>
            <Text style={[styles.macroGoal, { color: colors.textSecondary }]}>
              / {proteinGoal}g
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: colors.tintSecondary }]}>
              {mockMeals.length}
            </Text>
            <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>
              Meals logged
            </Text>
          </View>
        </View>
        
        {/* Meals Section */}
        <View style={styles.mealsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Today's Meals
          </Text>
          {mockMeals.map((meal) => (
            <MealCard
              key={meal.id}
              foodName={meal.foodName}
              region={meal.region}
              regionNote={meal.regionNote}
              calories={meal.calories}
              protein={meal.protein}
              quantity={meal.quantity}
              timeAgo={meal.timeAgo}
              onPress={() => console.log('Meal pressed:', meal.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  greeting: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 32,
    marginBottom: 4,
  },
  date: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
  },
  ringContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  macrosCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroValue: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 28,
    marginBottom: 4,
  },
  macroLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  macroGoal: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: '70%',
  },
  mealsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 22,
    marginBottom: 16,
  },
});

