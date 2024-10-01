import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Tabs } from 'expo-router';
import { Pressable, Image } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

//import logo from './CharityFindertest.png';

/*
function Logo() {
  return (
    <Image
      style={{ width: 170, height: 50, marginBottom: 8 }}
      source={require('./CharityFindertest.png')}
    />
  );
}
*/

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle: 'Home',
          //headerTitle: (props) => <LogoTitle/>,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),

          /*
          headerLeft: () => (
            <Image source={require('./CharityFinder.png')} /> 
          ),
          */ 
          
          headerStyle: {
            //backgroundColor: '#334d50',
            backgroundColor: 'transparent',
            //fontSize: 20,
          },

          headerTitleStyle: {
            //fontWeight: 'bold',
            fontSize: 20,
          },

        }}
      />

      <Tabs.Screen
        name="Donate"
        options={{
          title: 'Donate',
          tabBarIcon: ({ color }) => <TabBarIcon name="tag" color={color} />,

          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />

      <Tabs.Screen
        name="About"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,

          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />

      <Tabs.Screen
        name="Contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />

    </Tabs>
  );
}
