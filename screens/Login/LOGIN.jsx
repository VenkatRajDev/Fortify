import {View, StyleSheet, StatusBar} from 'react-native';
import React, {} from 'react';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {Light} from '../../Theme/Appearance';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {FadeInRight, FadeInUp} from 'react-native-reanimated';

import Forms from './Forms';

const LOGIN = ({navigation}) => {

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.Heading]}>
        <Animated.Text
          entering={FadeInUp.springify().damping(80).stiffness(200)}
          style={[styles.LoginTitle]}>
          Login
        </Animated.Text>
        <Animated.Text
          style={[styles.welcome]}
          entering={FadeInUp.springify().damping(80).stiffness(200)}>
          Welcome To Fortify
        </Animated.Text>
      </View>
      {/* contain all textinput */}
      <Forms navigation={navigation}/>
      <StatusBar barStyle='dark-content' backgroundColor={Light.BGCOLOR}/>
    </SafeAreaView>
  );
};

export default LOGIN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Light.BGCOLOR,
  },
  Heading: {
    flex: 0.25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  LoginTitle: {
    fontSize: FontSize.HEADING,
    fontFamily: FontFamily.BOLD,
    color: Light.TEXT,
    textAlign: 'center',
  },
  welcome: {
    fontSize: FontSize.SUB,
    fontFamily: FontFamily.REGULAR,
    color: Light.TEXT,
  },
});
