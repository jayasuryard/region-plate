import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RegionTagProps {
  region: string;
  note?: string;
}

export function RegionTag({ region, note }: RegionTagProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.regionTag + '20' }]}>
      <Text style={[styles.text, { color: colors.regionTag }]}>
        {region}
        {note && (
          <Text style={[styles.note, { color: colors.textSecondary }]}>
            {' · '}
            {note}
          </Text>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 13,
    fontWeight: '600',
  },
  note: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
  },
});
