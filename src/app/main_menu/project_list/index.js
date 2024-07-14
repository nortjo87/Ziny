// pages/Profile.js or wherever your Profile component is
import React from 'react';
import { View ,Text} from 'react-native';
import { Link } from 'expo-router';

export default function ProjectList() {

  return (
    <View className='w-full h-full flex justify-center items-center'>
      <Text className='text-lg'>
        asdds
      </Text>
      <Link href='/catatan/'>
        <Text>ProjectList</Text>
      </Link>
    </View>
  );
}
