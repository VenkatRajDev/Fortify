import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../ThemeProvider';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const AnimatedTochable = Animated.createAnimatedComponent(TouchableOpacity);

const ABOUTUS = ({navigation}) => {
  const {THEME} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: THEME.BGCOLOR}]}>
      <Animated.Text
      entering={FadeIn.springify().damping(20).stiffness(30)}
       style={[styles.text, {color: THEME.TEXT}]}>
        There's Nothing to say About Us
      </Animated.Text>
      <AnimatedTochable
       entering={FadeInDown.springify().damping(20).stiffness(30)}
        style={[styles.backButton, {backgroundColor: THEME.BGBUTTON}]}
        onPress={() => navigation.goBack()}>
        <Text style={[styles.buttonText, {color: THEME.TEXT}]}>Go Back</Text>
      </AnimatedTochable>
    </View>
  );
};

export default ABOUTUS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FontSize.HEADING,
    fontFamily: FontFamily.BOLD,
    textAlign: 'center',
  },
  backButton: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: 100 / 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  buttonText: {
    fontSize: FontSize.BUTTONTEXT,
    fontFamily: FontFamily.MEDIUM,
  },
});
