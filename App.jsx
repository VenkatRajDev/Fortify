import {} from 'react-native';
import React, {useMemo} from 'react';
import {MMKV} from 'react-native-mmkv';

//Navigation Imported
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Storage = new MMKV();

//Screens imported
import WELCOME from './screens/welcome/WELCOME';
import LOGIN from './screens/Login/LOGIN';
import HOME from './screens/Home/HOME';

const App = () => {

  const isLogedIn = useMemo(() => {
    return Storage.getBoolean('IsLogedIn')
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogedIn === true ? (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="home"
              component={HOME}
              options={{animation: 'fade_from_bottom'}}
            />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{headerShown: false, animation: 'fade'}}>
            <Stack.Screen name="welcome" component={WELCOME} />
            <Stack.Screen name="login" component={LOGIN} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
