import {
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  KeyboardAvoidingView,
  DevSettings,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import {Light} from '../../Theme/Appearance';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import Animated, {FadeInLeft, FadeInRight} from 'react-native-reanimated';
import {MMKV} from 'react-native-mmkv';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const storage = new MMKV();

const Forms = ({navigation}) => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConformPassword, setConformPassword] = useState('');
  const [Hint, setHint] = useState('');

  useEffect(() => {
    storage.set('UserName', UserName === '' ? `Guest` : UserName);
    storage.set('Password', Password);
    storage.set('Hint', Hint === '' ? `No Hint` : Hint);
  }, [UserName, Password, Hint]);

  const HandleTextInput = useCallback(() => {
    if (Password === ``) {
      console.log(`Enter the storng password`);
    } else if (Password.length < 8) {
      console.log('the password altest contain 8 character');
    } else if (Password !== ConformPassword) {
      console.log(`the password is not match`);
    } else {
      storage.set('IsLogedIn', true);
      DevSettings.reload()
      //navigation.replace('home', {message: 'Hello mf'});
    }
  }, [Password, ConformPassword]);

  return (
    <>
      <KeyboardAvoidingView style={[styles.container]}>
        <AnimatedTextInput
          entering={FadeInLeft.springify().damping(80).stiffness(200)}
          value={UserName}
          onChangeText={current => setUserName(current)}
          placeholderTextColor="#676262"
          placeholder="Username"
          style={[styles.AnimatedTextInput]}
        />
        <AnimatedTextInput
          entering={FadeInLeft.springify().damping(80).stiffness(200)}
          value={Password}
          onChangeText={current => setPassword(current)}
          placeholderTextColor="#676262"
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.AnimatedTextInput]}
        />
        <AnimatedTextInput
          entering={FadeInLeft.springify().damping(80).stiffness(200)}
          value={ConformPassword}
          onChangeText={current => setConformPassword(current)}
          placeholderTextColor="#676262"
          placeholder="Conform Password"
          secureTextEntry={true}
          style={[styles.AnimatedTextInput]}
        />
        <AnimatedTextInput
          entering={FadeInLeft.springify().damping(80).stiffness(200)}
          value={Hint}
          onChangeText={current => setHint(current)}
          placeholderTextColor="#676262"
          placeholder="Hint"
          style={[styles.AnimatedTextInput]}
          multiline={true}
        />
      </KeyboardAvoidingView>
      <Animated.View
        entering={FadeInRight.springify().damping(80).stiffness(200)}
        style={[styles.DoneButtonContainer]}>
        <Pressable style={[styles.done]} onPress={HandleTextInput}>
          <Text style={[styles.doneText]}>Done</Text>
        </Pressable>
      </Animated.View>
    </>
  );
};

export default Forms;

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
  AnimatedTextInput: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.08,
    elevation: 8,
    borderRadius: SCREEN_WIDTH / 50,
    backgroundColor: Light.BGBUTTON,
    paddingHorizontal: 20,
    fontSize: FontSize.SMALLTEXT + 3,
    fontFamily: FontFamily.MEDIUM,
  },
  DoneButtonContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    padding: 10,
  },
  done: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.09,
    backgroundColor: Light.SECOUNDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SCREEN_WIDTH / 2,
  },
  doneText: {
    color: Light.TEXT,
    fontSize: FontSize.BUTTONTEXT,
    fontFamily: FontFamily.MEDIUM,
  },
});
