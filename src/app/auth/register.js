import React, { useState } from 'react';
import { View, Text ,Image} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import imagesImg from '../../assets/img';
import { useNavigation } from '@react-navigation/native';


export default function Login() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation=useNavigation()

  function handleClickSubmit(){
    navigation.replace('login')
  }

  return (
    <View className='flex-1 justify-center items-center p-4 w-full h-full bg-foreground relative'>
      <Image className='absolute -top-36 h-[600px] w-[800px]' source={imagesImg.BLOB}/>
      <View className='w-full flex-1 items-center justify-center -mt-20'>
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
          label="Phone Number"
          value={phone}
          onChangeText={text => setPhone(text)}
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
