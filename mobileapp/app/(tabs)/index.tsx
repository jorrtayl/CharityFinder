import React, { useMemo } from 'react';
import { StyleSheet, FlatList, Pressable, Alert, Linking, Image, Dimensions, Platform, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const cardWidth = screenWidth * 0.85;
const cardMargin = 10;
const snapInterval = cardWidth + cardMargin * 2;

const americanCancerSocietyLogo = require('./images/American_Cancer_Society_Logo.png');
const StJudeLogo = require('./images/St.-Jude-Childrens-Research-Hospital-Logo.jpg');
const salvationArmyLogo = require('./images/Salvation-Army-Logo.png');
const redCrossLogo = require('./images/Red_Cross_Logo.png');
const feedingAmericaLogo = require('./images/Feeding-America-Logo.png');
const habitatForHumanityLogo = require('./images/Habitat-For-Humanity-Logo.png');


type Charity = {
  id: string;
  avgFunding: number;
  name: string;
  rating: number;
  website: string;
  imageUrl: any;
  causes: string[];
};

const charities: Charity[] = [
  { id: '1', avgFunding: 3000000, name: 'American Cancer Society', rating: 4.5, website: 'https://donate.cancer.org/', imageUrl: americanCancerSocietyLogo, causes: ['Healthcare'] },
  { id: '2', avgFunding: 1500000, name: 'St.Jude Childrens Research Hospital', rating: 4.0, website: 'https://www.stjude.org/donate', imageUrl: StJudeLogo, causes: ['Children', 'Healthcare'] },
  { id: '3', avgFunding: 1200000, name: 'Salvation Army', rating: 5.0, website: 'https://www.salvationarmyusa.org/usn/ways-to-give/', imageUrl: salvationArmyLogo, causes: ['General', 'Shelter'] },
  { id: '4', avgFunding: 2000000, name: 'American National Red Cross', rating: 4.5, website: 'https://www.redcross.org/donate', imageUrl: redCrossLogo, causes: ['Shelter', 'Healthcare'] },
  { id: '5', avgFunding: 950000, name: 'Feeding America', rating: 4.0, website: 'https://give.feedingamerica.org/', imageUrl: feedingAmericaLogo, causes: ['Hunger', 'Children'] },
  { id: '6', avgFunding: 1000000, name: 'Habitat for Humanity International', rating: 5.0, website: 'https://secure.habitat.org/site/Donation2?df_id=4973&4973.donation=form1', imageUrl: habitatForHumanityLogo, causes: ['Shelter'] },
];

const HomeScreen = () => {
  const leastFundedCharities = useMemo(() => {
    return [...charities].sort((a, b) => a.avgFunding - b.avgFunding).slice(0, 10);
  }, []);

  const charitiesByCause = useMemo(() => {
    const grouped: { [key: string]: Charity[] } = {};
    charities.forEach((charity) => {
      charity.causes.forEach((cause: string) => {
        if (!grouped[cause]) {
          grouped[cause] = [];
        }
        grouped[cause].push(charity);
      });
    });
    return grouped;
  }, []);

  const handleCharityPress = (website: string) => {
    Alert.alert(
      "Visit Charity Website",
      "Do you want to visit this charity's website?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Visit Site", onPress: () => Linking.openURL(website) }
      ]
    );
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <View style={styles.starContainer}>
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesome key={`full-${index}`} name="star" size={18} color="#FFD700" />
        ))}
        {halfStar === 1 && <FontAwesome name="star-half" size={18} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesome key={`empty-${index}`} name="star-o" size={18} color="#FFD700" />
        ))}
      </View>
    );
  };

  const CharityCard = ({ charity }: { charity: Charity }) => (
    <Pressable onPress={() => handleCharityPress(charity.website)} style={styles.charityItem} accessibilityLabel={`Visit ${charity.name} website`}>
      <View style={styles.charityContent}>
        <Image source={charity.imageUrl} style={styles.charityImage} />
        <Text style={styles.charityText}>{charity.name}</Text>
        <StarRating rating={charity.rating} />
      </View>
    </Pressable>
  );

  const CauseSection = ({ cause, charities }: { cause: string, charities: Charity[] }) => (
    <View style={styles.charityContainer} key={cause}>
      <Text style={styles.charityHeading}>Charities for {cause}</Text>
      <FlatList
        data={charities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CharityCard charity={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.charityList}
        contentContainerStyle={[
          styles.flatListContent,
          { paddingHorizontal: (screenWidth - cardWidth) / 2 },
        ]}
        snapToInterval={snapInterval}
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );

  return (
    
      <ScrollView style={styles.container}>
        

        <View style={styles.introContainer}>
          <LinearGradient
            colors={['#1e1e1e', '#1e1e1e']}
            style={styles.gradientBackground}
          >
            <Text style={styles.introHeading}>Welcome to 
              <Image
              style={{ width: 165, height: 20, marginBottom: 0, marginLeft: -20, }}
              source={require('./images/Plain_Logo.png')}
              />
            </Text>

            <Text style={styles.mainBodyText}>
              Encouraging the world to make educated donations towards trusted charities.
            </Text>
            <Pressable style={styles.callToActionButton} onPress={() => { /* Navigate or show modal */ }}>
              <Text style={styles.callToActionText}>Get Started</Text>
            </Pressable>
          </LinearGradient>
        </View>


        <View style={styles.charityContainer}>
          <Text style={styles.charityHeading}>Top 10 Least Funded Charities</Text>
          <FlatList
            data={leastFundedCharities}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CharityCard charity={item} />}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.charityList}
            contentContainerStyle={styles.flatListContent}
            snapToInterval={snapInterval}
            snapToAlignment="center"
            decelerationRate="fast"
          />
        </View>

        {Object.entries(charitiesByCause).map(([cause, charities]) => (
          <CauseSection key={cause} cause={cause} charities={charities} />
        ))}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingBottom: 20,
  },
  logo_container: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 400,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introContainer: {
    backgroundColor: 'transparent',
    marginBottom: 30,
    marginHorizontal: 10,
  },
  introHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  gradientBackground: {
    padding: 20,
    borderRadius: 15,
  },
  callToActionButton: {
    backgroundColor: '#1E9BD9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  callToActionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e1e1e',
    textAlign: 'center',
  },
  
  mainBodyText: {
    fontSize: 18,
    color: "#ffffff", // Updated to white for better contrast
    textAlign: "center",
    lineHeight: 26,
  },
  mainBodyText2: {
    marginTop: 10,
    fontSize: 18,
    color: "#ffffff", // Updated to white for better contrast
    textAlign: "center",
    lineHeight: 26,
  },
  mainBodyText3: {
    marginTop: 1,
    fontSize: 18,
    color: "#ffffff", // Updated to white for better contrast
    textAlign: "center",
    lineHeight: 26,
  },
  charityContainer: {
    backgroundColor: '#171717', // Match with other pages
    borderWidth: 0.5,
    borderColor: '#444', // Light border for visibility
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  charityHeading: {
    fontSize: 25,
    fontWeight: '600',
    marginVertical: 20,
    color: "#ffffff", // Updated to white for better contrast
    alignItems: 'center',
    justifyContent: 'center',
  },
  charityList: {
    marginTop: 10,
  },
  flatListContent: {
    paddingLeft: 10,
    paddingHorizontal: (screenWidth - cardWidth) / 2,
    marginBottom: 40,
  },
  charityItem: {
    backgroundColor: '#2c2c2c', // Match card background with other pages
    padding: 15,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 15,
    width: cardWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: cardMargin,
    marginRight: cardMargin,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  charityContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  charityImage: {
    width: 225,
    height: 125,
    marginBottom: 10,
    borderRadius: 10,
    //backgroundColor: 'transparent',
  },
  charityText: {
    fontSize: 18,
    color: '#ffffff', // Updated to white for better contrast
    fontWeight: '700',
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;