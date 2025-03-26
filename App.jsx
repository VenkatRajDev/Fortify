import { TurboModuleRegistry } from 'react-native';
import React, {useMemo} from 'react';
import {MMKV} from 'react-native-mmkv';

// Global components
import GlobalData from './GlobalData';
import {ThemeProvider} from './ThemeProvider';

//Navigation Imported
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Storage = new MMKV();

//Screens imported
import WELCOME from './screens/welcome/WELCOME';
import LOGIN from './screens/Login/LOGIN';

import HOME from './screens/Home/HOME';
import AddPass from './screens/AddPassword/AddPASS';
import PASSDETAIL from './screens/PasswordDetails/PASSDETAIL';
import EDIT from './screens/EditPassword/EDIT';
import EDITPROFILE from './screens/EditProfile/EDITPROFILE';
import VERIFY from './screens/Verify/VERIFY';
import ABOUTUS from './screens/AboutUs/ABOUTUS';
import FORGOTPASS from './screens/VerifyForgotPass/FORGOTPASS';

const App = () => {
  const isLogedIn = useMemo(() => {
    try{
      const data = Storage.getBoolean('IsLogedIn') || false;
      return data;
    }catch(e){
      console.log(`error while getting data from the storage on start: ${e}`)
    }
  }, []);

  return (
    <ThemeProvider>
      <GlobalData>
        <NavigationContainer>
          <Stack.Navigator>
            {isLogedIn === true ? (
              <Stack.Group
                screenOptions={{headerShown: false, animation: 'none'}}>
                <Stack.Screen name='verify' component={VERIFY}/>
                <Stack.Screen name="home" component={HOME} />
                <Stack.Screen name="addPassword" component={AddPass} />
                <Stack.Screen name="passwordDetails" component={PASSDETAIL} />
                <Stack.Screen name="editPassword" component={EDIT} />
                <Stack.Screen
                  name="editProfile"
                  component={EDITPROFILE}
                  options={{
                    presentation: 'modal',
                    animation: "reveal_from_bottom",
                  }}
                />
                <Stack.Screen name='aboutUs' component={ABOUTUS}/>
                <Stack.Screen name='forgotPassword' component={FORGOTPASS}/>
              </Stack.Group>
            ) : (
              <Stack.Group
                screenOptions={{headerShown: false, animation: 'fade'}}>
                <Stack.Screen name="welcome" component={WELCOME} />
                <Stack.Screen name="login" component={LOGIN} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalData>
    </ThemeProvider>
  );
};

export default App;
