import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useCallback} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {Light} from '../../Theme/Appearance';
import {storage} from '../../server';
import { withDelay, withSequence, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../ThemeProvider';

const Buttons = ({
  editedInformation,
  setEditedInformation,
  userInformation,
  navigation,
  userAnimeValue,
  passwordAnimeValue,
  hintAnimeValue,
}) => {
  const {THEME} = useTheme()

  const handleUpdate = useCallback(() => {
    if (editedInformation.username === '') {
      userAnimeValue.value = withSequence(withSpring(2),withDelay(500,withSpring(0)))
      return;
    } else if (
      editedInformation.password === '' ||
      editedInformation.password.length < 4
    ) {
        passwordAnimeValue.value = withSequence(withSpring(2),withDelay(500,withSpring(0)))
      return;
    } else if (editedInformation.hint === '') {
        hintAnimeValue.value = withSequence(withSpring(2),withDelay(500,withSpring(0)))
      return; 
    } else if (
      JSON.stringify(editedInformation) === JSON.stringify(userInformation)
    ) {
      return;
    } else {
      storage.set('UserName', JSON.stringify(editedInformation.username));
      storage.set('Password', JSON.stringify(editedInformation.password));
      storage.set('Hint', JSON.stringify(editedInformation.hint));
      navigation.goBack();
    }
  },[editedInformation,userInformation]);

  const handleCancelButton = useCallback(() => {
    if(JSON.stringify(editedInformation) !== JSON.stringify(userInformation)){
      Alert.alert(
        'cancel configuration',
        'are you sure you want to exit',
        [{text:'keep'},{text:'discard', onPress: () => {
          setEditedInformation(previous => {
            return {...previous, username: null, password: null, hint: null};
          });
          navigation.goBack()
        }}]
      )
    }else{
      setEditedInformation(previous => {
        return {...previous, username: null, password: null, hint: null};
      });
      navigation.goBack()
    }
  },[editedInformation,userInformation])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleUpdate}
        style={[styles.buttons, {backgroundColor: THEME.SECOUNDARY2}]}>
        <Text style={[styles.buttonText,{color: THEME.TEXT}]}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={handleCancelButton}
      style={[styles.buttons, {backgroundColor: '#e42828'}]}>
        <Text style={[styles.buttonText,{color: 'snow'}]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  buttons: {
    width: SCREEN_WIDTH * 0.45,
    height: SCREEN_HEIGHT * 0.09,
    borderRadius: 100 / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FontFamily.MEDIUM,
    fontSize: FontSize.BUTTONTEXT,
  },
});
