import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, ScrollView, Button, Modal } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ModalScreen() {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(1); // Track the tutorial step

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  if (!visible) {
    return null;
  }

  return (
      <View style={styles.container}>
        <Text style={styles.headerText}>How to Use the App</Text>
        
        {/* Step-based instructions */}
        {step === 1 && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.stepTitle}>Step 1: Navigate Home</Text>
            <Ionicons name="home" size={24} color="#007bff" style={styles.icon} />
            <Text style={styles.instructionText}>Click the Home icon to view your home page</Text>
          </View>
        )}

        {step === 2 && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.stepTitle}>Step 2: Contact Us</Text>
            <AntDesign name="tag" size={24} color="#007bff" style={styles.icon} />
            <Text style={styles.instructionText}>Click the Tag icon to view the contact page</Text>
          </View>
        )}

        {step === 3 && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.stepTitle}>Step 3: About Page</Text>
            <FontAwesome name="user" size={24} color="#007bff" style={styles.icon} />
            <Text style={styles.instructionText}>Click the User icon to view the about page</Text>
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          {step > 1 && (
            <Button title="Previous" onPress={handlePrev} color='#FFF' />
          )}
          {step < 3 && (
            <Button title="Next" onPress={handleNext} color='#FFF' />
          )}
          {step === 3 && (
            <TouchableOpacity
              style={styles.gotItButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.gotItButtonText}>Got it!</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.SwipeIconTextRow}>
          <Text style={styles.instructionText}>Slide Down to close this page</Text>
          <Text></Text>
          <AntDesign name="arrowdown" size={24} color="#007bff" style={styles.icon} />
        </View>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    paddingTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  instructionsContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    marginBottom: 50,
  },
  icon: {
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  stepTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    //backgroundColor: '#1E9BD9',
  },
  gotItButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  gotItButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  SwipeIconTextRow: {
    flex: 1,
   //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 25,
    backgroundColor: 'transparent',
  }
});
