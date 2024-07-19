import React, { useState } from 'react';
import { View, Text, TextInput,BackHandler  } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useGlobalStore from '../../../config/store/global';
import { useNavigation ,useFocusEffect } from '@react-navigation/native';
import { db, doc, setDoc } from './../../../config/services/firebaseConfig';


function uniqueValue() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



export default function ProjectPage() {
  const {jOrN,setJOrN,setProjectName,setProjectCode,type,uid,projectCode}=useGlobalStore()
  const navigation=useNavigation()
  const [text, setText] = useState('');
  const [inputValue, setInputValue] = useState('');

  const addData = async () => {
    const namaBahan=[]
    const jumlahBahan=[]
    const satuanBahan=[]
    const hargaBahan=[]
    const tanggal=[]
    const namaKebutuhan=[]
    const besarKebutuhan=[]

    try {
      const docRef = doc(db, type=='HPP'?'projectNote':'projectHPP',projectCode );
      if(type==='HPP'){
        await setDoc(docRef, { tanggal, namaKebutuhan, besarKebutuhan });
      }else{
        await setDoc(docRef, { namaBahan, jumlahBahan, satuanBahan, hargaBahan });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleNewProject = () => {
    setText('Input Name Project');
    setJOrN('new')
  };

  const handleJoinProject = () => {
    setText('Input Code Project');
    setJOrN('join')
  };

  const handleInputChange = (val) => {
    setInputValue(val);
    setProjectCode(uid+uniqueValue()) 
    console.log(projectCode)
  };

  const handleSubmit = () => {
    // Handle submit logic here
    // console.log('Submitted with input:', inputValue);
    addData()
    setProjectName(inputValue)
    type=='HPP'?navigation.replace('catatan_keuangan'):navigation.replace('hitung_hpp')
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.replace('main_menu');
        setJOrN('')
        setProjectCode('')
        setProjectName('')
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4 w-full h-full bg-foreground">
      <View className=" justify-center items-center w-auto h-auto p-4 rounded-xl border border-primary bg-white">
        

        <View className=" w-64  mb-4 flex-row justify-center items-center">
          
          <Button
            icon="plus"
            mode="contained"
            className={`rounded-xl ${jOrN=='new'?'bg-primary ':'bg-primarydisable'}`}
            onPress={handleNewProject}
          >
            <Text className="ml-4 text-xl ">
              New Project
            </Text>
          </Button>
          
        </View>

        <View className="w-auto mb-4 flex-row justify-center items-center">
          <Button
            icon="account-group"
            mode="contained"
            className={`rounded-xl ${jOrN=='new'?' bg-primarydisable':'bg-primary '}`}
            onPress={handleJoinProject}
          >
            <Text className="ml-4 text-xl">
              Join Project
            </Text>
          </Button>
        </View>

        <Text className="text-lg font-bold mb-4 text-primary ">
          {text}
        </Text>

        <TextInput
          className={`w-64 mb-4 p-2 bg-white text-black rounded border-b-[1px] border-primary ${jOrN?'':'hidden'}`}
          placeholder="Enter value"
          value={inputValue}
          onChangeText={handleInputChange}
        />

        <Button
          icon="send"
          mode="contained"
          className={`bg-primary ${jOrN?'':'hidden'}`}
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
}
