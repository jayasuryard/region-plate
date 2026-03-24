import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock data
const mockRegions = [
  { id: '1', name: 'Punjab', category: 'North India' },
  { id: '2', name: 'Rajasthan', category: 'North India' },
  { id: '3', name: 'Gujarat', category: 'West India' },
  { id: '4', name: 'Maharashtra', category: 'West India' },
  { id: '5', name: 'Tamil Nadu', category: 'South India' },
  { id: '6', name: 'Karnataka', category: 'South India' },
  { id: '7', name: 'Kerala', category: 'South India' },
  { id: '8', name: 'West Bengal', category: 'East India' },
];

const dietOptions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'no-onion-garlic', label: 'No Onion/Garlic (Jain)' },
  { id: 'gluten-free', label: 'Gluten Free' },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [primaryRegion, setPrimaryRegion] = useState('Punjab');
  const [secondaryRegions, setSecondaryRegions] = useState<string[]>(['Karnataka']);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['no-onion-garlic']);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [proteinGoal, setProteinGoal] = useState(50);
  
  function toggleSecondaryRegion(region: string) {
    if (secondaryRegions.includes(region)) {
      setSecondaryRegions(secondaryRegions.filter(r => r !== region));
    } else {
      setSecondaryRegions([...secondaryRegions, region]);
    }
  }
  
  function toggleDiet(diet: string) {
    if (selectedDiets.includes(diet)) {
      setSelectedDiets(selectedDiets.filter(d => d !== diet));
    } else {
      setSelectedDiets([...selectedDiets, diet]);
    }
  }
  
  function adjustGoal(type: 'calorie' | 'protein', delta: number) {
    if (type === 'calorie') {
      setCalorieGoal(Math.max(1000, calorieGoal + delta));
    } else {
      setProteinGoal(Math.max(20, proteinGoal + delta));
    }
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Customize your regional food preferences
          </Text>
        </View>
        
        {/* Primary Region */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Primary Region
          </Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Your main regional cuisine preference
          </Text>
          <View style={styles.regionGrid}>
            {mockRegions.map((region) => (
              <TouchableOpacity
                key={region.id}
                style={[
                  styles.regionChip,
                  {
                    backgroundColor: primaryRegion === region.name
                      ? colors.tint
                      : colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setPrimaryRegion(region.name)}
              >
                <Text
                  style={[
                    styles.regionChipText,
                    {
                      color: primaryRegion === region.name
                        ? '#FFFFFF'
                        : colors.text,
                    },
                  ]}
                >
                  {region.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Secondary Regions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Mix Other Regions
          </Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Select additional regional cuisines you regularly eat
          </Text>
          <View style={styles.regionGrid}>
            {mockRegions
              .filter(r => r.name !== primaryRegion)
              .map((region) => (
                <TouchableOpacity
                  key={region.id}
                  style={[
                    styles.regionChip,
                    {
                      backgroundColor: secondaryRegions.includes(region.name)
                        ? colors.tintSecondary + '40'
                        : colors.cardBackground,
                      borderColor: secondaryRegions.includes(region.name)
                        ? colors.tintSecondary
                        : colors.border,
                    },
                  ]}
                  onPress={() => toggleSecondaryRegion(region.name)}
                >
                  <Text
                    style={[
                      styles.regionChipText,
                      {
                        color: secondaryRegions.includes(region.name)
                          ? colors.tintSecondary
                          : colors.text,
                      },
                    ]}
                  >
                    {region.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        
        {/* Diet Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Diet Preferences
          </Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Special dietary requirements
          </Text>
          <View style={styles.dietList}>
            {dietOptions.map((diet) => (
              <TouchableOpacity
                key={diet.id}
                style={[
                  styles.dietOption,
                  {
                    backgroundColor: selectedDiets.includes(diet.id)
                      ? colors.success + '20'
                      : colors.cardBackground,
                    borderColor: selectedDiets.includes(diet.id)
                      ? colors.success
                      : colors.border,
                  },
                ]}
                onPress={() => toggleDiet(diet.id)}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: selectedDiets.includes(diet.id)
                        ? colors.success
                        : 'transparent',
                      borderColor: selectedDiets.includes(diet.id)
                        ? colors.success
                        : colors.border,
                    },
                  ]}
                >
                  {selectedDiets.includes(diet.id) && (
                    <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Text style={[styles.dietLabel, { color: colors.text }]}>
                  {diet.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Daily Goals */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Daily Goals
          </Text>
          
          {/* Calorie Goal */}
          <View style={[styles.goalCard, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.goalLabel, { color: colors.text }]}>
              Calorie Goal
            </Text>
            <View style={styles.goalControls}>
              <TouchableOpacity
                style={[styles.goalButton, { backgroundColor: colors.tint }]}
                onPress={() => adjustGoal('calorie', -100)}
              >
                <IconSymbol name="minus" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={[styles.goalValue, { color: colors.text }]}>
                {calorieGoal} kcal
              </Text>
              <TouchableOpacity
                style={[styles.goalButton, { backgroundColor: colors.tint }]}
                onPress={() => adjustGoal('calorie', 100)}
              >
                <IconSymbol name="plus" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Protein Goal */}
          <View style={[styles.goalCard, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.goalLabel, { color: colors.text }]}>
              Protein Goal
            </Text>
            <View style={styles.goalControls}>
              <TouchableOpacity
                style={[styles.goalButton, { backgroundColor: colors.tintSecondary }]}
                onPress={() => adjustGoal('protein', -5)}
              >
                <IconSymbol name="minus" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={[styles.goalValue, { color: colors.text }]}>
                {proteinGoal}g
              </Text>
              <TouchableOpacity
                style={[styles.goalButton, { backgroundColor: colors.tintSecondary }]}
                onPress={() => adjustGoal('protein', 5)}
              >
                <IconSymbol name="plus" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
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
  },
  title: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 32,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 20,
    marginBottom: 4,
  },
  sectionDescription: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    marginBottom: 16,
  },
  regionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  regionChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
  },
  regionChipText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 14,
  },
  dietList: {
    gap: 12,
  },
  dietOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dietLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
    flex: 1,
  },
  goalCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalLabel: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  goalControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalValue: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 24,
  },
});
