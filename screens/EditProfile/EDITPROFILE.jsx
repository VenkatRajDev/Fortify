import {ScrollView, StyleSheet, View} from 'react-native';
import React, {
  useContext,
  useState,
} from 'react';
import Heading from './Heading';
import Inputs from './Inputs';
import Buttons from './Buttons';
import {Data} from '../../GlobalData';
import {useSharedValue} from 'react-native-reanimated';
import { useTheme } from '../../ThemeProvider';

const EDITPROFILE = ({navigation}) => {
  const userAnimeValue = useSharedValue(0);
  const passwordAnimeValue = useSharedValue(0);
  const hintAnimeValue = useSharedValue(0);

  const {userInformation} = useContext(Data);
  const {THEME} = useTheme()

  const [editedInformation, setEditedInformation] = useState({
    username: userInformation.username,
    password: userInformation.password,
    hint: userInformation.hint,
  });

  return (
    <View style={[styles.container,{backgroundColor: THEME.BGCOLOR}]}>
      <ScrollView
        contentContainerStyle={styles.scrollviewStyle}
        style={styles.container}>
        <Heading
          navigation={navigation}
          setEditedInformation={setEditedInformation}
          editedInformatiom={editedInformation}
          userInformation={userInformation}
        />
        <Inputs
          editedInformation={editedInformation}
          setEditedInformation={setEditedInformation}
          userAnimeValue={userAnimeValue}
          passwordAnimeValue={passwordAnimeValue}
          hintAnimeValue={hintAnimeValue}
        />
        <Buttons
          editedInformation={editedInformation}
          setEditedInformation={setEditedInformation}
          userInformation={userInformation}
          navigation={navigation}
          userAnimeValue={userAnimeValue}
          passwordAnimeValue={passwordAnimeValue}
          hintAnimeValue={hintAnimeValue}
        />
      </ScrollView>
    </View>
  );
};

export default EDITPROFILE;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollviewStyle: {
    justifyContent: 'space-around',
  },
});
