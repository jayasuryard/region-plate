import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RegionTag } from './region-tag';

interface MealCardProps {
  foodName: string;
  region: string;
  regionNote?: string;
  calories: number;
  protein: number;
  quantity: number;
  timeAgo: string;
  onPress?: () => void;
}

export function MealCard({
  foodName,
  region,
  regionNote,
  calories,
  protein,
  quantity,
  timeAgo,
  onPress,
}: MealCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.foodName, { color: colors.text }]}>{foodName}</Text>
        <Text style={[styles.timeAgo, { color: colors.textSecondary }]}>{timeAgo}</Text>
      </View>
      
      <View style={styles.regionContainer}>
        <RegionTag region={region} note={regionNote} />
      </View>
      
      <View style={styles.nutritionRow}>
        <View style={styles.nutritionItem}>
          <Text style={[styles.nutritionValue, { color: colors.text }]}>{calories}</Text>
          <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>kcal</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={[styles.nutritionValue, { color: colors.text }]}>{protein}g</Text>
          <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>protein</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={[styles.nutritionValue, { color: colors.text }]}>{quantity}g</Text>
          <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>quantity</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  foodName: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 18,
    flex: 1,
  },
  timeAgo: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
  },
  regionContainer: {
    marginBottom: 12,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 20,
  },
  nutritionLabel: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    marginTop: 2,
  },
});
