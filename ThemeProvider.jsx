//import { View,Text } from "react-native";
import { createContext, useContext, useState } from "react";
import { Light, Dark} from "./Theme/Appearance";
import { storage } from "./server";

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {

    const [isDarkMode,setIsDarkMode] = useState(
        storage.getBoolean('IsDarkMode') ?? false
    )

    const THEME = isDarkMode ? Dark : Light

  return (
    <ThemeContext.Provider value={{THEME,isDarkMode,setIsDarkMode}}>
        {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)