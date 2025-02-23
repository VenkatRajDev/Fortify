import {
StyleSheet,
Text,
View,
StatusBar, 
Pressable,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {data} from '../../Data/welcomeData';
import RenderItems from './RenderItems';
import {Light} from '../../Theme/Appearance';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import Pagination from './Pagination';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  FadeInDown,
  useAnimatedStyle,
  withSpring,
  runOnUI,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';

const WELCOME = ({navigation}) => {
  const Button = Animated.createAnimatedComponent(Pressable);
  const flastListref = useAnimatedRef(null);
  const flatlistIndex = useSharedValue(0);
  const horize = useSharedValue(0);

  //scroll handler
  const onscroll = useAnimatedScrollHandler({
    onScroll: event => {
      horize.value = event.contentOffset.x;
    },
  });

  //scroll index handler
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    runOnUI(() => {
      flatlistIndex.value = viewableItems[0].index;
    })();
  }, []);

  const BackButton = useCallback(() => {
    'worklet';
    flatlistIndex.value !== 0 &&
      flastListref.current.scrollToIndex({index: flatlistIndex.value - 1});
  }, []);

  const NextButton = useCallback(() => {
    'worklet';
    if (flatlistIndex.value < data.length - 1) {
      flastListref.current.scrollToIndex({index: flatlistIndex.value + 1});
    } else {
      navigation.replace('login', {message:'hello form welcome screen'})
      console.log(`Navigating to login screen`);
    }
  }, []);

  const NextButtonAnimation = useAnimatedStyle(() => ({
    transform: [
      {translateX: flatlistIndex.value > 0 ? withSpring(60) : withSpring(0)},
    ],
  }));

  const BackButtonAnimation = useAnimatedStyle(() => ({
    opacity:
      flatlistIndex.value !== 0
        ? withTiming(1, {duration: 300})
        : withTiming(0, {duration: 200}),
  }));

  const FinishTextAnimation = useAnimatedStyle(() => ({
    transform:
      flatlistIndex.value === data.length - 1
        ? [{scaleX: withTiming(1, {duration: 300})}]
        : [{scaleX: withTiming(0, {duration: 200})}],
  }));

  const NextTextAnimation = useAnimatedStyle(() => ({
    transform:
      flatlistIndex.value < data.length - 1
        ? [{scale: withTiming(1, {duration: 300})}]
        : [{scale: withTiming(0, {duration: 200})}],
  }));

  return (
    <SafeAreaView
    style={[styles.container,{backgroundColor: Light.BGCOLOR}]}
    >
      <Animated.FlatList
        ref={flastListref}
        data={data}
        renderItem={({item, index}) => (
          <RenderItems
            item={item}
            index={index}
            horize={horize}
            flatlistIndex={flatlistIndex}
            flastListref={flastListref}
            data={data}
          />
        )}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        pagingEnabled={true}
        onScroll={onscroll}
        contentContainerStyle={styles.InnerFlatListStyle}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <Animated.View
        style={styles.PaginationContainer}
        entering={FadeInDown.springify().damping(80).stiffness(200)}>
        <Pagination data={data} horize={horize} />

        <View style={[styles.ButtonsContainer]}>
          {/*Back Button  */}
          <Button
            style={[
              styles.BackButton,
              BackButtonAnimation,
              {backgroundColor: Light.BGBUTTON}
            ]}
            onPress={BackButton}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: Light.BUTTONTEXT,
                  fontSize: FontSize.BUTTONTEXT,
                  fontFamily: FontFamily.MEDIUM,
                },
              ]}>
              Back
            </Text>
          </Button>

          {/* Next Button */}
          <Button
            style={[
              styles.NextButton,
              NextButtonAnimation,
              {backgroundColor: Light.BGBUTTON},
            ]}
            onPress={NextButton}>
            <Animated.Text
              style={[
                styles.buttonText,
                NextTextAnimation,
                {
                  fontSize: FontSize.BUTTONTEXT,
                  color: Light.BUTTONTEXT,
                  fontFamily: FontFamily.MEDIUM,
                },
              ]}>
              Next
            </Animated.Text>

            <Animated.Text
              style={[
                styles.buttonText,
                FinishTextAnimation,
                {
                  fontSize: FontSize.BUTTONTEXT,
                  color: Light.BUTTONTEXT,
                  fontFamily: FontFamily.MEDIUM,
                  position: 'absolute',
                },
              ]}>
              Get Started
            </Animated.Text>
          </Button>
        </View>
      </Animated.View>
      {/* <StatusBar barStyle="Light-content" /> */}
    </SafeAreaView>
  );
};

export default WELCOME;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  InnerFlatListStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  PaginationContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  ButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    gap: 10,
  },
  BackButton: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.08,
    borderRadius: SCREEN_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    opacity: 0,
  },
  NextButton: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.08,
    borderRadius: SCREEN_HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '300',
  },
});
