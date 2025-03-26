import {StyleSheet, Text,View} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Heading from './Heading';
import {Data} from '../../GlobalData';
import UserInfo from './UserInfo';
import {storage} from '../../server';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '../../ThemeProvider';
import { ActivityIndicator } from 'react-native-paper';
import { FontSize } from '../../Theme/Fonts';

const PROFILE = () => {
  const {setStoredPasswords, setUserInformation} = useContext(Data);
  const {THEME} = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  const getUserName = useCallback(() => {
    try {
      const name = JSON.parse(storage.getString('UserName'));
      if (name) {
        setUserInformation(previous => {
          return {...previous, username: name};
        });
      }
    } catch (error) {
      console.log(`error while getting username ${error}`);
    }
  }, []);

  const getMasterPassword = useCallback(() => {
    try {
      const mass = JSON.parse(storage.getString('Password'));
      if (mass) {
        setUserInformation(previous => {
          return {...previous, password: mass};
        });
      }
    } catch (error) {
      console.log(`error while getting master password ${error}`);
    }
  }, []);

  const getUserPassword = useCallback(() => {
    try {
      const password = JSON.parse(storage.getString('UserPassword'));
      if (password) {
        setStoredPasswords(password);
      }
    } catch (error) {
      console.log(`Errror While Getting User Passwords ${error}`);
    }
  }, []);

  const getUserHint = useCallback(() => {
    try {
      const userHint = JSON.parse(storage.getString('Hint'));
      if (userHint) {
        setUserInformation(previous => {
          return {...previous, hint: userHint};
        });
      }
    } catch (error) {
      console.log(`Errror While Getting User Hint ${error}`);
    }
  });

  useFocusEffect(
    useCallback(() => {
      try {
        getUserName();
        getMasterPassword();
        getUserPassword();
        getUserHint();
      } catch (error) {
        console.log(`error while getting user profile data => ${error}`);
      } finally {
        setIsLoading(false);
      }
    }, []),
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: THEME.BGCOLOR}]}>
      {isLoading ? (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator animating={true} color={THEME.TEXT} size={FontSize.HEADING}/>
        </View>
      ) : (
        <>
          <Heading />
          <UserInfo />
        </>
      )}
    </SafeAreaView>
  );
};

export default PROFILE;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
