// pages/Profile.js or wherever your Profile component is
import React from 'react';
import { View ,Text} from 'react-native';
import { Link } from 'expo-router';

export default function Profile() {

  return (
    <View className='w-full h-full flex justify-center items-center'>
      <Text className='text-lg'>
        dsads
      </Text>
      <Link href='/catatan/'>
        <Text>profile</Text>
      </Link>
    </View>
  );
}
