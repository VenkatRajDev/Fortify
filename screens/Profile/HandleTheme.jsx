import {StyleSheet,View,Text, Switch} from 'react-native';
import React, { useEffect, useState } from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {Light, Dark} from '../../Theme/Appearance';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { storage } from '../../server';
import { useTheme } from '../../ThemeProvider';

const AnimatedSwitch = Animated.createAnimatedComponent(Switch)

const HandleTheme = () => {

    const {THEME,isDarkMode,setIsDarkMode} = useTheme()
  return (
    <View style={styles.container}>
      <Text
      style={[styles.titles,{color:THEME.BUTTONTEXT}]}>Theme</Text>
      <View style={[styles.darkContainer]}>
        <Text
        entering={FadeInLeft.springify().damping(20).stiffness(30)}
        style={[styles.contant,{color:THEME.TEXT}]}>Dark mode</Text>
        <Switch
        value={isDarkMode}
        onValueChange={() => setIsDarkMode((prev) => {
          storage.set('IsDarkMode',!prev)
          return !prev
        })}
        trackColor={{false: null,true: '#4682B4'}}
        thumbColor={'#e4778c'}
        style={{transform: [{scale: 1.2}]}}
        />
      </View>
    </View>
  );
};

export default HandleTheme;

const styles = StyleSheet.create({
  container: {
    padding: SCREEN_WIDTH * 0.05,
    gap: SCREEN_HEIGHT * 0.02
  },
  titles: {
    fontSize: FontSize.SUB,
    fontFamily: FontFamily.BOLD,
    color: Dark.BGCOLOR,
  },
  contant: {
    fontSize: FontSize.TITLE,
    fontFamily: FontFamily.MEDIUM,
    color: Light.TEXT,
  },
  darkContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center",
    padding: SCREEN_WIDTH * 0.01
  },
});
