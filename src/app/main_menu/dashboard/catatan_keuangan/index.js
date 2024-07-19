import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { DataTable, IconButton, Modal, Portal, Provider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, parse, isValid, compareAsc } from 'date-fns';
import { db, doc, setDoc, getDoc } from './../../../../config/services/firebaseConfig';
import useGlobalStore from '../../../../config/store/global';

export default function CatatanKeuangan() {
  const [tanggal, setTanggal] = useState([]);
  const [namaKebutuhan, setNamaKebutuhan] = useState([]);
  const [besarKebutuhan, setBesarKebutuhan] = useState([]);
  const [data, setData] = useState([]);
  const [editableRowId, setEditableRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [visibleModal, setVisibleModal] = useState(false);
  const today = new Date();
  const [newData, setNewData] = useState({ 
    tanggal: format(today, 'dd'), 
    namaKebutuhan: '', 
    besarKebutuhan: '', 
    bulan: format(today, 'MM'), 
    tahun: format(today, 'yyyy') 
  });
  const { projectCode } = useGlobalStore();

  // Tambahkan state untuk pemasukanAll dan pengeluaranAll
  const [pemasukanAll, setPemasukanAll] = useState(0);
  const [pengeluaranAll, setPengeluaranAll] = useState(0);
  const [saldoAll,setSaldoAll]=useState(0);

  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    const updatedData = convertData();
    setData(updatedData);
    calculateIncomeAndExpenses(updatedData);
  }, [tanggal, namaKebutuhan, besarKebutuhan]);

  const convertData = () => {
    const data = tanggal.map((tgl, index) => {
      const parsedDate = parse(tgl, 'dd/MM/yyyy', new Date());
      return {
        id: index,
        originalId: index,
        tanggal: isValid(parsedDate) ? format(parsedDate, 'dd') : '',
        bulan: isValid(parsedDate) ? format(parsedDate, 'MM') : '',
        tahun: isValid(parsedDate) ? format(parsedDate, 'yyyy') : '',
        fullDate: parsedDate,
        namaKebutuhan: namaKebutuhan[index],
        besarKebutuhan: besarKebutuhan[index]
      };
    });

    return data.sort((a, b) => compareAsc(a.fullDate, b.fullDate));
  };

  const calculateIncomeAndExpenses = (data) => {
    let income = 0;
    let expenses = 0;
    data.forEach(row => {
      const amount = Number(row.besarKebutuhan);
      if (amount > 0) {
        income += amount;
      } else {
        expenses += amount;
      }
    });
    setPemasukanAll(income);
    setPengeluaranAll(expenses);
    setSaldoAll(income+expenses)
  };

  const handleEdit = (row) => {
    setEditableRowId(row.id);
    setEditedRow({ ...row });
  };

  const handleSave = (id) => {
    const parsedDate = parse(`${editedRow.tanggal}/${editedRow.bulan}/${editedRow.tahun}`, 'dd/MM/yyyy', new Date());
    if (!isValid(parsedDate)) {
      alert('Invalid date format');
      return;
    }

    const updatedData = data.map((row) =>
      row.id === id
        ? { ...editedRow, tanggal: format(parsedDate, 'dd'), fullDate: parsedDate }
        : row
    );

    const sortedData = updatedData.sort((a, b) => compareAsc(a.fullDate, b.fullDate));
    setData(sortedData);
    setEditableRowId(null);
    setEditedRow({});

    const updatedTanggal = [...tanggal];
    const updatedNamaKebutuhan = [...namaKebutuhan];
    const updatedBesarKebutuhan = [...besarKebutuhan];

    const originalId = data.find((row) => row.id === id).originalId;
    updatedTanggal[originalId] = format(parsedDate, 'dd/MM/yyyy');
    updatedNamaKebutuhan[originalId] = editedRow.namaKebutuhan;
    updatedBesarKebutuhan[originalId] = editedRow.besarKebutuhan;

    setTanggal(updatedTanggal);
    setNamaKebutuhan(updatedNamaKebutuhan);
    setBesarKebutuhan(updatedBesarKebutuhan);

    addData(updatedTanggal, updatedNamaKebutuhan, updatedBesarKebutuhan);
  };

  const handleChange = (name, value) => {
    setEditedRow({
      ...editedRow,
      [name]: value,
    });
  };

  const handleDelete = (id) => {
    const originalId = data.find((row) => row.id === id).originalId;

    const updatedTanggal = tanggal.filter((_, index) => index !== originalId);
    const updatedNamaKebutuhan = namaKebutuhan.filter((_, index) => index !== originalId);
    const updatedBesarKebutuhan = besarKebutuhan.filter((_, index) => index !== originalId);

    setTanggal(updatedTanggal);
    setNamaKebutuhan(updatedNamaKebutuhan);
    setBesarKebutuhan(updatedBesarKebutuhan);

    const updatedData = convertData();
    setData(updatedData);
    calculateIncomeAndExpenses(updatedData);

    addData(updatedTanggal, updatedNamaKebutuhan, updatedBesarKebutuhan);
  };

  const showModal = () => {
    setNewData({ 
      tanggal: format(today, 'dd'), 
      namaKebutuhan: '', 
      besarKebutuhan: '', 
      bulan: format(today, 'MM'), 
      tahun: format(today, 'yyyy') 
    });
    setVisibleModal(true);
  };

  const hideModal = () => setVisibleModal(false);

  const handleAddData = () => {
    const { tanggal: tgl, bulan, tahun, namaKebutuhan: nama, besarKebutuhan: besar } = newData;
    const parsedDate = parse(`${tgl}/${bulan}/${tahun}`, 'dd/MM/yyyy', new Date());
    if (!isValid(parsedDate)) {
      alert('Invalid date format');
      return;
    }

    const updatedTanggal = [...tanggal, format(parsedDate, 'dd/MM/yyyy')];
    const updatedNamaKebutuhan = [...namaKebutuhan, nama];
    const updatedBesarKebutuhan = [...besarKebutuhan, Number(besar)];

    setTanggal(updatedTanggal);
    setNamaKebutuhan(updatedNamaKebutuhan);
    setBesarKebutuhan(updatedBesarKebutuhan);

    setVisibleModal(false);

    const updatedData = convertData();
    setData(updatedData);
    calculateIncomeAndExpenses(updatedData);

    addData(updatedTanggal, updatedNamaKebutuhan, updatedBesarKebutuhan);
  };

  const addData = async (tanggal, namaKebutuhan, besarKebutuhan) => {
    try {
      const docRef = doc(db, 'projectNote', projectCode);
      await setDoc(docRef, { tanggal, namaKebutuhan, besarKebutuhan });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const readData = async () => {
    try {
      const docRef = doc(db, 'projectNote', projectCode);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTanggal(docSnap.data().tanggal);
        setNamaKebutuhan(docSnap.data().namaKebutuhan);
        setBesarKebutuhan(docSnap.data().besarKebutuhan);

        const updatedData = convertData();
        setData(updatedData);
        calculateIncomeAndExpenses(updatedData);
      } else {
        console.log('No such document!');
      }
    } catch (e) {
      console.error('Error reading document: ', e);
    }
  };

  return (
    <Provider>
      <SafeAreaView className="flex-1 p-4 bg-foreground">
        <Text className="text-lg font-bold mb-4 text-primary">Catatan Keuangan</Text>
        <View className='bg-white p-3 mb-2 rounded-xl border-primarydisable border-[1px]'>
          <Text className=" text-green-600">Pemasukan: {pemasukanAll}</Text>
          <Text className=" text-red-600">Pengeluaran: {pengeluaranAll}</Text>
          <Text className={`${saldoAll<0?'text-red-600':'text-green-600'} font-semibold text-xl`}>Saldo: {saldoAll}</Text>
        </View>
        {Object.keys(
          data.reduce((acc, row) => {
            const month = `${row.bulan}/${row.tahun}`;
            if (!acc[month]) {
              acc[month] = [];
            }
            acc[month].push(row);
            return acc;
          }, {})
        ).map((month) => (
          <View key={month} className="mb-6">
            <Text className="text-xl font-bold mb-2">{month}</Text>
            <DataTable className="w-full bg-white rounded-xl">
              <DataTable.Header className="bg-gray-100 rounded-t-xl">
                <DataTable.Title style={{ justifyContent: 'center' }}>Tanggal</DataTable.Title>
                <DataTable.Title style={{ justifyContent: 'center' }}>Kebutuhan</DataTable.Title>
                <DataTable.Title style={{ justifyContent: 'center' }}>Besar</DataTable.Title>
                <DataTable.Title style={{ justifyContent: 'center' }}>Aksi</DataTable.Title>
              </DataTable.Header>
              {data
                .filter((row) => `${row.bulan}/${row.tahun}` === month)
                .map((row) => (
                  <DataTable.Row key={row.id}>
                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                      {editableRowId === row.id ? (
                        <TextInput
                          value={editedRow.tanggal}
                          onChangeText={(text) => handleChange('tanggal', text)}
                          style={{ width: 40, textAlign: 'center' }}
                        />
                      ) : (
                        row.tanggal
                      )}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                      {editableRowId === row.id ? (
                        <TextInput
                          value={editedRow.namaKebutuhan}
                          onChangeText={(text) => handleChange('namaKebutuhan', text)}
                          style={{ width: 100, textAlign: 'center' }}
                        />
                      ) : (
                        row.namaKebutuhan
                      )}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                      {editableRowId === row.id ? (
                        <TextInput
                          value={editedRow.besarKebutuhan.toString()}
                          onChangeText={(text) => handleChange('besarKebutuhan', text)}
                          style={{ width: 60, textAlign: 'center' }}
                          keyboardType="numeric"
                        />
                      ) : (
                        row.besarKebutuhan
                      )}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: 'center', flexDirection: 'row' }}>
                      {editableRowId === row.id ? (
                        <IconButton size={20} icon="content-save" onPress={() => handleSave(row.id)} />
                      ) : (
                        <IconButton size={20} icon="pencil" onPress={() => handleEdit(row)} />
                      )}
                      <IconButton size={20} icon="delete" onPress={() => handleDelete(row.id)} />
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
          </View>
        ))}
        <Button onPress={showModal} title="Tambah Data" className="bg-primary rounded-lg w-full py-2 my-4" />
        <Portal>
          <Modal visible={visibleModal} onDismiss={hideModal}>
            <View className="bg-white p-4 rounded-lg">
              <Text className="text-lg font-bold mb-4 text-primary">Tambah Data</Text>
              <View className='flex-row align-middle justify-between items-center'>
                <Text className=" mb-4 text-primary">Tanggal :</Text>
                <TextInput
                  label="Tanggal"
                  value={newData.tanggal}
                  keyboardType="numeric"
                  onChangeText={(text) => setNewData({ ...newData, tanggal: text })}
                  className="border-[1px] -ml-9 rounded-md border-primary px-2 mb-4"
                />
                <Text className=" mb-4 text-primary">Bulan :</Text>
                <TextInput
                  label="Bulan"
                  value={newData.bulan}
                  onChangeText={(text) => setNewData({ ...newData, bulan: text })}
                  className="border-[1px] -ml-9 rounded-md border-primary px-2 mb-4"
                />
                <Text className=" mb-4 text-primary">Tahun :</Text>
                <TextInput
                  label="Tahun"
                  value={newData.tahun}
                  keyboardType="numeric"
                  onChangeText={(text) => setNewData({ ...newData, tahun: text })}
                  className="border-[1px] -ml-9 rounded-md border-primary px-2 mb-4"
                />
              </View>
              <Text className=" mb-4 text-primary">Nama :</Text>
              <TextInput
                label="Nama Kebutuhan"
                value={newData.namaKebutuhan}
                onChangeText={(text) => setNewData({ ...newData, namaKebutuhan: text })}
                className="border-[1px] rounded-md border-primary px-2 mb-4"
              />
              <Text className=" mb-4 text-primary">Besar :</Text>
              <TextInput
                label="Besar Kebutuhan"
                value={newData.besarKebutuhan.toString()}
                onChangeText={(text) => setNewData({ ...newData, besarKebutuhan: text })}
                keyboardType="numeric"
                className="border-[1px] rounded-md border-primary px-2 mb-4"
              />
              <Button onPress={handleAddData} title="Tambah" className="bg-primary rounded-lg w-full py-2" />
            </View>
          </Modal>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
}
