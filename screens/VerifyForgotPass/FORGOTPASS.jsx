import {StyleSheet, TextInput, View, StatusBar} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useTheme} from '../../ThemeProvider';
import Animated, {FadeIn, FadeInUp} from 'react-native-reanimated';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import {Snackbar} from 'react-native-paper';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const FORGOTPASS = ({navigation}) => {
  const {THEME, isDarkMode} = useTheme();
  const [code, setCode] = useState(null);

  const [visible, setVisible] = useState(false);
  const hideSnak = () => setVisible(false);

  const handleGoButton = useCallback(() => {
    if (code === null || code === '' || code !== 'Enter the code word') {
      setVisible(true);
    }else{
        navigation.replace('home')
    }
  },[code,visible]);

  return (
    <View style={[styles.container, {backgroundColor: THEME.BGCOLOR}]}>
      <Animated.Text
        entering={FadeInUp.springify().damping(20).stiffness(30)}
        style={[styles.title, {color: THEME.TEXT}]}>
        Forgot Password
      </Animated.Text>

      <AnimatedTextInput
        entering={FadeIn.springify().damping(20).stiffness(30)}
        value={code}
        onChangeText={text => setCode(text)}
        style={[
          styles.input,
          {backgroundColor: THEME.BGBUTTON, color: THEME.TEXT},
        ]}
        placeholder="Enter the code word"
        placeholderTextColor={isDarkMode ? "#a39999" : "#4c4343"}
        enterKeyHint='go'
        onSubmitEditing={handleGoButton}
      />

      <Snackbar
        visible={visible}
        onDismiss={hideSnak}
        action={{
          label: 'close',
          onPress: hideSnak,
        }}
        style={[styles.snakBar]}>
        Code not acepted
      </Snackbar>

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={THEME.BGCOLOR}
      />
    </View>
  );
};

export default FORGOTPASS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.1,
    gap: SCREEN_HEIGHT * 0.05,
  },
  title: {
    fontSize: FontSize.SUB,
    fontFamily: FontFamily.BOLD,
  },
  input: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: 100 / 20,
    elevation: 10,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
  },
  snakBar:{
    position:'absolute',
    bottom: 20,
    left: 20,
    right: 20
  }
});
