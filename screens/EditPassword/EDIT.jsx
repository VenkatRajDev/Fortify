import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Password from './Password';
import Detials from './Detials';
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
import {useTheme} from '../../ThemeProvider';

const storage = new MMKV();
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const EDIT = ({navigation, route}) => {
  const {Details} = route.params;
  const {THEME} = useTheme();

  const accountError = useSharedValue(0);
  const usernameError = useSharedValue(0);
  const passwordError = useSharedValue(0);
  const connectedAccountError = useSharedValue(0);

  const [newPassword, setNewPassword] = useState({
    account: Details.account,
    username: Details.username,
    password: Details.password,
    connectedAccount: Details.connectedAccount,
    website: Details.website,
    notes: Details.notes,
    date: Details.date,
    id: Details.id,
  });

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
        date: null,
      };
    });
  }, []);

  const handleEditedPassword = useCallback(() => {
    if (newPassword.account === '') {
      accountError.value = withSequence(
        withTiming(1, {duration: 800}),
        withDelay(5000, withTiming(0, {duration: 800})),
      );
      return;
    } else if (newPassword.username === '') {
      usernameError.value = withSequence(
        withTiming(1, {duration: 800}),
        withDelay(5000, withTiming(0, {duration: 800})),
      );
      return;
    } else if (newPassword.password === '') {
      passwordError.value = withSequence(
        withTiming(1, {duration: 800}),
        withDelay(5000, withTiming(0, {duration: 800})),
      );
      return;
    } else if (newPassword.connectedAccount === '') {
      connectedAccountError.value = withSequence(
        withTiming(1, {duration: 800}),
        withDelay(5000, withTiming(0, {duration: 800})),
      );
      return;
    } else if (
      JSON.stringify({...Details, id: 0}) ===
      JSON.stringify({...newPassword, id: 0})
    ) {
      return;
    } else {
      const existingpasswords = JSON.parse(storage.getString('UserPassword')) || []
      const existingRecentPasswords = storage.getString('RecentlyAdded');

      const isRecentExsisted = existingRecentPasswords
        ? JSON.parse(existingRecentPasswords)
        : [];

      const EditePassword = existingpasswords.filter(item => {
        return item.id !== Details.id;
      });

      const EditeRecentPassword = isRecentExsisted.filter(item => {
        return item.id !== Details.id;
      });

      EditePassword.unshift({
        ...newPassword,
        website: newPassword.website === '' ? 'website address nor app name given' : newPassword.website,
        notes: newPassword.notes === '' ? 'notes not given' : newPassword.notes,
      });
      EditeRecentPassword.unshift({
        ...newPassword,
        website: newPassword.website === '' ? 'website address nor app name given' : newPassword.website,
        notes: newPassword.notes === '' ? 'notes not given' : newPassword.notes,
      });

      storage.set('UserPassword', JSON.stringify(EditePassword));
      storage.set('RecentlyAdded', JSON.stringify(EditeRecentPassword));
      cleanUp();
      navigation.replace('passwordDetails', {
        Details: {
          ...newPassword,
          website: newPassword.website === '' ? 'website address nor app name given' : newPassword.website,
          notes: newPassword.notes === '' ? 'notes not given' : newPassword.notes,
        },
      });
    }
  }, [newPassword]);

  const handleBackButton = useCallback(() => {
    if (
      JSON.stringify({...Details, id: 0}) !==
      JSON.stringify({...newPassword, id: 0})
    ) {
      Alert.alert('Back configuration', 'Are you sure you want to go back', [
        {text: 'keep editing'},
        {
          text: 'discard',
          onPress: () => {
            cleanUp();
            navigation.goBack();
          },
        },
      ]);
    } else {
      cleanUp();
      navigation.goBack();
    }
  }, [newPassword]);

  return (
    <SafeAreaView style={[styles.constainer, {backgroundColor: THEME.BGCOLOR}]}>
      <View style={[styles.Header]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={handleBackButton}
            style={[styles.backIconView]}>
            <Ionicons
              name="chevron-back"
              size={FontSize.SUB}
              color={THEME.TEXT}
            />
          </Pressable>

          <Text style={[styles.title, {color: THEME.TEXT}]}>Edit Password</Text>
        </View>

        <Pressable
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={handleEditedPassword}
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

export default EDIT;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
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
