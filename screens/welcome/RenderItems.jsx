import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  FadeInUp,
  withTiming,
} from 'react-native-reanimated';
import {Light} from '../../Theme/Appearance';
import {FontFamily, FontSize} from '../../Theme/Fonts';

const RenderItems = ({item, index, horize,flatlistIndex,flastListref, data}) => {
  const AnimatedStyle = useAnimatedStyle(() => {
    // opacity interpolation
    const opacityAnimation = interpolate(
      horize.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    // transplate interpolation
    const transplateY = interpolate(
      horize.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [20, 0, 20],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacityAnimation,
      transform: [{translateY: transplateY}],
    };
  });

  const skipAnimation = useAnimatedStyle(() => ({
    opacity: flatlistIndex.value === data.length - 1 ? withTiming(0,{duration:300}) : withTiming(1,{duration:500})
  }))

  return (
    <View style={[styles.container]}>
      <Animated.Text
        style={[
          styles.skip,
          AnimatedStyle,
          skipAnimation,
          {
            fontSize: FontSize.BODYTEXT,
            color: Light.TEXT,
            fontFamily: FontFamily.MEDIUM,
          },
        ]}
        entering={FadeInUp.springify().damping(80).stiffness(200)}
        onPress={() => {
          flastListref.current.scrollToIndex({
            index: data.length - 1,
          });
        }}>
        Skip
      </Animated.Text>

      <Animated.Text
        style={[
          styles.title,
          AnimatedStyle,
          {
            fontSize: FontSize.SUB,
            color: Light.TEXT,
            fontFamily: FontFamily.BOLD,
          },
        ]}
        entering={FadeInUp.springify().damping(80).stiffness(200)}>
        {item.title}
      </Animated.Text>

      {/* image Container */}
      <View style={styles.imageView}>
        <Animated.Image
          source={item.image}
          style={[AnimatedStyle, {width: '100%', height: '100%',}]}
          entering={FadeInUp.springify().damping(80).stiffness(200)}
        />
      </View>
    </View>
  );
};

export default RenderItems;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    padding: 12,
    lineHeight: 35,
  },
  imageView: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.5,
  },
  skip: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
});
