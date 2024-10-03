import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';

export default function ModalScreen() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;  // Hide the modal if not visible
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>How to Use the App</Text>

      <View style={styles.instructionsContainer}>
        {/* Home Page Instruction */}
        <View style={styles.iconTextRow}>
          <Ionicons name="home" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.instructionText}>Click the Home icon to view your home page</Text>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {/* Find Charity Instruction */}
        <View style={styles.iconTextRow}>
          <AntDesign name="tag" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.instructionText}>Click the Tag icon to find a charity to donate to</Text>
        </View>


          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


        {/* Account Information Instruction */}
        <View style={styles.iconTextRow}>
          <FontAwesome name="user" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.instructionText}>Click the User icon to view your account information</Text>
        </View>

      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Status bar for iOS */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <Text>Slide down to close this page</Text>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#25292e',
    alignItems: 'center',
    paddingTop: 30,
    //justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  instructionsContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#25292e',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#25292e',
  },
  icon: {
    marginRight: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#fff',
  },
  subHeading: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    //color: '#007bff',
    color: '#FFF',
    textAlign: 'center',
  },

  separator: {
    marginVertical: 30,
    alignItems: 'center',
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',
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
});
