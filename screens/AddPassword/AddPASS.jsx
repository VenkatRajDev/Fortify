import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Password from './Password';
import Detials from './Detials';
import {Light} from '../../Theme/Appearance';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {SCREEN_WIDTH} from '../../Theme/Dimension';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  FadeInRight,
} from 'react-native-reanimated';
import {MMKV} from 'react-native-mmkv';
import {Data} from '../../GlobalData';
import { useTheme } from '../../ThemeProvider';

const storage = new MMKV();
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const today = new Date();

const AddPass = ({navigation}) => {
  const accountError = useSharedValue(0);
  const usernameError = useSharedValue(0);
  const passwordError = useSharedValue(0);
  const connectedAccountError = useSharedValue(0);

  const {newPassword, setNewPassword, setShowmsg} = useContext(Data);
  const {THEME,isDarkMode} = useTheme()

  const cleanUp = useCallback(() => {
    setNewPassword(password => {
      return {
        ...password,
        account: null,
        username: null,
        password: null,
        connectedAccount: null,
        website: null,
        notes: null,
      };
    });
  }, []);

  const savePassword = useCallback(() => {
    if (newPassword.account === '' || newPassword.account === null) {
      accountError.value = withSequence(
        withTiming(1, {duration: 800}),
        withDelay(5000, withTiming(0, {duration: 800})),
      );
      return;
    } else if (newPassword.username === '' || newPassword.username === null) {
      usernameError.value = withSequence(
        withTiming(1, {duration: 800}),
        withDelay(5000, withTiming(0, {duration: 800})),
      );
      return;
    } else if (newPassword.password === '' || newPassword.password === null) {
      passwordError.value = withSequence(
        withTiming(1, {duration: 800}),
        withDelay(5000, withTiming(0, {duration: 800})),
      );
      return;
    } else if (
      newPassword.connectedAccount === '' ||
      newPassword.connectedAccount === null
    ) {
      connectedAccountError.value = withSequence(
        withTiming(1, {duration: 800}),
        withDelay(5000, withTiming(0, {duration: 800})),
      );
      return;
    } else {
      const existingpasswords = storage.getString('UserPassword');
      const existingRecent = storage.getString('RecentlyAdded');

      const passwordArray = existingpasswords
        ? JSON.parse(existingpasswords)
        : [];

      const recentPasswordArray = existingRecent
        ? JSON.parse(existingRecent)
        : [];

      const newPasswordObj = newPassword;
      const _passwordId = Math.random().toString(36).substring(2);

      passwordArray.push({
        ...newPasswordObj,
        id: _passwordId,
        website:
          newPassword.website === null || newPassword.website === ''
            ? 'website address nor app name given'
            : newPassword.website,
        notes:
          newPassword.notes === null || newPassword.notes === ''
            ? 'Notes not given'
            : newPassword.notes,
        date: today.toISOString(),
      });

      recentPasswordArray.push({
        ...newPasswordObj,
        id: _passwordId,
        website:
          newPassword.website === null || newPassword.website === ''
            ? 'website address nor app name given'
            : newPassword.website,
        notes:
          newPassword.notes === null || newPassword.notes === ''
            ? 'Notes not given'
            : newPassword.notes,
        date: today.toISOString(),
      });

      storage.set('UserPassword', JSON.stringify(passwordArray));
      storage.set('RecentlyAdded', JSON.stringify(recentPasswordArray));
      cleanUp();
      setShowmsg(true);
      navigation.goBack();
    }
  }, [newPassword]);

  return (
    <SafeAreaView style={[styles.constainer,{backgroundColor: THEME.BGCOLOR}]}>
      <View style={[styles.Header]}>
        <Pressable
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => {
            cleanUp();
            navigation.goBack();
          }}
          style={[styles.backIconView]}>
          <Ionicons
            name="chevron-back"
            size={FontSize.SUB}
            color={THEME.TEXT}
          />
        </Pressable>

        <Text style={[styles.title,{color: THEME.TEXT}]}>Add new password</Text>

        <Pressable
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={savePassword}
          style={[styles.finishIconView]}>
          <AnimatedIcon
            entering={FadeInRight.springify().damping(80).stiffness(200)}
            name="checkmark-circle"
            size={FontSize.HEADING}
            color="#227b46"
          />
        </Pressable>
      </View>

      <ScrollView
        style={[styles.scrollview]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Password
          account={newPassword.account}
          username={newPassword.username}
          password={newPassword.password}
          connectedAccount={newPassword.connectedAccount}
          setNewPassword={setNewPassword}
          // Error Animation
          accountError={accountError}
          usernameError={usernameError}
          passwordError={passwordError}
          connectedAccountError={connectedAccountError}
        />
        <Detials
          website={newPassword.website}
          setNewPassword={setNewPassword}
          notes={newPassword.notes}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPass;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: FontSize.SUB,
    fontFamily: FontFamily.BOLD,
    padding: SCREEN_WIDTH * 0.05,
  },
  backIconView: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishIconView: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
