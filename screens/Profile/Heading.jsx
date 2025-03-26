import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { FontFamily, FontSize } from '../../Theme/Fonts'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Theme/Dimension'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Data } from '../../GlobalData'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../ThemeProvider'

const _profilePicSize = SCREEN_WIDTH * 0.25

const Heading = () => {
  const {userInformation} = useContext(Data)
  const {THEME} = useTheme()

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Animated.Text
      style={[styles.welcome,{color:THEME.TEXT}]}>Hello again 👋🏻</Animated.Text>

      <View style={[styles.profileContainer]}>

      <Animated.Image
      source={require('../../assets/UserProfile/userProfile.jpg')}
      entering={FadeIn.springify().damping(20).stiffness(30)}
      style={[styles.profilePicView]}
      />

      <View style={[styles.usernameContainer]}>
      <Text
      style={[styles.username,{color:THEME.TEXT}]}>{userInformation.username}</Text>
      <Pressable onPress={() => navigation.navigate('editProfile')}>
      <Text
      style={[styles.editProfile,{color:THEME.TEXT}]}>Edit profile
      </Text>
      </Pressable>
      </View>

      </View>
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({
  container:{
    padding: SCREEN_WIDTH * 0.05,
    gap: SCREEN_HEIGHT * 0.05,
  },
  welcome:{
    fontSize: FontSize.SUB + 2,
    fontFamily: FontFamily.BOLD,
  },
  profileContainer:{
    flexDirection:'row',
    gap: SCREEN_WIDTH * 0.05,
  },
  profilePicView:{
    width: _profilePicSize,
    height: _profilePicSize,
    borderRadius: _profilePicSize / 2,
    elevation: 50
  },
  usernameContainer:{
    justifyContent:'center',
    gap: SCREEN_WIDTH * 0.01
  },
  username:{
    fontSize: FontSize.SUB,
    fontFamily: FontFamily.BOLD,
  },
  editProfile:{
    fontSize: FontSize.BUTTONTEXT + 2,
    fontFamily: FontFamily.MEDIUM,
    textDecorationLine:'underline'
  }
})