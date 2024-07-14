import React from 'react';
import { View, Text , Image} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import imagesImg from './../../../assets/img'

export default function Dashboard() {
  return (
    <View className='flex-1 justify-center items-center bg-foreground p-4'>
      <Text className='text-3xl font-bold mb-4 text-primary'>
        Dashboard
      </Text>
      <View className='w-full space-y-4'>
        <Card className='bg-primary w-full'>
          <Card.Content>
            <Image source={imagesImg.HITUNG_LABA_IMG} className='h-32 w-full rounded-t-xl'/>
            <Title className='text-lg text-white font-bold'>Hitung Laba</Title>
            <Paragraph className='text-sm text-white'>
              Description or content for the Hitung Laba card.
            </Paragraph>
            {/* Placeholder for your image */}
          </Card.Content>
        </Card>
        <Card className='bg-primary w-full'>
          <Card.Content>
            <Image source={imagesImg.CATATAN_KEUANGAN_IMG} className='h-32 w-full rounded-t-xl'/>
            <Title className='text-lg text-white font-bold'>Catatan Keuangan</Title>
            <Paragraph className='text-sm text-white'>
              Description or content for the Catatan Keuangan card.
            </Paragraph>
            {/* Placeholder for your image */}
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
