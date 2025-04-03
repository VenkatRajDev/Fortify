import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Light} from '../../Theme/Appearance';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Heading from './Heading';
import {Provider as PapperProvider} from 'react-native-paper';
import {useTheme} from '../../ThemeProvider';

const LightBackground = Light.BGCOLOR;
const _dotSize = 8;

const SecureDots = () => {
  return (
    <View
      style={{
        width: _dotSize,
        height: _dotSize,
        borderRadius: _dotSize / 2,
        backgroundColor: Light.TEXT,
      }}
    />
  );
};

const PASSDETAIL = ({navigation, route}) => {
  const {Details} = route.params;
  const {THEME, isDarkMode} = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: THEME.BGCOLOR}]}>
      <PapperProvider>
        <ScrollView
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          <Heading navigation={navigation} Details={Details} />

          <Animated.View
            style={[
              styles.ItemContainer,
              {backgroundColor: THEME.SECOUNDARY2},
            ]}>
            <View style={[styles.accountTitle]}>
              <View style={[styles.logo]}>
                <Ionicons
                  name="shield-checkmark"
                  size={FontSize.SUB}
                  color="#4a2b74"
                />
              </View>
              <Text style={[styles.AccountText]}>{Details.account}</Text>
            </View>

            <Animated.View
              entering={FadeInDown.springify().damping(20).stiffness(30)}
              style={[styles.passwordContainer]}>
              <Text style={[styles.placeHolder]}>Username/email address</Text>
              <View style={[styles.eachItemcontentView]}>
                <Ionicons name="mail" size={FontSize.SUB} color="#4a2b74" />
                <Text style={[styles.eachItemText]}>{Details.username}</Text>
              </View>

              <Text style={[styles.placeHolder]}>Password</Text>
              <View
                style={{
                  ...styles.eachItemcontentView,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SCREEN_WIDTH * 0.05,
                  }}>
                  <Ionicons name="key" size={FontSize.SUB} color="#4a2b74" />
                  <Text style={[styles.eachItemText]}>
                    {!showPassword ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: SCREEN_WIDTH * 0.01,
                        }}>
                        {Details.password.split('').map((_, index) => {
                          return <SecureDots key={index.toString()} />;
                        })}
                      </View>
                    ) : (
                      Details.password
                    )}
                  </Text>
                </View>
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={FontSize.SUB}
                    color="#4a2b74"
                  />
                </Pressable>
              </View>

              <Text style={[styles.placeHolder]}>Connected account</Text>
              <View style={[styles.eachItemcontentView]}>
                <Ionicons name="people" size={FontSize.SUB} color="#4a2b74" />
                <Text style={[styles.eachItemText]}>
                  {Details.connectedAccount}
                </Text>
              </View>
            </Animated.View>

            <View style={[styles.DetailsContainer]}>
              <Text
                style={[
                  styles.detailHeaing,
                  {color: isDarkMode ? '#5be264c4' : 'green'},
                ]}>
                Details
              </Text>

              <View>
                <Text style={[styles.placeHolder]}>
                  Website address/App name
                </Text>
                <Text style={[styles.eachItemText]}>{Details.website}</Text>
              </View>

              <View>
                <Text style={[styles.placeHolder]}>Notes</Text>
                <Text style={[styles.eachItemText]}>{Details.notes}</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </PapperProvider>
    </SafeAreaView>
  );
};

export default PASSDETAIL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ItemContainer: {
    flex: 1,
    margin: SCREEN_WIDTH * 0.05,
    marginTop: SCREEN_HEIGHT * 0.02,
    borderRadius: 100 / 8,
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.05,
  },
  accountTitle: {
    height: SCREEN_WIDTH * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.03,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: LightBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AccountText: {
    fontSize: FontSize.SUB,
    fontFamily: FontFamily.BOLD,
  },
  passwordContainer: {
    height: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: LightBackground,
    borderRadius: 100 / 8,
    padding: SCREEN_WIDTH * 0.05,
    justifyContent: 'space-around',
    elevation: 8,
  },
  placeHolder: {
    fontSize: FontSize.BUTTONTEXT,
    fontFamily: FontFamily.LIGHT,
  },
  eachItemcontentView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.05,
    backgroundColor: 'red',
  },
  eachItemText: {
    fontSize: FontSize.SUB - 5,
    fontFamily: FontFamily.MEDIUM,
  },
  DetailsContainer: {
    alignSelf: 'flex-start',
    padding: SCREEN_WIDTH * 0.02,
    gap: SCREEN_HEIGHT * 0.02,
  },
  detailHeaing: {
    fontSize: FontSize.SUB - 2,
    fontFamily: FontFamily.BOLD,
  },
});
