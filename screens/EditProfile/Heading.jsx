import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {FontFamily, FontSize} from '../../Theme/Fonts';
import {SCREEN_WIDTH} from '../../Theme/Dimension';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../ThemeProvider';

const Heading = ({navigation, setEditedInformation}) => {
  const {THEME} = useTheme()

  const handleBackButton = useCallback(() => {
      setEditedInformation(previous => {
        return {...previous, username: null, password: null, hint: null};
      });
      navigation.goBack()
  },[]);

  return (
    <View style={[styles.container]}>
      <View
        style={{
          flexDirection: 'row',
          gap: SCREEN_WIDTH * 0.05,
          alignItems: 'center',
        }}>
        <Pressable onPress={handleBackButton}>
          <Ionicons name="chevron-back" size={FontSize.SUB} color={THEME.TEXT}/>
        </Pressable>
        <Text style={[styles.title,{color:THEME.TEXT}]}>Edite profile</Text>
      </View>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    padding: SCREEN_WIDTH * 0.05,
  },
  title: {
    fontSize: FontSize.SUB,
    fontFamily: FontFamily.MEDIUM,
  },
});
