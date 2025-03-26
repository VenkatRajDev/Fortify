import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import { Light } from '../../Theme/Appearance';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Data} from '../../GlobalData';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { storage } from '../../server';
import { useTheme } from '../../ThemeProvider';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)

const PasswordInfo = () => {
  
  const navigation = useNavigation()

  const {storedPasswords} = useContext(Data)
  const { THEME,isDarkMode } = useTheme()

  return (
    <View style={[styles.container]}>

      <Animated.View
      entering={FadeInDown.springify().damping(20).stiffness(30)}
      style={[styles.goToAdd,{backgroundColor: THEME.BGBUTTON}]}>
        <View style={[styles.iconView]}>
          <Ionicons
            name="shield-checkmark-outline"
            color={THEME.TEXT}
            size={FontSize.SUB}
          />
        </View>

        <View>
          <Text style={[styles.newPasswordText,{color: THEME.TEXT}]}>New password</Text>
          <Text style={[styles.savePasswordText,{color:THEME.TEXT}]}>
            Save your password with ease
          </Text>
        </View>

        <TouchableOpacity style={[styles.addButton]} onPress={() => navigation.navigate('addPassword')}>
          <Text style={[styles.addButtonText]}>Add New +</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* goTo password container */}
      <AnimatedButton
      entering={FadeInDown.springify().damping(20).stiffness(30)}
      onPress={() => navigation.navigate('items')}
      style={[styles.gotToPassword,{backgroundColor: THEME.SECOUNDARY}]} activeOpacity={0.5}>
        <View
          style={[
            styles.iconView,
            {width: 40, height: 40, borderRadius: 40 / 2,},
          ]}>
          <Ionicons
            name="key-outline"
            color={THEME.TEXT}
            size={FontSize.SUB}
          />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{paddingHorizontal: 5}}>
            <Text style={[styles.savedPassword,{color: THEME.TEXT}]}>Saved password</Text>
            <Text style={[styles.passwordCount,{color: THEME.TEXT}]}>
              {storedPasswords.length} pass
            </Text>
          </View>

          <View style={[styles.forwardIconView]}>
            <Ionicons
              name="arrow-forward"
              color={THEME.TEXT}
              size={FontSize.BUTTONTEXT}
            />
          </View>
        </View>
      </AnimatedButton>
    </View>
  );
};

export default PasswordInfo;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: SCREEN_HEIGHT * 0.03,
  },
  goToAdd: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.3,
    justifyContent: 'space-between',
    padding: SCREEN_WIDTH * 0.05,
    gap: 5,
    borderRadius: 100 / 10,
    elevation: 5,
  },
  iconView: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPasswordText: {
    fontSize: FontSize.SUB - 2,
    fontFamily: FontFamily.MEDIUM,
  },
  savePasswordText: {
    fontSize: FontSize.BODYTEXT,
    fontFamily: FontFamily.LIGHT,
  },
  addButton: {
    width: 'auto',
    height: SCREEN_HEIGHT * 0.055,
    backgroundColor: Light.BGCOLOR,
    borderRadius: 100 / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: FontSize.BUTTONTEXT,
    fontFamily: FontFamily.MEDIUM,
  },
  gotToPassword: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.25,
    padding: SCREEN_WIDTH * 0.05,
    borderRadius: 100 / 10,
    gap: 5,
    elevation: 5,
    justifyContent:'space-around'
  },
  savedPassword: {
    fontSize: FontSize.SUB - 2,
    fontFamily: FontFamily.REGULAR,
  },
  passwordCount: {
    fontSize: FontSize.SUB - 5,
    fontFamily: FontFamily.LIGHT,
  },
  forwardIconView: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
