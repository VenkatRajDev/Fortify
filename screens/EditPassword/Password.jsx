import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useAnimatedStyle,
  FadeInLeft,
} from 'react-native-reanimated';
import {SCREEN_WIDTH} from '../../Theme/Dimension';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../ThemeProvider';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const Password = ({
  setNewPassword,
  account,
  username,
  password,
  connectedAccount,
  accountError,
  usernameError,
  passwordError,
  connectedAccountError,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const {THEME,isDarkMode} = useTheme()

  const accountErrorAnimation = useAnimatedStyle(() => {
    return {
      opacity: accountError.value,
    };
  });
  const usernameErrorAnimation = useAnimatedStyle(() => {
    return {
      opacity: usernameError.value,
    };
  });
  const passwordErrorAnimation = useAnimatedStyle(() => {
    return {
      opacity: passwordError.value,
    };
  });
  const connectedAccountErrorAnimation = useAnimatedStyle(() => {
    return {
      opacity: connectedAccountError.value,
    };
  });

  return (
    <Animated.View style={[styles.container]}>
      {/*Password account */}
      <View style={[styles.TextInputContainer]}>
        <Animated.Text style={[styles.placeholder,{color:THEME.TEXT}]}>Account</Animated.Text>

        <Animated.Text style={[styles.error, accountErrorAnimation]}>
          ! Account name is required
        </Animated.Text>

        <View style={[styles.errorContainer]}>
          <AnimatedTextInput
            entering={FadeInLeft.springify().damping(80).stiffness(200)}
            style={[styles.Input, {width: SCREEN_WIDTH * 0.6,color: THEME.TEXT}]}
            value={account}
            onChangeText={text =>
              setNewPassword(pass => {
                return {...pass, account: text};
              })
            }
          />
          <AnimatedIcon
            entering={FadeInLeft.springify().damping(80).stiffness(200)}
            style={[styles.icon]}
            name="person"
            size={FontSize.SUB}
            color={isDarkMode ? THEME.BUTTONTEXT : "#4a2b74"}
          />
        </View>
      </View>

      {/* username or email address */}
      <View style={[styles.TextInputContainer]}>
        <Animated.Text style={[styles.placeholder,{color: THEME.TEXT}]}>
          Username/email address
        </Animated.Text>
        <Animated.Text style={[styles.error, usernameErrorAnimation]}>
          ! Kindly fill the username
        </Animated.Text>
        <View style={[styles.errorContainer]}>
          <AnimatedTextInput
            entering={FadeInLeft.springify().damping(80).stiffness(200)}
            style={[styles.Input,{color:THEME.TEXT}]}
            value={username}
            onChangeText={text =>
              setNewPassword(pass => {
                return {...pass, username: text};
              })
            }
          />
          <AnimatedIcon
            entering={FadeInLeft.springify().damping(80).stiffness(200)}
            style={[styles.icon]}
            name="mail"
            size={FontSize.SUB}
            color={isDarkMode ? THEME.BUTTONTEXT : "#4a2b74"}
          />
        </View>
      </View>

      {/* passoword */}
      <View style={[styles.TextInputContainer]}>
        <Animated.Text style={[styles.placeholder,{color:THEME.TEXT}]}>Password</Animated.Text>
        <Animated.Text style={[styles.error, passwordErrorAnimation]}>
          ! Password is required
        </Animated.Text>
        <View style={[styles.errorContainer]}>
          <AnimatedTextInput
            entering={FadeInLeft.springify().damping(80).stiffness(200)}
            style={[styles.Input,{color:THEME.TEXT}]}
            secureTextEntry={showPassword}
            value={password}
            onChangeText={text =>
              setNewPassword(pass => {
                return {...pass, password: text};
              })
            }
          />
          <AnimatedIcon
           entering={FadeInLeft.springify().damping(80).stiffness(200)}
            style={[styles.icon]}
            name="key"
            size={FontSize.SUB}
            color={isDarkMode ? THEME.BUTTONTEXT : "#4a2b74"}
          />
          <Pressable
            style={[styles.eye]}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => setShowPassword(!showPassword)}>
            <AnimatedIcon
             entering={FadeInLeft.springify().damping(80).stiffness(200)}
              name={showPassword ? 'eye' : 'eye-off'}
              size={FontSize.TITLE + 2}
              color={isDarkMode ? 'snow' : 'black'}
            />
          </Pressable>
        </View>
      </View>
      {/* account name */}
      <View style={[styles.TextInputContainer]}>
        <Animated.Text style={[styles.placeholder,{color:THEME.TEXT}]}>
          Connected Account
        </Animated.Text>
        <AnimatedTextInput
          entering={FadeInLeft.springify().damping(80).stiffness(200)}
          style={[styles.Input, {paddingHorizontal: 5,color:THEME.TEXT}]}
          value={connectedAccount}
          onChangeText={text =>
            setNewPassword(pass => {
              return {...pass, connectedAccount: text};
            })
          }
        />
        <Animated.Text style={[styles.error, connectedAccountErrorAnimation]}>
          ! connected account is required
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  TextInputContainer: {
    padding: SCREEN_WIDTH * 0.05,
  },
  placeholder: {
    fontFamily: FontFamily.LIGHT,
    fontSize: FontSize.BODYTEXT,
    marginBottom: 10,
  },
  Input: {
    borderWidth: 2,
    borderRadius: 100 / 10,
    borderColor: 'grey',
    paddingHorizontal: 40,
  },
  icon: {
    position: 'absolute',
    top: '15%',
    left: '3%',
  },
  eye: {
    position: 'absolute',
    top: '20%',
    right: '5%',
    zIndex: 1,
  },
  errorContainer: {
    justifyContent: 'space-between',
  },
  error: {
    fontSize: FontSize.BODYTEXT,
    color: 'red',
    fontFamily: FontFamily.MEDIUM,
    marginHorizontal: 5,
    opacity: 1,
    position: 'absolute',
    bottom: 0,
    left: '5%',
    marginVertical: -5,
    letterSpacing: 0.5,
  },
});
