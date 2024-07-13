// pages/Home.js or wherever your Home component is
import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import useGlobalStore from '../config/store/global';

export default function Home() {
  const { name } = useGlobalStore();

  return (
    <View className='bg-yellow-400 w-full h-full flex justify-center items-center'>
      <Text className='text-lg'>
        {name}
      </Text>
      <Link href='/catatan/'>
        <Text>catatan</Text>
      </Link>
    </View>
  );
}
