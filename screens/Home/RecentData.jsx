import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Theme/Dimension';
import {Data} from '../../GlobalData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useTheme } from '../../ThemeProvider';

const _iconContainerSize = SCREEN_WIDTH * 0.1;
const _forwardIconContainerSize = SCREEN_WIDTH * 0.08;

const AnimatedPresseble = Animated.createAnimatedComponent(Pressable)

const RecentData = () => {
  
  const {recentlyAdded} = useContext(Data);
  const navigation = useNavigation();
  const {THEME} = useTheme();

  return (
    <>
      <View style={[styles.headingContainer]}>
        <Animated.Text
          entering={FadeIn.springify().damping(20).stiffness(30)}
          style={[styles.savedPassword,{color: THEME.TEXT}]}>
          Saved password
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.springify().damping(20).stiffness(30)}
          style={[styles.recent,{color:THEME.TEXT}]}>
          Recent
        </Animated.Text>
      </View>

      <View style={styles.allItemsContainer}>

        {recentlyAdded.length <= 0 ?

        <LottieView
        source={require('../../assets/Lottie Json/recentEmpty.json')}
        autoPlay
        loop
        style={{width: SCREEN_WIDTH * 0.5,height: SCREEN_HEIGHT * 0.2}}
        />
        : recentlyAdded.map((items, index) => {
          return (
            <AnimatedPresseble
            onPress={() => navigation.navigate('passwordDetails',{Details: items})}
            entering={FadeInDown.springify().damping(20).stiffness(30)}
            style={[styles.eachItemContainer,{backgroundColor: THEME.SECOUNDARY2}]} key={index.toString()}>

              <View style={styles.iconAndAccount}>
              <View style={[styles.iconContainer]}>
                <Ionicons name="person" size={FontSize.TITLE} color={THEME.TEXT}/>
              </View>

              <View>
                <Text style={[styles.account,{color:THEME.TEXT}]}>{items.account}</Text>
                <Text style={[styles.username,{color:THEME.TEXT}]}>{items.username}</Text>
              </View>
              </View>

              <View
                style={{
                  ...styles.iconContainer,
                  width: _forwardIconContainerSize,
                  height: _forwardIconContainerSize,
                  borderRadius: _forwardIconContainerSize / 2,
                }}>
                <Ionicons name='arrow-forward' size={FontSize.BUTTONTEXT} color={THEME.TEXT}/>
              </View>
            </AnimatedPresseble>
          );
        })}
      </View>
    </>
  );
};

export default RecentData;

const styles = StyleSheet.create({
  headingContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    marginTop: '5%',
  },
  savedPassword: {
    fontSize: FontSize.SUB - 5,
    fontFamily: FontFamily.BOLD,
  },
  recent: {
    fontSize: FontSize.TITLE,
    fontFamily: FontFamily.MEDIUM,
  },
  allItemsContainer: {
    alignItems: 'center',
  },
  eachItemContainer: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.08,
    marginVertical: SCREEN_HEIGHT * 0.03,
    borderRadius: SCREEN_HEIGHT * 0.08 * 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    elevation: 10
  },
  iconContainer: {
    width: _iconContainerSize,
    height: _iconContainerSize,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: _iconContainerSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAndAccount:{
    flexDirection:'row',
    gap: SCREEN_WIDTH * 0.05
  },
  account: {
    fontSize: FontSize.BUTTONTEXT,
    fontFamily: FontFamily.MEDIUM,
  },
  username:{
    fontSize: FontSize.SMALLTEXT,
    fontFamily: FontFamily.REGULAR,
  }
});
