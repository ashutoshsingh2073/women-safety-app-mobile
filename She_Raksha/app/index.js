import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      { <Button
        title="Welcome to She Raksha"
        onPress={() => navigation.navigate('Onboarding')}
        color="#ec407a"
      /> }

    </View>
  );
}4