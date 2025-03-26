import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Theme/Dimension';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useCallback, useContext, useState} from 'react';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {Menu, Divider} from 'react-native-paper';
import {Data} from '../../GlobalData';
import {storage} from '../../server';
import { useTheme } from '../../ThemeProvider';

const Heading = ({navigation, Details}) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const {THEME} = useTheme()

  const {storedPasswords, recentlyAdded} = useContext(Data);

  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  const handleDeletePart2 = useCallback(() => {

    const updatedStoredPassword = storedPasswords.filter(
      element => element.id !== Details.id,
    );
    storage.set('UserPassword', JSON.stringify(updatedStoredPassword));

    const updatedRecentPassword = recentlyAdded.filter(element => element.id !== Details.id);
    storage.set('RecentlyAdded',JSON.stringify(updatedRecentPassword))

    navigation.goBack();
  }, [storedPasswords,recentlyAdded]);


  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete confirmation',
      'Are you sure you want to delete this item?',
      [{text: 'Discard'}, {text: 'Delete', onPress: handleDeletePart2}],
    );
  }, [handleDeletePart2]);

  return (
    <Animated.View
      entering={FadeInUp.springify().damping(20).stiffness(30)}
      style={[styles.Heading,{backgroundColor: THEME.SECOUNDARY2}]}>
      <View
        style={{
          flexDirection: 'row',
          gap: SCREEN_WIDTH * 0.05,
          alignItems: 'center',
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={FontSize.SUB}/>
        </Pressable>

        <Text style={[styles.headingText]}>Password detail</Text>
      </View>

      <Menu
        visible={visibleMenu}
        onDismiss={closeMenu}
        anchor={
          <Pressable onPress={openMenu}>
            <Ionicons name="ellipsis-vertical" size={FontSize.SUB} />
          </Pressable>
        }
        style={[styles.menu]}
        contentStyle={{backgroundColor: THEME.BGCOLOR}}
        >
        <Menu.Item
          onPress={() => navigation.replace('editPassword', {Details})}
          titleStyle={{color: THEME.TEXT}}
          title="Edit"
        />
        <Menu.Item onPress={handleDelete} title="Delete" titleStyle={{color: THEME.TEXT}}/>
      </Menu>
    </Animated.View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  Heading: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.07,
    margin: SCREEN_WIDTH * 0.05,
    borderRadius: 100 / 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    alignItems: 'center',
  },
  headingText: {
    fontSize: FontSize.SUB - 5,
    fontFamily: FontFamily.BOLD,
  },
  menu: {
    position: 'absolute',
    zIndex: 1,
  },
});
