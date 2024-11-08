import React, { useState, useCallback, useMemo, FunctionComponent } from 'react';
import { StyleSheet, FlatList, TextInput, TouchableOpacity, Pressable, Alert, Linking, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const americanCancerSocietyLogo = require('./images/American_Cancer_Society_Logo.png');
const StJudeLogo = require('./images/St.-Jude-Childrens-Research-Hospital-Logo.jpg');
const salvationArmyLogo = require('./images/Salvation-Army-Logo.png');
const redCrossLogo = require('./images/Red_Cross_Logo.png');
const feedingAmericaLogo = require('./images/Feeding-America-Logo.png');
const habitatForHumanityLogo = require('./images/Habitat-For-Humanity-Logo.png');

const charities: Charity[] = [
  { id: '1', avgFunding: 3000000, name: 'American Cancer Society', rating: 4.5, website: 'https://donate.cancer.org/', imageUrl: americanCancerSocietyLogo, causes: ['Healthcare'] },
  { id: '2', avgFunding: 1500000, name: 'St.Jude Childrens Research Hospital', rating: 4.0, website: 'https://www.stjude.org/donate', imageUrl: StJudeLogo, causes: ['Children', 'Healthcare'] },
  { id: '3', avgFunding: 1200000, name: 'Salvation Army', rating: 5.0, website: 'https://www.salvationarmyusa.org/usn/ways-to-give/', imageUrl: salvationArmyLogo, causes: ['General', 'Shelter'] },
  { id: '4', avgFunding: 2000000, name: 'American National Red Cross', rating: 4.5, website: 'https://www.redcross.org/donate', imageUrl: redCrossLogo, causes: ['Shelter', 'Healthcare'] },
  { id: '5', avgFunding: 950000, name: 'Feeding America', rating: 4.0, website: 'https://give.feedingamerica.org/', imageUrl: feedingAmericaLogo, causes: ['Hunger', 'Children'] },
  { id: '6', avgFunding: 1000000, name: 'Habitat for Humanity International', rating: 5.0, website: 'https://secure.habitat.org/site/Donation2?df_id=4973&4973.donation=form1', imageUrl: habitatForHumanityLogo, causes: ['Shelter'] },
];

type Charity = {
  id: string;
  avgFunding: number;
  name: string;
  rating: number;
  website: string;
  imageUrl: any;
  causes: string[];
};

const DonateScreen: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rating'>('name');

  const filteredCharities = useMemo(() => {
    const filtered = charities.filter(charity =>
      charity.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered.sort((a, b) =>
      sortBy === 'name' ? a.name.localeCompare(b.name) : b.rating - a.rating
    );
  }, [searchQuery, sortBy]);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleSort = useCallback((sortField: 'name' | 'rating') => {
    setSortBy(sortField);
  }, []);

  const handleCharityPress = useCallback((website: string) => {
    Linking.canOpenURL(website)
      .then(supported => {
        if (supported) {
          Linking.openURL(website);
        } else {
          Alert.alert("Unable to open the website.");
        }
      })
      .catch(() => Alert.alert("An error occurred while trying to open the website."));
  }, []);

  const renderStars = useCallback((rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <View style={styles.starContainer}>
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesome key={`full-${index}`} name="star" size={16} color="#FFD700" />
        ))}
        {halfStar === 1 && <FontAwesome name="star-half" size={16} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesome key={`empty-${index}`} name="star-o" size={16} color="#FFD700" />
        ))}
      </View>
    );
  }, []);

  const RenderCharityItem = React.memo(({ item }: { item: Charity }) => (
    <Pressable
      onPress={() => handleCharityPress(item.website)}
      style={styles.charityItem}
      accessibilityLabel={`Open ${item.name} website`}
    >
      <View style={styles.charityContent}>
        <Image source={item.imageUrl} style={styles.charityImage} />
        <View style={styles.charityTextContainer}>
          <Text style={styles.charityText}>{item.name}</Text>
          {renderStars(item.rating)}
        </View>
      </View>
    </Pressable>
  ));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Charities..."
        placeholderTextColor={"#b0b0b0"}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Sort by:</Text>
        <TouchableOpacity
          onPress={() => handleSort('name')}
          style={[styles.sortButton, sortBy === 'name' && styles.activeSortButton]}
          accessibilityLabel="Sort by name"
        >
          <Text style={styles.sortButtonText}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSort('rating')}
          style={[styles.sortButton, sortBy === 'rating' && styles.activeSortButton]}
          accessibilityLabel="Sort by rating"
        >
          <Text style={styles.sortButtonText}>Rating</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCharities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderCharityItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e', // Dark background to match other pages
  },
  searchBar: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#2c2c2c', // Darker background for search bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 20,
    fontSize: 16,
    color: '#ffffff', // White text for better contrast
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  sortText: {
    marginRight: 10,
    fontSize: 16,
    color: '#b0b0b0', // Light grey for sort text
  },
  sortButton: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#0056b3', // Primary button color
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  activeSortButton: {
    backgroundColor: '#007bff', // Lighter shade for active sort button
  },
  sortButtonText: {
    color: '#fff', // White text for sort button
    fontSize: 14,
    fontWeight: '500',
  },
  charityItem: {
    backgroundColor: '#292929', // Match charity item background with other pages
    padding: 15,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  charityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  charityImage: {
    width: 83,
    height: 45,
    marginRight: 15,
    borderRadius: 5,
  },
  charityTextContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  charityText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff', // White text for charity name
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: 'transparent',
  },
});

export default DonateScreen;