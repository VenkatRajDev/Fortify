import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {Light} from '../../Theme/Appearance';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Theme/Dimension';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../ThemeProvider';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const Items = ({
  isDeleting,
  setIsDeleting,
  slectedIndex,
  setSlectedIndex,
  item,
  index,
}) => {
  const navigation = useNavigation();

  const {THEME} = useTheme();

  const handleOnLongPress = useCallback(() => {
    setIsDeleting(true);

    if (slectedIndex.includes(index)) {
      setSlectedIndex(slectedIndex.filter(ele => ele !== index));
    } else {
      setSlectedIndex([...slectedIndex, index]);
    }
  }, [isDeleting, slectedIndex]);

  const handleCheckBox = useCallback(() => {
    if (slectedIndex.includes(index)) {
      setSlectedIndex(slectedIndex.filter(ele => ele !== index));
    } else {
      setSlectedIndex([...slectedIndex, index]);
    }
  }, [slectedIndex]);

  useEffect(() => {
    if (slectedIndex.length === 0) {
      setIsDeleting(false);
    }
  }, [slectedIndex]);

  return item.id == 'empty' ? (
    <View
      style={[styles.container, styles.transprentBox, {elevation: 0}]}></View>
  ) : (
    <AnimatedTouchable
      entering={FadeIn.springify().damping(20).stiffness(30)}
      exiting={FadeOut.springify().damping(20).stiffness(30)}
      onLongPress={handleOnLongPress}
      onPress={() => {
        if (!isDeleting) {
          navigation.navigate('passwordDetails', {Details: item});
        }else{
          handleCheckBox()
        }
      }}
      activeOpacity={0.5}
      style={[styles.container, {backgroundColor: THEME.BGBUTTON}]}>
      {isDeleting && (
        <Pressable
          style={[styles.checkBox]}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          onPressIn={handleCheckBox}>
          <AnimatedIcon
            entering={FadeIn.springify().damping(10).stiffness(80)}
            exiting={FadeOut.springify().damping(10).stiffness(80)}
            name={slectedIndex.includes(index) ? 'checkbox' : 'square-outline'}
            size={FontSize.SUB - 2}
            color={THEME.TEXT}
          />
        </Pressable>
      )}
      <View>
        <Text style={[styles.title,{color:THEME.TEXT}]}>{item.account}</Text>
        <Text style={[styles.username,{color:THEME.TEXT}]}>{item.username}</Text>
      </View>
      <Text numberOfLines={2} style={[styles.notes,{color:THEME.TEXT}]}>
        {item.notes}
      </Text>
    </AnimatedTouchable>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 100 / 5,
    padding: SCREEN_WIDTH * 0.05,
    justifyContent: 'space-around',
    margin: SCREEN_WIDTH * 0.03,
    elevation: 10,
  },
  title: {
    fontSize: FontSize.TITLE,
    fontFamily: FontFamily.MEDIUM,
  },
  username: {
    fontSize: FontSize.SMALLTEXT + 1,
    fontFamily: FontFamily.REGULAR,
  },
  notes: {
    fontSize: FontSize.SMALLTEXT,
    fontFamily: FontFamily.REGULAR,
  },
  checkBox: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.02,
    right: SCREEN_WIDTH * 0.05,
    zIndex: 1,
  },
  transprentBox: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
