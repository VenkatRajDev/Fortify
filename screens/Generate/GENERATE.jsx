import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Snackbar} from 'react-native-paper';
import {Data} from '../../GlobalData';
import LottieView from 'lottie-react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Theme/Dimension';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontFamily, FontSize } from '../../Theme/Fonts';
import { useTheme } from '../../ThemeProvider';
import Animated, { FadeIn } from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

const Generate = () => {
  const navigation = useNavigation();
  
  const {showmsg, setShowmsg} = useContext(Data);
  const {THEME} = useTheme()
  const hideToast = () => setShowmsg(false);

  return (
    <View style={[styles.container,{backgroundColor: THEME.BGCOLOR}]}>

        <LottieView
        source={require('../../assets/Lottie Json/generate.json')}
        autoPlay
        loop
        style={styles.lottieVideo}
        />

        <AnimatedTouchable
        entering={FadeIn.springify().damping(20).stiffness(30)}
        onPress={() => navigation.navigate('addPassword')}
        style={[styles.generateButton,{backgroundColor: THEME.BGBUTTON}]}>
          <Text style={[styles.generateText,{color:THEME.TEXT}]}>Add New</Text>
        </AnimatedTouchable>

      <Snackbar
        visible={showmsg}
        onDismiss={hideToast}
        action={{
          label: 'Close',
          onPress: hideToast,
        }}
        style={styles.snakbarmsg}>
        password saved sucessfully
      </Snackbar>
    </View>
  );
};

export default Generate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
  },
  lottieVideo:{
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.8,
  },
  snakbarmsg: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
  generateButton:{
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.07,
    borderRadius: 100 / 25,
    justifyContent:'center',
    alignItems:"center",
  },
  generateText:{
    fontSize: FontSize.BUTTONTEXT,
    fontFamily: FontFamily.MEDIUM,
  }
});
