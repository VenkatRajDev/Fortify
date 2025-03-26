import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {storage} from '../../server';
import {useTheme} from '../../ThemeProvider';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import {Snackbar} from 'react-native-paper';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const VERIFY = ({navigation}) => {
  const [password, setPassword] = useState(null);
  const {THEME, isDarkMode} = useTheme();

  const [openSnak, setOpenSnak] = useState(false);
  const hideOpenToast = () => setOpenSnak(false)

  const [wrongSnak, setWrongSnak] = useState(false);
  const hideWrongToast = () => setWrongSnak(false)

  const masterPassword = useMemo(() => {
    try {
      const mass = JSON.parse(storage.getString('Password'));
      if (mass) {
        return mass;
      }
    } catch (error) {
      console.log(
        `error occurs while getting user master password => ${error}`,
      );
    }
  }, []);

  const Hint = useMemo(() => {
    try {
      const hint = JSON.parse(storage.getString('Hint'));
      if (hint) {
        return hint;
      }
    } catch (error) {
      console.log(`error occurs while getting user hint => ${error}`);
    }
  }, []);

  const handleVirify = useCallback(() => {
    if (password === masterPassword) {
      navigation.replace('home');
      setOpenSnak(true)
    }else{
      setWrongSnak(true)
    }
  }, [password, masterPassword]);

  return (
    <View style={[styles.container, {backgroundColor: THEME.BGCOLOR}]}>
      <Animated.Text
      entering={FadeInUp.springify().damping(20).stiffness(30)}
      style={[styles.title,{color: THEME.TEXT}]}>Verify</Animated.Text>
      <Animated.Text
      entering={FadeInUp.springify().damping(20).stiffness(30)}
      style={[styles.info,{color: THEME.TEXT}]}>
        This verification is asked by{' '}
        <Animated.Text
          style={{fontFamily: FontFamily.BOLD, fontSize: FontSize.BUTTONTEXT}}>
          Fortify
        </Animated.Text>{' '}
        every time you open fortify for some security purpose
      </Animated.Text>

      <View style={{gap: SCREEN_HEIGHT * 0.02}}>
        <Text style={[styles.placeholder,{color: THEME.TEXT}]}>Enter your master password</Text>
        <AnimatedTextInput
         entering={FadeIn.springify().damping(20).stiffness(30)}
          value={password}
          onChangeText={current => setPassword(current)}
          style={[styles.textInput, {backgroundColor: THEME.BGBUTTON,color: THEME.TEXT}]}
          keyboardType="number-pad"
          enterKeyHint="go"
          onSubmitEditing={handleVirify}
          autoFocus={true}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Pressable onPress={() => navigation.navigate('forgotPassword')}>
            <Text style={[styles.fogetPassword,{color: THEME.TEXT}]}>forgot password ?</Text>
          </Pressable>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.hint,{color: THEME.TEXT}]}>Hint : </Text>
            <Text style={[styles.hint,{color:THEME.TEXT}]}>{Hint}</Text>
          </View>
        </View>
      </View>

      <Snackbar
        visible={openSnak}
        onDismiss={hideOpenToast}
        action={{
          label: 'close',
          onPress: hideOpenToast,
        }}
        style={[styles.snakBar]}>
        opening...Fortify
      </Snackbar>

      <Snackbar
        visible={wrongSnak}
        onDismiss={hideWrongToast}
        action={{
          label: 'close',
          onPress: hideWrongToast,
        }}
        style={[styles.snakBar]}>
        {password === '' || password === null ? 'Enter password' : 'wrong Password'}
      </Snackbar>

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={THEME.BGCOLOR}
      />
    </View>
  );
};

export default VERIFY;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.HEADING,
    fontFamily: FontFamily.BOLD,
    padding: SCREEN_WIDTH * 0.05,
  },
  info: {
    textAlign: 'center',
    padding: SCREEN_WIDTH * 0.05,
    fontSize: FontSize.BODYTEXT,
    fontFamily: FontFamily.MEDIUM,
  },
  textInput: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: 100 / 20,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    elevation: 10,
  },
  placeholder: {
    fontFamily: FontFamily.LIGHT,
    fontSize: FontSize.BODYTEXT,
  },
  fogetPassword: {
    fontSize: FontSize.BUTTONTEXT,
    fontFamily: FontFamily.MEDIUM,
    textDecorationStyle: 'dashed',
    textDecorationLine: 'underline',
  },
  hint:{
    fontSize: FontSize.BUTTONTEXT,
    fontFamily: FontFamily.MEDIUM,
  },
  snakBar: {
    position:'absolute',
    bottom: 20,
    left: 20,
    right: 20
  },
});
