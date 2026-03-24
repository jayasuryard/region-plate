import { RegionTag } from '@/components/region-tag';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// Mock food detail data
const mockFoodDetail = {
  name: 'Chapati',
  region: 'Punjab',
  regionNote: 'Ghee added',
  caloriesPer100g: 260,
  proteinPer100g: 8,
  carbsPer100g: 48,
  fatPer100g: 4,
  fiberPer100g: 6,
  ingredients: [
    { name: 'Whole wheat flour', quantity: 65, unit: 'g' },
    { name: 'Ghee', quantity: 10, unit: 'g' },
    { name: 'Water', quantity: 20, unit: 'ml' },
    { name: 'Salt', quantity: 1, unit: 'g' },
    { name: 'Oil', quantity: 4, unit: 'g' },
  ],
};

type PortionSize = 'Small' | 'Medium' | 'Large' | 'Custom';

export default function FoodDetailScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [portionSize, setPortionSize] = useState<PortionSize>('Medium');
  const [customGrams, setCustomGrams] = useState(50);
  
  const portionSizes = {
    Small: 35,
    Medium: 50,
    Large: 70,
    Custom: customGrams,
  };
  
  const selectedGrams = portionSizes[portionSize];
  const multiplier = selectedGrams / 100;
  
  const calories = Math.round(mockFoodDetail.caloriesPer100g * multiplier);
  const protein = Math.round(mockFoodDetail.proteinPer100g * multiplier);
  const carbs = Math.round(mockFoodDetail.carbsPer100g * multiplier);
  const fat = Math.round(mockFoodDetail.fatPer100g * multiplier);
  
  const chartData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [protein, carbs, fat],
      },
    ],
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.foodName, { color: colors.text }]}>
            {mockFoodDetail.name}
          </Text>
          <RegionTag region={mockFoodDetail.region} note={mockFoodDetail.regionNote} />
        </View>
        
        {/* Portion Size Selector */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Portion Size
          </Text>
          <View style={styles.portionGrid}>
            {(['Small', 'Medium', 'Large'] as PortionSize[]).map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.portionButton,
                  {
                    backgroundColor: portionSize === size
                      ? colors.tintSecondary
                      : colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setPortionSize(size)}
              >
                <Text
                  style={[
                    styles.portionLabel,
                    {
                      color: portionSize === size
                        ? '#FFFFFF'
                        : colors.text,
                    },
                  ]}
                >
                  {size}
                </Text>
                <Text
                  style={[
                    styles.portionGrams,
                    {
                      color: portionSize === size
                        ? '#FFFFFF'
                        : colors.textSecondary,
                    },
                  ]}
                >
                  {portionSizes[size]}g
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Custom Input */}
          <View style={[styles.customInput, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.customLabel, { color: colors.text }]}>
              Custom amount (grams)
            </Text>
            <View style={styles.customControls}>
              <TouchableOpacity
                style={[styles.customButton, { backgroundColor: colors.tint }]}
                onPress={() => {
                  setCustomGrams(Math.max(10, customGrams - 10));
                  setPortionSize('Custom');
                }}
              >
                <IconSymbol name="minus" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={[styles.customValue, { color: colors.text }]}>
                {customGrams}g
              </Text>
              <TouchableOpacity
                style={[styles.customButton, { backgroundColor: colors.tint }]}
                onPress={() => {
                  setCustomGrams(customGrams + 10);
                  setPortionSize('Custom');
                }}
              >
                <IconSymbol name="plus" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Nutrition Summary */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Nutrition ({selectedGrams}g)
          </Text>
          <View style={[styles.nutritionCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.calorieRow}>
              <Text style={[styles.calorieValue, { color: colors.tintSecondary }]}>
                {calories}
              </Text>
              <Text style={[styles.calorieLabel, { color: colors.text }]}>
                kcal
              </Text>
            </View>
            <View style={styles.macroRow}>
              <View style={styles.macroItem}>
                <Text style={[styles.macroValue, { color: colors.tint }]}>
                  {protein}g
                </Text>
                <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>
                  Protein
                </Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={[styles.macroValue, { color: colors.warning }]}>
                  {carbs}g
                </Text>
                <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>
                  Carbs
                </Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={[styles.macroValue, { color: colors.error }]}>
                  {fat}g
                </Text>
                <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>
                  Fat
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Bar Chart */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Macro Breakdown
          </Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={chartData}
              width={screenWidth - 48}
              height={220}
              yAxisSuffix="g"
              chartConfig={{
                backgroundColor: colors.cardBackground,
                backgroundGradientFrom: colors.cardBackground,
                backgroundGradientTo: colors.cardBackground,
                decimalPlaces: 0,
                color: (opacity = 1) => colors.tint + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                labelColor: (opacity = 1) => colors.text + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                style: {
                  borderRadius: 16,
                },
                propsForLabels: {
                  fontFamily: 'DMSans_500Medium',
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              fromZero
            />
          </View>
        </View>
        
        {/* Ingredient Breakdown */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Ingredient Breakdown
          </Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Per 100g of {mockFoodDetail.name}
          </Text>
          <View style={styles.ingredientList}>
            {mockFoodDetail.ingredients.map((ingredient, index) => {
              const totalQuantity = mockFoodDetail.ingredients.reduce((sum, ing) => sum + ing.quantity, 0);
              const percentage = (ingredient.quantity / totalQuantity) * 100;
              
              return (
                <View
                  key={index}
                  style={[styles.ingredientItem, { backgroundColor: colors.cardBackground }]}
                >
                  <View style={styles.ingredientInfo}>
                    <Text style={[styles.ingredientName, { color: colors.text }]}>
                      {ingredient.name}
                    </Text>
                    <Text style={[styles.ingredientQuantity, { color: colors.textSecondary }]}>
                      {ingredient.quantity}{ingredient.unit}
                    </Text>
                  </View>
                  <View style={styles.ingredientBar}>
                    <View
                      style={[
                        styles.ingredientBarFill,
                        {
                          backgroundColor: colors.tintSecondary,
                          width: `${percentage}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.ingredientPercentage, { color: colors.textSecondary }]}>
                    {percentage.toFixed(0)}%
                  </Text>
                </View>
              );
            })}
          </View>
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
    paddingBottom: 16,
    gap: 12,
  },
  foodName: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 32,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 20,
    marginBottom: 12,
  },
  sectionDescription: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    marginBottom: 12,
  },
  portionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  portionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  portionLabel: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  portionGrams: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
  },
  customInput: {
    padding: 16,
    borderRadius: 12,
  },
  customLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    marginBottom: 12,
  },
  customControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customValue: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 20,
  },
  nutritionCard: {
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calorieRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  calorieValue: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 48,
  },
  calorieLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 20,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  macroLabel: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
  },
  chartContainer: {
    alignItems: 'center',
  },
  ingredientList: {
    gap: 12,
  },
  ingredientItem: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  ingredientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ingredientName: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 15,
  },
  ingredientQuantity: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
  },
  ingredientBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  ingredientBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  ingredientPercentage: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    textAlign: 'right',
  },
});

