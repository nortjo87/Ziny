// pages/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imagesICN from '../assets/icon'; 

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('login');
    }, 2000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation]);

  return (
    <View className='w-full h-full flex justify-center items-center bg-primary'>
      <Image source={imagesICN.LOGO} className='h-32 w-32'/>
    </View>
  );
}

