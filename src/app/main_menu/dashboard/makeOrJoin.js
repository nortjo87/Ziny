import React, { useState } from 'react';
import { View, Text, TextInput,BackHandler  } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useGlobalStore from '../../../config/store/global';
import { useNavigation ,useFocusEffect } from '@react-navigation/native';

export default function ProjectPage() {
  const {jOrN,setJOrN,setProjectName,setProjectCode,type}=useGlobalStore()
  const navigation=useNavigation()
  const [text, setText] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleNewProject = () => {
    setText('Input Name Project');
    setJOrN('new')
    setProjectName(inputValue)
  };

  const handleJoinProject = () => {
    setText('Input Code Project');
    setJOrN('join')
    setProjectCode(inputValue)
  };

  const handleSubmit = () => {
    // Handle submit logic here
    // console.log('Submitted with input:', inputValue);
    jOrN=='new'?setProjectName(inputValue):setProjectCode(inputValue)
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
          onChangeText={setInputValue}
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
