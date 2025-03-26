import {Pressable, StyleSheet, View, Alert} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {storage} from '../../server';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
} from 'react-native-reanimated';
import {Data} from '../../GlobalData';
import {useTheme} from '../../ThemeProvider';

const AnimatedButton = Animated.createAnimatedComponent(Pressable);

const Header = ({
  storedPasswords,
  setStoredPasswords,
  isDeleting,
  setIsDeleting,
  slectedIndex,
  setSlectedIndex,
  setDeletedArray,
}) => {
  const handleClose = useCallback(() => {
    setSlectedIndex([]);
    setIsDeleting(false);
  }, []);

  const {setRecentlyAdded} = useContext(Data);
  const {THEME} = useTheme();

  const handleDelete = useCallback(() => {
    const mappedStoredPassword = slectedIndex.map(
      index => storedPasswords[index],
    );

    setDeletedArray(previousDeletedArray => [
      ...previousDeletedArray,
      ...mappedStoredPassword,
    ]);

    try {
      setStoredPasswords(prevStoredPasswords => {
        const updatedPasswords = prevStoredPasswords.filter(
          passwords =>
            !mappedStoredPassword.some(
              deletedItems => deletedItems.id === passwords.id,
            ),
        );
        storage.set('UserPassword', JSON.stringify(updatedPasswords));

        return updatedPasswords;
      });

      setRecentlyAdded(previous => {
        const updatePasswords = previous.filter(
          password =>
            !mappedStoredPassword.some(
              deteletedItems => deteletedItems.id === password.id,
            ),
        );
        storage.set('RecentlyAdded', JSON.stringify(updatePasswords));

        return updatePasswords;
      });
    } catch (Error) {
      console.log(`Error while deleting user password => ${Error}`);
    } finally {
      setDeletedArray([]);
      setSlectedIndex([]);
      setIsDeleting(false);
    }
  }, [slectedIndex, storedPasswords]);

  const handleTrash = useCallback(() => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete these items?',
      [{text: 'Discard'}, {text: 'Delete', onPress: handleDelete}],
    );
  }, [handleDelete]);

  return isDeleting ? (
    <View style={[styles.container]}>
      <AnimatedButton
        entering={FadeIn.springify().damping(20).stiffness(50)}
        exiting={FadeOut.springify().damping(20).stiffness(50)}
        onPress={handleClose}>
        <Ionicons name="close" size={FontSize.SUB} color={THEME.TEXT} />
      </AnimatedButton>

      <View style={[styles.trashView]}>
        <Animated.Text
          entering={FadeInUp.springify().damping(20).stiffness(50)}
          exiting={FadeOutUp.springify().damping(20).stiffness(50)}
          style={[styles.count, {color: THEME.TEXT}]}>
          {slectedIndex.length}
        </Animated.Text>

        <AnimatedButton
          entering={FadeIn.springify().damping(20).stiffness(50)}
          exiting={FadeOut.springify().damping(20).stiffness(50)}
          onPress={handleTrash}>
          <Ionicons name="trash" size={FontSize.SUB} color={THEME.TEXT} />
        </AnimatedButton>
      </View>
    </View>
  ) : (
    <View style={[styles.container]}>
      <Animated.Text
        entering={FadeInLeft.springify().damping(20).stiffness(80)}
        exiting={FadeOutLeft.springify().damping(20).stiffness(80)}
        style={[styles.headingTitle, {color: THEME.TEXT}]}>
        Items
      </Animated.Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SCREEN_WIDTH * 0.05,
        }}>
        <Animated.Text
          entering={FadeInRight.springify().damping(20).stiffness(80)}
          exiting={FadeOutRight.springify().damping(20).stiffness(80)}
          style={[styles.passwordLenght, {color: THEME.TEXT}]}>
          {storedPasswords.length}
        </Animated.Text>
        <Animated.Text
          entering={FadeInRight.springify().damping(20).stiffness(80)}
          exiting={FadeOutRight.springify().damping(20).stiffness(80)}
          style={[styles.passwordLenght, {color: THEME.TEXT}]}>
          Pass
        </Animated.Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.07,
    flexDirection: 'row',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingTitle: {
    fontSize: FontSize.SUB,
    fontFamily: FontFamily.BOLD,
  },
  count: {
    fontSize: FontSize.SUB,
    fontFamily: FontFamily.MEDIUM,
  },
  trashView: {
    flexDirection: 'row',
    gap: SCREEN_WIDTH * 0.1,
    alignItems: 'center',
  },
  passwordLenght: {
    fontSize: FontSize.TITLE + 5,
    fontFamily: FontFamily.BOLD,
  },
});
