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
  { id: '2', avgFunding: 1500000, name: 'St.Jude Childrens Research Hospital', rating: 4.0, website: 'https://www.stjude.org/donate', imageUrl: americanCancerSocietyLogo, causes: ['Children', 'Healthcare'] },
  { id: '3', avgFunding: 1200000, name: 'Salvation Army', rating: 5.0, website: 'https://www.salvationarmyusa.org/usn/ways-to-give/', imageUrl: americanCancerSocietyLogo, causes: ['General', 'Shelter'] },
  { id: '4', avgFunding: 2000000, name: 'American National Red Cross', rating: 4.5, website: 'https://www.redcross.org/donate', imageUrl: americanCancerSocietyLogo, causes: ['Shelter', 'Healthcare'] },
  { id: '5', avgFunding: 950000, name: 'Feeding America', rating: 4.0, website: 'https://give.feedingamerica.org/', imageUrl: americanCancerSocietyLogo, causes: ['Hunger', 'Children'] },
  { id: '6', avgFunding: 1000000, name: 'Habitat for Humanity International', rating: 5.0, website: 'https://secure.habitat.org/site/Donation2?df_id=4973&4973.donation=form1', imageUrl: americanCancerSocietyLogo, causes: ['Shelter'] },
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
    <LinearGradient
      colors={['#F0F0F0', '#E9E9E9']}
      style={[styles.container, { height: screenHeight, width: screenWidth }]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.logo_container}>
          <Image source={require('./CharityFindertest.png')} style={styles.logo} />
        </View>

        <View style={styles.introContainer}>
          <Text style={styles.mainBodyText}>
            Here at CharityFinder, we want to take the guesswork out of finding the right charity for you.
          </Text>
          <Text style={styles.mainBodyText2}>Looking for a certain type of charity?</Text>
          <Text style={styles.mainBodyText3}>We've got you covered.</Text>
          <Text style={styles.mainBodyText2}>Looking to help a low-funded charity?</Text>
          <Text style={styles.mainBodyText3}>We've got you covered.</Text>
          <Text style={styles.mainBodyText2}>We have everything you need to direct you to the right place.</Text>
          <Text style={styles.mainBodyText2}>So come explore our app and find your charity today with CharityFinder!</Text>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo_container: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 260,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introContainer: {
    backgroundColor: 'transparent',
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  mainBodyText: {
    fontSize: 20,
    color: "#29282e",
    textAlign: "center",
  },
  mainBodyText2: {
    marginTop: 10,
    fontSize: 20,
    color: "#29282e",
    textAlign: "center",
  },
  mainBodyText3: {
    marginTop: 1,
    fontSize: 20,
    color: "#29282e",
    textAlign: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 20,
    color: "#29282e",
  },
  charityContainer: {
    backgroundColor: '#E5E5E6',
    borderWidth: 0.5,
    borderColor: '#dcdcdc',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  charityList: {
    marginTop: 10,
  },
  charityHeading: {
    fontSize: 25,
    fontWeight: '600',
    marginVertical: 20,
    color: "#29282e",
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContent: {
    paddingLeft: 10,
    paddingHorizontal: (screenWidth - cardWidth) / 2,
    marginBottom: 40,
  },
  charityItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    width: cardWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: cardMargin,
    marginRight: cardMargin,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 3, height: 5 },
        shadowColor: '#333',
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
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  charityImage: {
    width: 225,
    height: 125,
    marginBottom: 10,
    borderRadius: 10,
  },
  charityText: {
    fontSize: 20,
    color: '#333',
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