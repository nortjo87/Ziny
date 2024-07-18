import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal } from 'react-native';
import { Button, DataTable, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, doc, setDoc, getDoc } from './../../../../config/services/firebaseConfig';

export default function HitungHPP() {
  const [namaBahan, setNamaBahan] = useState([]);
  const [jumlahBahan, setJumlahBahan] = useState([]);
  const [satuanBahan, setSatuanBahan] = useState([]);
  const [hargaBahan, setHargaBahan] = useState([]);

  const [newNamaBahan, setNewNamaBahan] = useState('');
  const [newJumlahBahan, setNewJumlahBahan] = useState('');
  const [newSatuanBahan, setNewSatuanBahan] = useState('');
  const [newHargaBahan, setNewHargaBahan] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const addData = async () => {
    try {
      const docRef = doc(db, "users", "user_sonny_ilham");
      if (namaBahan.length > 0) {
        await setDoc(docRef, { namaBahan, jumlahBahan, satuanBahan, hargaBahan });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const readData = async () => {
    try {
      const docRef = doc(db, "users", "user_sonny_ilham");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setNamaBahan(docSnap.data()['namaBahan']);
        setJumlahBahan(docSnap.data()['jumlahBahan']);
        setSatuanBahan(docSnap.data()['satuanBahan']);
        setHargaBahan(docSnap.data()['hargaBahan']);
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  }

  const convertData = () => {
    return namaBahan.map((name, index) => ({
      id: index,
      namaBahan: name,
      jumlahBahan: jumlahBahan[index],
      satuanBahan: satuanBahan[index],
      hargaBahan: hargaBahan[index],
    }));
  };

  const [data, setData] = useState(convertData());
  const [editableRowId, setEditableRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  useEffect(() => {
    setData(convertData());
    addData()
  }, [namaBahan, jumlahBahan, satuanBahan, hargaBahan]);

  useEffect(() => {
    readData()
  }, [])

  const handleEdit = (row) => {
    setEditableRowId(row.id);
    setEditedRow(row);
  };

  const handleSave = (id) => {
    const updatedData = data.map((row) => (row.id === id ? editedRow : row));
    setData(updatedData);
    setEditableRowId(null);
    setEditedRow({});

    setNamaBahan(updatedData.map((row) => row.namaBahan));
    setJumlahBahan(updatedData.map((row) => row.jumlahBahan));
    setSatuanBahan(updatedData.map((row) => row.satuanBahan));
    setHargaBahan(updatedData.map((row) => row.hargaBahan));
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);

    setNamaBahan(updatedData.map((row) => row.namaBahan));
    setJumlahBahan(updatedData.map((row) => row.jumlahBahan));
    setSatuanBahan(updatedData.map((row) => row.satuanBahan));
    setHargaBahan(updatedData.map((row) => row.hargaBahan));
  };

  const handleChange = (name, value) => {
    setEditedRow({
      ...editedRow,
      [name]: value,
    });
  };

  const handleAddNewItem = () => {
    setNamaBahan([...namaBahan, newNamaBahan]);
    setJumlahBahan([...jumlahBahan, Number(newJumlahBahan)]);
    setSatuanBahan([...satuanBahan, newSatuanBahan]);
    setHargaBahan([...hargaBahan, Number(newHargaBahan)]);
    setNewNamaBahan('');
    setNewJumlahBahan('');
    setNewSatuanBahan('');
    setNewHargaBahan('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4 w-full h-full bg-foreground">
      <Text className="text-lg font-bold mb-4 text-primary">Hitung HPP</Text>
      <DataTable className="w-full bg-white rounded-xl">
        <DataTable.Header className='bg-gray-100 rounded-t-xl'>
          <DataTable.Title>Nama</DataTable.Title>
          <DataTable.Title style={{ justifyContent: 'center', alignItems: 'center' }} numeric>Jumlah</DataTable.Title>
          <DataTable.Title style={{ justifyContent: 'center', alignItems: 'center' }}>Satuan</DataTable.Title>
          <DataTable.Title style={{ justifyContent: 'center', alignItems: 'center' }} numeric>Harga</DataTable.Title>
          <DataTable.Title style={{ justifyContent: 'center', alignItems: 'center' }} numeric>Total</DataTable.Title>
          <DataTable.Title style={{ justifyContent: 'center', alignItems: 'center' }}></DataTable.Title>
        </DataTable.Header>

        {data.map((row) => (
          <DataTable.Row key={row.id}>
            <DataTable.Cell>
              {editableRowId === row.id ? (
                <TextInput
                  value={editedRow.namaBahan}
                  onChangeText={(text) => handleChange('namaBahan', text)}
                  className="w-full text-center p-2 border border-gray-300 rounded"
                />
              ) : (
                row.namaBahan
              )}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center', alignItems: 'center' }} numeric>
              {editableRowId === row.id ? (
                <TextInput
                  value={String(editedRow.jumlahBahan)}
                  onChangeText={(text) => handleChange('jumlahBahan', Number(text))}
                  className="w-full text-center p-2 border border-gray-300 rounded"
                />
              ) : (
                row.jumlahBahan
              )}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center', alignItems: 'center' }}>
              {editableRowId === row.id ? (
                <TextInput
                  value={editedRow.satuanBahan}
                  onChangeText={(text) => handleChange('satuanBahan', text)}
                  className="w-full text-center p-2 border border-gray-300 rounded"
                />
              ) : (
                row.satuanBahan
              )}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center', alignItems: 'center' }} numeric>
              {editableRowId === row.id ? (
                <TextInput
                  value={String(editedRow.hargaBahan)}
                  onChangeText={(text) => handleChange('hargaBahan', Number(text))}
                  className="w-full text-center p-2 border border-gray-300 rounded"
                />
              ) : (
                row.hargaBahan
              )}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center', alignItems: 'center' }} numeric>
              {row.jumlahBahan * row.hargaBahan}
            </DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center', alignItems: 'center' }}>
              {editableRowId === row.id ? (
                <IconButton
                  size={20}
                  icon="content-save"
                  color="green"
                  onPress={() => handleSave(row.id)}
                />
              ) : (
                <>
                  <IconButton
                    size={20}
                    icon="pencil"
                    color="blue"
                    onPress={() => handleEdit(row)}
                    className='ml-5'
                  />
                  <IconButton
                    size={20}
                    icon="delete"
                    color="red"
                    onPress={() => handleDelete(row.id)}
                    className='-ml-3'
                  />
                </>
              )}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <Button mode="contained" onPress={() => setModalVisible(true)} className="mt-4  bg-blue-500 rounded-full">
        Tambah Item
      </Button>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-opacity-50 ">
          <View className="bg-white rounded-lg p-4 w-80">
            <Text className="text-lg font-bold mb-4">Tambah Item</Text>
            <TextInput
              placeholder="Nama"
              value={newNamaBahan}
              onChangeText={setNewNamaBahan}
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <TextInput
              placeholder="Jumlah"
              value={newJumlahBahan}
              onChangeText={setNewJumlahBahan}
              keyboardType="numeric"
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <TextInput
              placeholder="Satuan"
              value={newSatuanBahan}
              onChangeText={setNewSatuanBahan}
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <TextInput
              placeholder="Harga"
              value={newHargaBahan}
              onChangeText={setNewHargaBahan}
              keyboardType="numeric"
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <Button mode="contained" onPress={handleAddNewItem} className="bg-blue-500 rounded p-2">
              Tambah Item
            </Button>
            <Button mode="text" onPress={() => setModalVisible(false)} className="mt-2 p-2">
              Batal
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
