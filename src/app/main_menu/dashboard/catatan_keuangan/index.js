import { View, Text } from 'react-native'
import React from 'react'
// import {db,doc,setDoc,getDoc} from './../../../../config/services/firebaseConfig'
  // const addData = async() => { 
  //   try {
  //     // Menentukan ID dokumen secara manual
  //     const docRef = doc(db, "users", "user_sonny_ilham");
    
  //     // Menggunakan setDoc untuk menulis data ke dokumen yang ditentukan
  //     await setDoc(docRef, {
  //       first: "Alanssss",
  //       middle: "Mathison",
  //       last: "Turing",
  //       born: 1912
  //     });
    
  //     // console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  // const readData = async() => { 
  //   try {
  //     const docRef = doc(db, "users", "user_alan_turing");
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data()['born']);
  //     } else {
  //       // Dokumen tidak ditemukan
  //       console.log("No such document!");
  //     }
  //   } catch (e) {
  //     console.error("Error reading document: ", e); 
  //   }
  // }
const CatatanKeuangan = () => {
  return (
    <View>
      <Text>CatatanKeuangan</Text>
    </View>
  )
}

export default CatatanKeuangan