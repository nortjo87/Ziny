import React, { useState } from 'react';
import { View, Text ,Image} from 'react-native';
import { TextInput, Button  } from 'react-native-paper';
import imagesImg from '../../assets/img';
import imagesIcn from '../../assets/icon'; 
import { useNavigation } from '@react-navigation/native';
import {auth} from './../../config/services/firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const signIn=async()=>{
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);

      const user = response.user;
      const idToken = await user.getIdToken(); 

      await AsyncStorage.setItem('accessToken', idToken);
      await AsyncStorage.setItem('uid', user.uid);
      await AsyncStorage.setItem('displayName', user.displayName);
      await AsyncStorage.setItem('email', user.email);



      // const a=await AsyncStorage.getItem('uid');
      // const b=await AsyncStorage.getItem('accessToken');
  
      // console.log('user id',a)
      // console.log('user id',b)
    }catch(er){
      alert(er.message)
    }
  }

  

  const handleClickSignUp = async () => {
    navigation.replace('register')
  };

  function handleClickSignIn() {
    signIn()
  }


  return (
    <View className='flex-1 justify-center items-center p-4 w-full h-full bg-foreground relative'>
      <Image className='absolute -top-36 h-[600px] w-[800px]' source={imagesImg.BLOB} />
      <View className='w-full flex-1 items-center justify-center -mt-20'>
        <Image source={imagesIcn.LOGO} className='h-32 w-32 ml-5' />
        <Text className='text-foreground text-2xl font-bold mb-4 items-center'>
          ZINY
        </Text>
        <View className='w-full'>
          <Text className='ml-9 text-2xl font-semibold mb-4 text-white'>
            Login
          </Text>
        </View>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
          className='w-64 mb-4'
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          secureTextEntry
          className='w-64 mb-4'
        />
        <View className='flex-row w-full space-x-2 justify-center'>
          <Button className='bg-primary w-28' mode="contained" style={{ borderColor: 'white', borderWidth: 1 }} onPress={handleClickSignIn}>
            Sign in
          </Button>
          <Button className='bg-primary w-28' mode="contained" style={{ borderColor: 'white', borderWidth: 1 }} onPress={handleClickSignUp}>
            Sign up
          </Button>
        </View>
      </View>
      
    </View>
  );
}
