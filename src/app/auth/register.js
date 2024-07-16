import React, { useState } from 'react';
import { View, Text ,Image} from 'react-native';
import { TextInput, Button,IconButton } from 'react-native-paper';
import imagesImg from '../../assets/img';
import { useNavigation } from '@react-navigation/native';
import {auth} from './../../config/services/firebaseConfig';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';


export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation=useNavigation()

  const createUser=async()=>{
    try{
      const response=await createUserWithEmailAndPassword(auth,email,password)
      await updateProfile(response.user, {
        displayName: name
      });
      console.log('registrasi berhasil',response)
      navigation.replace('login')
    }catch(er){
      alert(er.message)
    }
  }

  function handleClickSubmit(){
    createUser()
  }

  const handleButtonBack = () => {
    navigation.replace('login');
  };

  return (
    <View className='flex-1 justify-center items-center p-4 w-full h-full bg-foreground relative'>
      <Image className='absolute -top-36 h-[600px] w-[800px]' source={imagesImg.BLOB}/>
      <View className='w-full flex-1 items-center justify-center -mt-20'>
        <IconButton
          icon="arrow-left"
          size={30}
          color="white"
          className='bg-foreground '
          onPress={()=>handleButtonBack()}
          style={{  top: -60, right: 140}}
        />
        <View className='w-full '>
          <Text className='ml-9 text-2xl font-semibold mb-4 text-white'>
            Register
          </Text>
        </View>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          mode="outlined"
          className='w-64 mb-4 '
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
          className='w-64 mb-4 '
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          secureTextEntry
          className='w-64 mb-4 '
        />
        <TextInput
          label="Confirm Password"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          secureTextEntry
          className='w-64 mb-4 '
        />
        <View className='flex-row w-full space-x-2 justify-center'>
          <Button className='bg-primary w-28' mode="contained" style={{ borderColor: 'white', borderWidth: 1 }} onPress={() => handleClickSubmit()}>
            Submit
          </Button>
        
        </View>
      </View>
    </View>
  );
}
