import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Alert, Linking, ScrollView } from 'react-native';
import { Text } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

// Social Media Links (optional)
const socialMediaLinks = [
  { name: 'facebook', url: 'https://facebook.com' },
  { name: 'twitter', url: 'https://twitter.com' },
  { name: 'instagram', url: 'https://instagram.com' },
];

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Form submission handler
  const handleSubmit = () => {
    if (!name || !email) {
      Alert.alert('Error', 'Please fill in all required fields (Name and Email).');
      return;
    }
    Alert.alert('Success', 'Your message has been sent!');
    // You can send the form data to a backend server or an email here
  };

  // Function to handle social media links click
  const handleSocialClick = (url: string) => {
    Linking.openURL(url);
  };

  return (
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Contact Us</Text>

        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#b0b0b0"
          value={name}
          onChangeText={setName}
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#b0b0b0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Message Input */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Your message"
          placeholderTextColor="#b0b0b0"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>

        {/* Social Media Links (optional) */}
        <View style={styles.socialContainer}>
          {socialMediaLinks.map((link, index) => (
            <TouchableOpacity key={index} onPress={() => handleSocialClick(link.url)}>
              <FontAwesome name={link.name as keyof typeof FontAwesome.glyphMap} size={32} color="#007bff" style={styles.socialIcon} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
    //backgroundColor: '#121212',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 15,
    borderColor: '#444',
    borderWidth: 1,
    fontSize: 16,
    color: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
});

export default ContactPage;