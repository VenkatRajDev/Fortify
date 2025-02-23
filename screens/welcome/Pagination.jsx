import {View, StyleSheet} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Light } from '../../Theme/Appearance';

const _DotWidth = 10;
const _DotHeight = 10;

const Dot = ({index, horize}) => {

  const animadot = useAnimatedStyle(() => {
    //Dot width interpolation
    const Dotwidth = interpolate(
      horize.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [10, 20, 10],
      Extrapolation.CLAMP,
    );
    return {
      width: Dotwidth,
    };
  });
  return <Animated.View style={[styles.Dot, animadot,{backgroundColor:Light.TEXT}]} />;
};

const Pagination = ({data, horize}) => {
  return (
    <View style={[styles.container]}>
      {[...Array(data.length).keys()].map((ele, index) => {
        return <Dot key={`dot ${ele}`} index={index} horize={horize} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  Dot: {
    width: _DotWidth,
    height: _DotHeight,
    borderRadius: _DotHeight / 2,
  },
});
