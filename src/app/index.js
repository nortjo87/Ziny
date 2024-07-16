/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from './splash';
import MainMenu from './main_menu';
import Register from './auth/register';
import Login from './auth/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const InsideStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='main_menu'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='main_menu' component={MainMenu} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='masuk'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='masuk' component={Login} />
      <Stack.Screen name='register' component={Register} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(false);

  const checkAuth = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    setUser(accessToken);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkAuth();
    }, 1000); // interval setiap 1 detik

    return () => clearInterval(interval); // membersihkan interval saat komponen unmount
  }, []);

  return (
    <Stack.Navigator
      initialRouteName='splash'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='splash' component={SplashScreen} />
      {user ? (
        <Stack.Screen name='login' component={InsideStack} />
      ) : (
        <Stack.Screen name='login' component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
