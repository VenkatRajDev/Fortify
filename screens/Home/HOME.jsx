import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useTheme } from '../../ThemeProvider';

// Tab navigation config here home

const Tab = createBottomTabNavigator();

// import tab screens
import TabHome from './TabHome';
import ITEMS from '../Items/ITEMS';
import Generate from '../Generate/GENERATE';
import PROFILE from '../Profile/PROFILE';
import {SCREEN_HEIGHT} from '../../Theme/Dimension';
import {Dark} from '../../Theme/Appearance';
import CustomTabBar from './CustomTabBar';

const HOME = () => {

  const {THEME,isDarkMode} = useTheme()
  return (
    <>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="tabhome"
          component={TabHome}
          options={{title: 'Home'}}
        />
        <Tab.Screen name="items" component={ITEMS} options={{title: 'Items'}} />
        <Tab.Screen
          name="generate"
          component={Generate}
          options={{title: 'Generate'}}
        />
        <Tab.Screen
          name="profile"
          component={PROFILE}
          options={{title: 'Profile'}}
        />
      </Tab.Navigator>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={THEME.BGCOLOR}
      />
    </>
  );
};

export default HOME;

const styles = StyleSheet.create({
  tabBar: {
    height: SCREEN_HEIGHT * 0.1,
    elevation: 5,
    borderTopRightRadius: 100 / 5,
    borderTopLeftRadius: 100 / 5,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '' ? Dark.TEXT : Dark.BGCOLOR,
  },
});
