import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Link } from 'expo-router';


function Catatan() {
  const [test,setTest]=useState('testsss')
  return (
    <View>
        <Text>ini Catatanssaassa</Text>
        <Link href='/'>
          <Text>{test}</Text>
        </Link>
    </View>
  )
}

export default Catatan