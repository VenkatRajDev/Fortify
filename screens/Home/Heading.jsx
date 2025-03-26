import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import { FontFamily, FontSize } from '../../Theme/Fonts';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Theme/Dimension';
import { Data } from '../../GlobalData';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../../ThemeProvider';

const Heading = () => {

  const {userInformation} = useContext(Data)
  const  {THEME,isDarkMode} = useTheme()

  return (
    <View style={[styles.container]}>
      <Animated.Text
       entering={FadeInUp.springify().damping(20).stiffness(30)}
       style={[styles.hello,{color:THEME.TEXT}]}>Hello,
        <Animated.Text style={[styles.name,{color:THEME.TEXT}]}> {userInformation.username} 👋🏻</Animated.Text>
      </Animated.Text>
      <Animated.Text
       entering={FadeInUp.springify().damping(20).stiffness(30)}
       style={[styles.headingContent,{color: isDarkMode ? '#c6abab' : '#676363'}]}>Save your password easily and securely</Animated.Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingVertical: SCREEN_HEIGHT * 0.02,
  },
  hello: {
    fontSize: FontSize.HEADING,
    fontFamily: FontFamily.BOLD,
  },
  name: {
    fontSize: FontSize.SUB + 2,
    fontFamily: FontFamily.MEDIUM,
    textTransform:'capitalize',
  },
  headingContent: {
    fontSize: FontSize.BUTTONTEXT - 2,
    fontFamily: FontFamily.REGULAR,
  }
});
