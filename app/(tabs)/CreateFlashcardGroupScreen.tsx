import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useFlashcards } from './FlashcardContext';

export default function CreateFlashcardGroupScreen() {
  const [groupName, setGroupName] = useState('');
  const router = useRouter();
  const { addGroup } = useFlashcards(); 

  const saveGroup = () => {
    if (!groupName) {
      Alert.alert('Erro', 'Preencha o nome do grupo.');
      return;
    }

    const newGroup = { id: Date.now().toString(), name: groupName, flashcards: [] };
    addGroup(newGroup);
    router.back();

    setGroupName('');
  };

  return (
    <View className='flex-1 bg-white p-4 justify-center'>
      <Text className='text-xl font-bold mb-4'>Criar Grupo de Flashcards</Text>

      <TextInput
        placeholder="Nome do Grupo"
        value={groupName}
        onChangeText={setGroupName}
        className='border border-gray-300 rounded-xl p-3 mb-4'
      />

      <TouchableOpacity
        onPress={saveGroup}
        className='bg-blue-500 p-4 rounded-xl items-center'
      >
        <Text className='text-white text-lg font-bold'>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
