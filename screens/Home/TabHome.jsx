import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Heading from './Heading';
import {SafeAreaView} from 'react-native-safe-area-context';
import PasswordInfo from './PasswordInfo';
import {Data} from '../../GlobalData';
import {storage} from '../../server';
import {useFocusEffect} from '@react-navigation/native';
import RecentData from './RecentData';
import {ActivityIndicator, Snackbar} from 'react-native-paper';
import {useTheme} from '../../ThemeProvider';
import { FontSize } from '../../Theme/Fonts';

const TabHome = () => {
  const {setStoredPasswords, setRecentlyAdded, setUserInformation} =
    useContext(Data);

  const {THEME} = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  const {showmsg, setShowmsg} = useContext(Data);
  const hideToast = () => setShowmsg(false);

  const getUserPasswordd = useCallback(() => {
    try {
      const password = JSON.parse(storage.getString('UserPassword'));
      if (password) {
        setStoredPasswords(password);
      }
    } catch (error) {
      console.log(`Errror While Getting User Passwords ${error}`);
    }
  }, []);

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

  const getUserRecentPassword = useCallback(() => {
    try {
      const recentlyAddedPass =
        JSON.parse(storage.getString('RecentlyAdded')) || [];
      setRecentlyAdded(recentlyAddedPass);
    } catch (error) {
      console.log(`Errror While Getting User Recent Passwords ${error}`);
    }
  }, []);

  const setUserRecentPassword = useCallback(() => {
    const storedRecent = JSON.parse(storage.getString('RecentlyAdded')) || [];

    const newRecentPassword = storedRecent.filter(items => {
      const addedTime = new Date(items.date);
      const currentTime = new Date();

      return currentTime - addedTime < 2 * 24 * 60 * 60 * 1000; // 2 days
    });
    storage.set('RecentlyAdded', JSON.stringify(newRecentPassword));
  }, []);

  useFocusEffect(
    useCallback(() => {
      try{
        getUserPasswordd();
        getUserName();
        setUserRecentPassword();
        getUserRecentPassword();
      }catch(error){
        console.log(`error while getting user datas => ${error}`)
      }finally{
        setIsLoading(false)
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
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Heading />
          <PasswordInfo />
          <RecentData />
        </ScrollView>
      )}
      <Snackbar
        visible={showmsg}
        onDismiss={hideToast}
        action={{
          label: 'Close',
          onPress: hideToast,
        }}
        style={styles.snakbarmsg}>
        password saved sucessfully
      </Snackbar>
    </SafeAreaView>
  );
};

export default TabHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
