import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {SCREEN_WIDTH} from '../../Theme/Dimension';
import {FontFamily} from '../../Theme/Fonts';
import {FontSize} from '../../Theme/Fonts';
import { useTheme } from '../../ThemeProvider';

const Detials = ({website,notes,setNewPassword}) => {
  const {THEME,isDarkMode} = useTheme()

  return (
    <Animated.View
      entering={FadeInDown.springify().damping(80).stiffness(200)}
      style={[styles.container,{backgroundColor: isDarkMode ? THEME.BUTTONTEXT : THEME.SECOUNDARY}]}>
      <Text style={[styles.details]}>Details</Text>

      <View style={[styles.TextInputContainer]}>
        <Text style={[styles.placeholder]}>Wesite address/App name</Text>
        <TextInput
          style={[styles.Input]}
          value={website}
          onChangeText={text => setNewPassword((pass) => {
            return {...pass,website:text}
          })}
        />
      </View>

      <View style={[styles.TextInputContainer]}>
        <Text style={[styles.placeholder]}>Note</Text>
        <TextInput
          style={[styles.Input]}
          value={notes}
          onChangeText={text => setNewPassword((pass) => {
            return {...pass,notes:text}
          })}
        />
      </View>
    </Animated.View>
  );
};

export default Detials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SCREEN_WIDTH * 0.05,
    borderRadius: 100 / 8,
    padding: SCREEN_WIDTH * 0.02,
  },
  details: {
    fontFamily: FontFamily.MEDIUM,
    fontSize: FontSize.BUTTONTEXT,
  },
  TextInputContainer: {
    padding: SCREEN_WIDTH * 0.05,
  },
  placeholder: {
    fontFamily: FontFamily.LIGHT,
    fontSize: FontSize.BODYTEXT,
    marginBottom: 10,
    color:'black'
  },
  Input: {
    borderWidth: 2,
    borderRadius: 100 / 10,
    borderColor: 'gray',
  },
});
