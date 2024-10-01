import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient'; // Adding gradient to sections

export default function TabthreeScreen() {
  return (
   /* <LinearGradient
      colors={['#F0F0F0', '#E9E9E9']}
      style={styles.container}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: .0, y: 1.0 }}
    >
      */
     <ScrollView>
     <View style={styles.container}>
      
        
        {/* About Us Top Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Our Mission</Text>
          <Text style={styles.bodyText}>
            CharityFinder was created to make donating to charities easier. We believe in transparency and helping you make informed decisions.
          </Text>
        </View>

        {/* Meet the Creators Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>Meet the Creators</Text>

          <View style={styles.card1}>
            <Text style={styles.authorText}>Jace Riley, Mobile App Developer</Text>
            <Text style={styles.authorBodyText}>Senior at UTM, Computer Science major.</Text>
          </View>

          <View style={styles.card2}>
            <Text style={styles.authorText}>Zach, Database Designer</Text>
            <Text style={styles.authorBodyText}>Senior at UTM, Computer Science major.</Text>
          </View>

          <View style={styles.card3}>
            <Text style={styles.authorText}>Daniel Cunningham, Back-End Developer</Text>
            <Text style={styles.authorBodyText}>Senior at UTM, Computer Science major.</Text>
          </View>

          <View style={styles.card4}>
            <Text style={styles.authorText}>Goots, Front-End Developer</Text>
            <Text style={styles.authorBodyText}>Senior at UTM, Computer Science major.</Text>
          </View>
        </View>

     </View>
     </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    //backgroundColor: '#f0f2f5',
    backgroundColor: '#282828',
  },
  
  sectionContainer: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    //color: '#29282e',
    color: '#bebebe',
    textAlign: 'center',
  },

  bodyText: {
    fontSize: 18,
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 24,
    //color: '#333',
    color: '#bebebe',
  },

  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#29282e',
    textAlign: 'center',
  },

  card1: {
    backgroundColor: '#FEC673',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'orange',
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'flex-start',
    elevation: 3,
  },

  card2: {
    backgroundColor: '#9BDC93',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'green',
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'flex-start',
    elevation: 3,
  },

  card3: {
    backgroundColor: '#85B0FD',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'blue',
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'flex-start',
    elevation: 3,
  },

  card4: {
    backgroundColor: '#B19EFE',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#700BFB',
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'flex-start',
    elevation: 3,
  },

  authorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#29282e',
    marginBottom: 5,
  },

  authorBodyText: {
    fontSize: 16,
    color: '#5F5F5F',
  },
});
