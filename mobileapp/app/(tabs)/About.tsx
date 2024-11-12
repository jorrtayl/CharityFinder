import React, { useState, memo } from 'react';
import { StyleSheet, ScrollView, View, Text, Modal, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const handshakeIcon = require('./images/handshake-logo.png');
const LinkedInIcon = require('./images/LinkedIn_logo.png');
const ResumeIcon = require('./images/Resume-Logo.png');

interface Links {
  github: string;
  linkedin: string;
  handshake: string;
  resume: string;
}

interface Creator {
  name: string;
  role: string;
  bio: string;
  image: any;
  links: Links;
}

interface IconButtonProps {
  url: string;
  iconName: string | any; 
  label: string;
  isImage?: boolean;
}

const IconButton: React.FC<IconButtonProps> = memo(({ url, iconName, label, isImage = false }) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.iconButton}>
    {isImage ? (
      <Image source={iconName} style={styles.iconImage} />
    ) : (
      <Icon name={iconName} size={30} color="#fff" />
    )}
    <Text style={styles.iconLabel}>{label}</Text>
  </TouchableOpacity>
));

interface CreatorCardProps {
  creator: Creator;
  color: string;
  onPress: (creator: Creator) => void;
}

const CreatorCard: React.FC<CreatorCardProps> = memo(({ creator, color, onPress }) => (
  <TouchableOpacity 
    style={[styles.card, { borderColor: color }]} 
    onPress={() => onPress(creator)}
  >
    <Image source={creator.image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{creator.name}</Text>
    <Text style={styles.cardRole}>{creator.role}</Text>
  </TouchableOpacity>
));

export default function TabthreeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const creators: Creator[] = [
    { 
      name: 'Jace Riley', 
      role: 'Mobile App Developer', 
      bio: 'Senior at UTM \nComputer Science major \n', 
      image: require('./images/JR_headshot.png'),
      links: {
        github: 'https://github.com/T10Jace',
        linkedin: 'https://www.linkedin.com/in/jaceriley0910',
        handshake: 'https://utmartin.joinhandshake.com/profiles/25993740',
        resume: 'https://example.com/jaceriley-resume.pdf',
      }
    },
    { 
      name: 'Zach Coomer', 
      role: 'Database Designer', 
      bio: 'Senior at UTM \nComputer Science major', 
      image: require('./images/ZC_headshot.png'), 
      links: {
        github: 'https://github.com/EdwardCoom',
        linkedin: 'www.linkedin.com/in/zach-coomer',
        handshake: 'https://app.joinhandshake.com/profiles/9478190',
        resume: 'https://example.com/jaceriley-resume.pdf', 
      }
    },
    { 
      name: 'Daniel Cunningham', 
      role: 'Back-End Developer', 
      bio: 'Senior at UTM \nComputer Science major', 
      image: require('./images/DC_headshot.png'), 
      links: {
        github: 'https://github.com/jaceriley',
        linkedin: 'https://www.linkedin.com/in/daniel-cunningham-b691542a0/',
        handshake: 'https://handshake.org/jaceriley',
        resume: 'https://example.com/jaceriley-resume.pdf',
      }
    },
    { 
      name: 'Jordan Taylor', 
      role: 'Front-End Developer', 
      bio: 'Senior at UTM \nComputer Science major', 
      image: require('./images/JT_headshot.png'), 
      links: {
        github: 'https://github.com/jaceriley',
        linkedin: 'https://www.linkedin.com/in/jordan-taylor-218a78228/',
        handshake: 'https://app.joinhandshake.com/profiles/16567735?ref=students',
        resume: 'https://example.com/jaceriley-resume.pdf',
      }
    },
  ];

  const cardColors = ['#444', '#444', '#444', '#444']; // Colors for each card

  const openModal = (creator: Creator) => {
    setSelectedCreator(creator);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Meet the Team</Text>

        <View style={styles.groupIMG_container}>
          <Image source={require('./images/Group_Image.jpg')} style={styles.group_photo} />
        </View>

        <Text style={styles.description}>
          Behind CharityFinder is a passionate team of nerds who want to make giving back easier and better.
          {"\n"}
          {"\n"}
          Meet the crew who brought this platform to life, where each member
          brings their own skills to help create a smooth and meaningful experience for everyone who uses it!
        </Text>

        <View style={styles.creatorList}>
          {creators.map((creator, index) => (
            <CreatorCard 
              key={index} 
              creator={creator} 
              color={cardColors[index % cardColors.length]}
              onPress={openModal}
            />
          ))}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              {selectedCreator && (
                <>
                  <Image source={selectedCreator.image} style={styles.modalImage} />
                  <Text style={styles.modalText}>{selectedCreator.bio}</Text>
                  <View style={styles.iconContainer}>
                    <IconButton url={selectedCreator.links.github} iconName="logo-github" label="GitHub" />
                    <IconButton url={selectedCreator.links.linkedin} iconName={LinkedInIcon} label="LinkedIn" isImage={true} />
                    <IconButton url={selectedCreator.links.handshake} iconName={handshakeIcon} label="Handshake" isImage={true} />
                    <IconButton url={selectedCreator.links.resume} iconName={ResumeIcon} label="Resume" isImage={true} />
                  </View>
                </>
              )}

              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            
            </View>
          </View>
        </Modal>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... all styles remain unchanged
  scrollView: {
    backgroundColor: '#1e1e1e',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
    textAlign: 'center',
  },
  groupIMG_container: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  group_photo: {
    width: 350,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#b0b0b0',
    marginBottom: 20,
  },
  creatorList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 3, height: 5 },
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
    alignItems: 'center',
  },
  cardImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  cardRole: {
    fontSize: 13,
    color: '#b0b0b0',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#ffffff',
  },
  closeButton: {
    marginTop: 20,
    width: 80,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#ffffff',
  },
});
