import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from './splash';
import MainMenu from './main_menu';
import Register from './auth/register';
import Login from './auth/login';

const Stack = createNativeStackNavigator();

export const AboutStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='splash'
      screenOptions={
        {headerShown: false}
      }
    >
      <Stack.Screen name='splash' component={SplashScreen}/>
      <Stack.Screen name='login' component={Login}/>
      <Stack.Screen name='register' component={Register}/>
      <Stack.Screen name='main_menu' component={MainMenu}/>
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    
      <AboutStack />
    
  );
}
