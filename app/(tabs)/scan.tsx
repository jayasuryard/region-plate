import { RegionTag } from '@/components/region-tag';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScanScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [detectedFood, setDetectedFood] = useState<{
    name: string;
    region: string;
    note: string;
    quantity: number;
  } | null>(null);

  if (!permission) {
    return <View style={[styles.container, { backgroundColor: colors.background }]} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.permissionContainer}>
          <IconSymbol name="camera.fill" size={64} color={colors.textSecondary} />
          <Text style={[styles.permissionText, { color: colors.text }]}>
            We need camera access to scan food
          </Text>
          <TouchableOpacity
            style={[styles.permissionButton, { backgroundColor: colors.tint }]}
            onPress={requestPermission}
          >
            <Text style={[styles.permissionButtonText, { color: '#FFFFFF' }]}>
              Grant Permission
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function handleScan() {
    setIsScanning(true);
    // Simulate AI detection - in production, this would call your AI API
    setTimeout(() => {
      setDetectedFood({
        name: 'Chapati',
        region: 'Punjab',
        note: 'Ghee added',
        quantity: 50,
      });
      setIsScanning(false);
    }, 1500);
  }

  function adjustQuantity(delta: number) {
    if (detectedFood) {
      setDetectedFood({
        ...detectedFood,
        quantity: Math.max(10, detectedFood.quantity + delta),
      });
    }
  }

  function confirmScan() {
    console.log('Logging food:', detectedFood);
    // In production, save to database via Prisma
    setDetectedFood(null);
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing}>
          {/* Camera Overlay */}
          <View style={styles.overlay}>
            {/* Top Controls */}
            <View style={styles.topBar}>
              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
                onPress={toggleCameraFacing}
              >
                <IconSymbol name="camera.rotate" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Center Detection Area */}
            <View style={styles.detectionArea}>
              <View style={[styles.detectionFrame, { borderColor: colors.tintSecondary }]} />
              
              {detectedFood && (
                <View style={[styles.detectionInfo, { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
                  <Text style={[styles.foodName, { color: '#FFFFFF' }]}>
                    {detectedFood.name}
                  </Text>
                  <View style={styles.regionTagContainer}>
                    <RegionTag region={detectedFood.region} note={detectedFood.note} />
                  </View>
                </View>
              )}
            </View>

            {/* Bottom Controls */}
            <View style={styles.bottomBar}>
              {detectedFood ? (
                <View style={styles.quantityControls}>
                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={[styles.quantityButton, { backgroundColor: colors.tint }]}
                      onPress={() => adjustQuantity(-10)}
                    >
                      <IconSymbol name="minus" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    
                    <View style={[styles.quantityDisplay, { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
                      <Text style={[styles.quantityValue, { color: '#FFFFFF' }]}>
                        {detectedFood.quantity}g
                      </Text>
                    </View>
                    
                    <TouchableOpacity
                      style={[styles.quantityButton, { backgroundColor: colors.tint }]}
                      onPress={() => adjustQuantity(10)}
                    >
                      <IconSymbol name="plus" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity
                    style={[styles.confirmButton, { backgroundColor: colors.tintSecondary }]}
                    onPress={confirmScan}
                  >
                    <Text style={[styles.confirmButtonText, { color: '#FFFFFF' }]}>
                      Log Meal
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.scanButton,
                    { backgroundColor: isScanning ? colors.textSecondary : colors.tintSecondary },
                  ]}
                  onPress={handleScan}
                  disabled={isScanning}
                >
                  <IconSymbol
                    name={isScanning ? 'hourglass' : 'camera.fill'}
                    size={32}
                    color="#FFFFFF"
                  />
                  <Text style={[styles.scanButtonText, { color: '#FFFFFF' }]}>
                    {isScanning ? 'Scanning...' : 'Scan Food'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </CameraView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 40,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectionArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  detectionFrame: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 3,
    borderRadius: 20,
    borderStyle: 'dashed',
  },
  detectionInfo: {
    position: 'absolute',
    bottom: -80,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  foodName: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  regionTagContainer: {
    marginTop: 4,
  },
  bottomBar: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 12,
  },
  scanButtonText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 18,
  },
  quantityControls: {
    width: '100%',
    gap: 16,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityDisplay: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    minWidth: 100,
    alignItems: 'center',
  },
  quantityValue: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 24,
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 18,
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 20,
  },
  permissionText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  permissionButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 12,
  },
  permissionButtonText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
  },
});
