import { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { Camera, Repeat2, Image } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function CameraScreen() {
  const [type, setType] = useState<CameraType>('back');
  const cameraRef = useRef(null);

  const toggleCameraType = () => {
    setType(current => (current === 'back' ? 'front' : 'back'));
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.webPlaceholder}>
          <Camera size={48} color="#fff" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        type={type}
      >
        <View style={styles.controlsContainer}>
          <BlurView intensity={80} style={styles.controls}>
            <TouchableOpacity style={styles.controlButton}>
              <Image color="#fff" size={24} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={() => {
                // Handle capture
              }}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.controlButton}
              onPress={toggleCameraType}
            >
              <Repeat2 color="#fff" size={24} />
            </TouchableOpacity>
          </BlurView>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  webPlaceholder: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 100,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 20,
    borderRadius: 30,
    height: 80,
    overflow: 'hidden',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
});