import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import HandleTheme from './HandleTheme';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Data} from '../../GlobalData';
import {useTheme} from '../../ThemeProvider';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

const RenderItems = ({item}) => {
  const navigation = useNavigation();
  const {THEME} = useTheme();
  return (
    <AnimatedTouchable
      entering={FadeIn.springify().damping(20).stiffness(30)}
      onPress={() => navigation.navigate('passwordDetails', {Details: item})}
      style={[styles.passwordItems, {backgroundColor: THEME.SECOUNDARY}]}>
      <Text style={[styles.accountName, {color: THEME.TEXT}]}>
        {item.account}
      </Text>
      <Text numberOfLines={1} style={[styles.username, {color: THEME.TEXT}]}>
        {item.username}
      </Text>
    </AnimatedTouchable>
  );
};

const UserInfo = () => {
  const {userInformation, storedPasswords} = useContext(Data);
  const {THEME} = useTheme();

  console.log(userInformation.hint);

  const limitedPasswords = useMemo(() => {
    const length = storedPasswords.length > 5 ? 5 : storedPasswords.length;

    let newArray = [];
    for (let i = 0; i < length; i++) {
      newArray.push(storedPasswords[i]);
    }
    return newArray;
  }, [storedPasswords]);

  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={[styles.eachItemContainer]}>
          <Text style={[styles.titles, {color: THEME.BUTTONTEXT}]}>
            Nickname
          </Text>
          <Text style={[styles.contant, {color: THEME.TEXT}]}>
            {userInformation.username}
          </Text>
        </View>

        {storedPasswords.length !== 0 && (
          <View style={{gap: SCREEN_HEIGHT * 0.01}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...styles.titles,
                  padding: SCREEN_WIDTH * 0.05,
                  color: THEME.BUTTONTEXT,
                }}>
                Passwords
              </Text>
              <Pressable
                onPress={() => navigation.navigate('items')}
                style={{
                  width: SCREEN_WIDTH * 0.08,
                  height: SCREEN_WIDTH * 0.08,
                  borderRadius: (SCREEN_WIDTH * 0.08) / 2,
                  backgroundColor: THEME.SECOUNDARY2,
                  right: SCREEN_WIDTH * 0.05,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="arrow-forward"
                  size={FontSize.TITLE + 2}
                  color={THEME.TEXT}
                />
              </Pressable>
            </View>
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={limitedPasswords}
                renderItem={({item}) => <RenderItems item={item} />}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        )}

        <HandleTheme />

        <View style={styles.eachItemContainer}>
          <Text style={[styles.titles,{color:THEME.BUTTONTEXT}]}>Hint</Text>
          <Text style={[styles.contant,{color:THEME.TEXT}]}>{userInformation.hint}</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('aboutUs')}
          style={[styles.eachItemContainer, styles.aboutUs]}>
          <Animated.Text style={[styles.titles, {color: THEME.TEXT}]}>
            About Us
          </Animated.Text>
          <AnimatedIcon
            name="information"
            size={FontSize.SUB}
            color={THEME.TEXT}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  eachItemContainer: {
    padding: SCREEN_WIDTH * 0.05,
    gap: SCREEN_HEIGHT * 0.02,
  },
  titles: {
    fontSize: FontSize.SUB,
    fontFamily: FontFamily.BOLD,
  },
  contant: {
    fontSize: FontSize.TITLE,
    fontFamily: FontFamily.MEDIUM,
  },
  passwordItems: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.15,
    marginHorizontal: SCREEN_WIDTH * 0.03,
    borderRadius: 100 / 10,
    padding: SCREEN_WIDTH * 0.05,
    justifyContent: 'space-around',
    elevation: 10,
  },
  accountName: {
    fontSize: FontSize.TITLE,
    fontFamily: FontFamily.MEDIUM,
  },
  username: {
    fontSize: FontSize.BODYTEXT,
    fontFamily: FontFamily.LIGHT,
  },
  aboutUs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
