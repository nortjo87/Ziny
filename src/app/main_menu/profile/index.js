import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile() {
  // const navigation=useNavigation()
  const handleSignOut = async() => {
    await AsyncStorage.removeItem('uid');
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('displayName');
    await AsyncStorage.removeItem('email');
  };

  return (
    <View className='flex-1 justify-center items-center bg-white p-4'>
      <View className='w-full p-8 bg-foreground border-primary border-4 rounded-xl'>
        <Text className='text-lg font-bold mb-2'>
          Name:
        </Text>
        <Text className='text-lg mb-4  border-b-[1px]'>
          John Doe
        </Text>
        <Text className='text-lg font-bold mb-2 '>
          Email:
        </Text>
        <Text className='text-lg mb-4 border-b-[1px]'>
          johndoe@example.com
        </Text>
        <Text className='text-lg font-bold mb-2'>
          Phone number:
        </Text>
        <Text className='text-lg mb-4 border-b-[1px]'>
          +1234567890
        </Text>
        <Button
          mode="contained"
          onPress={handleSignOut}
          className='bg-primary w-full mt-4'
        >
          Sign Out
        </Button>
      </View>
    </View>
  );
}
