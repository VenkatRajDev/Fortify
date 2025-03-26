import { StyleSheet,Pressable } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontSize } from '../../Theme/Fonts';
import { Light } from '../../Theme/Appearance';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Theme/Dimension';
import { useTheme } from '../../ThemeProvider';

const CustomTabBar = ({ state, descriptors, navigation }) => {

  const {THEME,isDarkMode} = useTheme()

  const focusedColor = isDarkMode ? THEME.TEXT : "#6709eb"
  const unFocusedColor = isDarkMode ? '#77888e' : "#3c3a3a"

  return (
    <Animated.View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const iconName = {
          tabhome: isFocused ? "home" : "home-outline",
          items: isFocused ? "cube" : "cube-outline",
          generate: isFocused ? "flask" : "flask-outline",
          profile: isFocused ? "person" : "person-outline",
        }[route.name] || null;

        return (
          <Pressable key={route.key} onPress={onPress} style={[styles.tabItem,{backgroundColor:THEME.TABBAR}]}>
            <Ionicons name={iconName} size={FontSize.SUB} color={isFocused ? focusedColor : unFocusedColor} />
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: SCREEN_HEIGHT * 0.09,
    backgroundColor: Light.SECOUNDARY,
    borderTopWidth: 1,
    width: SCREEN_WIDTH,
    borderTopWidth: 0
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
