import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useTheme} from '../../ThemeProvider';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Inputs = ({
  editedInformation,
  setEditedInformation,
  userAnimeValue,
  passwordAnimeValue,
  hintAnimeValue,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const {THEME} = useTheme();

  const usernameAnimeStyle = useAnimatedStyle(() => ({
    borderWidth: userAnimeValue.value,
    borderColor: 'red',
  }));
  const passwordAnimeStyle = useAnimatedStyle(() => ({
    borderWidth: passwordAnimeValue.value,
    borderColor: 'red',
  }));
  const hintAnimeStyle = useAnimatedStyle(() => ({
    borderWidth: hintAnimeValue.value,
    borderColor: 'red',
  }));

  return (
    <KeyboardAvoidingView>
      <View style={styles.eachInputContainer}>
        <Text style={[styles.title, {color: THEME.TEXT}]}>Username</Text>
        <AnimatedTextInput
          value={editedInformation.username}
          style={[
            styles.inputs,
            {backgroundColor: THEME.BGBUTTON, color: THEME.TEXT},
            usernameAnimeStyle,
          ]}
          onChangeText={text =>
            setEditedInformation(previous => {
              return {...previous, username: text};
            })
          }
          placeholder="username"
        />
      </View>
      <View style={styles.eachInputContainer}>
        <Text style={[styles.title, {color: THEME.TEXT}]}>Password</Text>
        <AnimatedTextInput
          value={editedInformation.password}
          style={[
            styles.inputs,
            {backgroundColor: THEME.BGBUTTON, color: THEME.TEXT},
            passwordAnimeStyle,
          ]}
          onChangeText={text =>
            setEditedInformation(previous => {
              return {...previous, password: text};
            })
          }
          keyboardType='number-pad'
          placeholder="password"
          secureTextEntry={showPassword}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={FontSize.TITLE}
            color={THEME.TEXT}
          />
        </Pressable>
      </View>
      <View style={styles.eachInputContainer}>
        <Text style={[styles.title, {color: THEME.TEXT}]}>Hint</Text>
        <AnimatedTextInput
          value={editedInformation.hint}
          style={[
            styles.inputs,
            {backgroundColor: THEME.BGBUTTON, color: THEME.TEXT},
            hintAnimeStyle,
          ]}
          onChangeText={text =>
            setEditedInformation(previous => {
              return {...previous, hint: text};
            })
          }
          placeholder="hint"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Inputs;

const styles = StyleSheet.create({
  eachInputContainer: {
    padding: SCREEN_WIDTH * 0.05,
    gap: SCREEN_HEIGHT * 0.02,
  },
  inputs: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.08,
    borderRadius: 100 / 10,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
  },
  title: {
    fontSize: FontSize.TITLE,
    fontFamily: FontFamily.MEDIUM,
  },
  eyeIcon: {
    position: 'absolute',
    bottom: '38%',
    right: '10%',
  },
});
