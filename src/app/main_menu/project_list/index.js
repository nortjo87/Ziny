import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TextInput, } from 'react-native';
import { IconButton } from 'react-native-paper';
import useGlobalStore from '../../../config/store/global';
import { db, doc, setDoc, getDoc } from './../../../config/services/firebaseConfig';
import { useNavigation } from '@react-navigation/native';


export default function ProjectList() {
  const navigation=useNavigation()
  const { uid,setProjectCode,setType } = useGlobalStore();
  const [projectNameList, setProjectNameList] = useState([]);
  const [projectCodeList, setProjectCodeList] = useState([]);
  const [projectTypeList, setProjectTypeList] = useState([]);
  
  const [editableIndex, setEditableIndex] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');
  const [editType, setEditType] = useState('');

  useEffect(() => {
    readData(); // Fetch data when component mounts
  }, []);

  const handleEdit = (index) => {
    setEditName(projectNameList[index]);
    setEditCode(projectCodeList[index]);
    setEditType(projectTypeList[index]);
    setEditableIndex(index);
  };

  const handleSaveEdit = async () => {
    const updatedProjectNames = [...projectNameList];
    const updatedProjectCodes = [...projectCodeList];
    const updatedProjectTypes = [...projectTypeList];
    
    updatedProjectNames[editableIndex] = editName;
    updatedProjectCodes[editableIndex] = editCode;
    updatedProjectTypes[editableIndex] = editType;

    setProjectNameList(updatedProjectNames);
    setProjectCodeList(updatedProjectCodes);
    setProjectTypeList(updatedProjectTypes);
    setEditableIndex(null);

    await addData(updatedProjectNames, updatedProjectCodes, updatedProjectTypes); // Save data
  };

  const handleDelete = (index) => {
    Alert.alert(
      'Hapus Proyek',
      'Apakah Anda yakin ingin menghapus proyek ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', onPress: async () => {
            const updatedProjectNames = projectNameList.filter((_, i) => i !== index);
            const updatedProjectCodes = projectCodeList.filter((_, i) => i !== index);
            const updatedProjectTypes = projectTypeList.filter((_, i) => i !== index);

            setProjectNameList(updatedProjectNames);
            setProjectCodeList(updatedProjectCodes);
            setProjectTypeList(updatedProjectTypes);

            await addData(updatedProjectNames, updatedProjectCodes, updatedProjectTypes); // Save data
        } }
      ]
    );
  };

  const addData = async (projectNameList, projectCodeList, projectTypeList) => {
    try {
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, { projectNameList, projectCodeList, projectTypeList });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const readData = async () => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProjectNameList(docSnap.data().projectNameList || []);
        setProjectCodeList(docSnap.data().projectCodeList || []);
        setProjectTypeList(docSnap.data().projectTypeList || []);
      } else {
        console.log('No such document!');
      }
    } catch (e) {
      console.error('Error reading document: ', e);
    }
  };

  const handleOpen = (code,type)=>{
    setProjectCode(code)
    setType(type)
    type==='Note'?navigation.replace('catatan_keuangan'):navigation.replace('hitung_hpp')
    console.log(type,code)
  }

  return (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold text-primary mb-2">Project List</Text>

      {/* Projects of type "HPP" */}
      <Text className="font-semibold text-primary mb-2">Project hitung HPP</Text>
      {projectTypeList.map((type, index) => {
        if (type === 'HPP') {
          return (
            <View key={index} className="w-full h-10 border mb-1 border-primary flex-row items-center p-2">
              <View className="flex-1">
                {editableIndex === index ? (
                  <TextInput
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Project Name"
                    className="border border-primary pl-1 rounded"
                  />
                ) : (
                  <Text className='text-blue-600' onPress={()=>handleOpen(projectCodeList[index],projectTypeList[index])}>{projectNameList[index]}</Text>
                )}
              </View>
              <View className="flex-1">
                {editableIndex === index ? (
                  <TextInput
                    value={editCode}
                    placeholder="Project Code"
                    className="border border-primary pl-1 rounded"
                  />
                ) : (
                  <Text>{projectCodeList[index]}</Text>
                )}
              </View>
              
              <View className="flex-row">
                {editableIndex === index ? (
                  <IconButton size={20} icon="content-save" onPress={handleSaveEdit} />
                ) : (
                  <>
                    <IconButton size={20} icon="pencil" onPress={() => handleEdit(index)} />
                    <IconButton size={20} icon="delete" onPress={() => handleDelete(index)} />
                  </>
                )}
              </View>
            </View>
          );
        }
        return null;
      })}

      {/* Projects of type "Note" */}
      <Text className="font-semibold text-primary mb-2">Project catatan keuangan</Text>
      {projectTypeList.map((type, index) => {
        if (type === 'Note') {
          return (
            <View key={index} className="w-full h-10 border mb-1 border-primary flex-row items-center p-2">
              <View className="flex-1">
                {editableIndex === index ? (
                  <TextInput
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Project Name"
                    className="border border-primary pl-1 rounded"
                  />
                ) : (
                  <Text className='text-blue-600' onPress={()=>handleOpen(projectCodeList[index],projectTypeList[index])}>{projectNameList[index]}</Text>
                )}
              </View>
              <View className="flex-1">
                {editableIndex === index ? (
                  <TextInput
                    value={editCode}
                    placeholder="Project Code"
                    className="border border-primary pl-1 rounded"
                  />
                ) : (
                  <Text>{projectCodeList[index]}</Text>
                )}
              </View>
              <View className="flex-row">
                {editableIndex === index ? (
                  <IconButton size={20} icon="content-save" onPress={handleSaveEdit} />
                ) : (
                  <>
                    <IconButton size={20} icon="pencil" onPress={() => handleEdit(index)} />
                    <IconButton size={20} icon="delete" onPress={() => handleDelete(index)} />
                  </>
                )}
              </View>
            </View>
          );
        }
        return null;
      })}
    </ScrollView>
  );
}
