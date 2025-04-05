import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useFlashcards } from '../FlashcardContext';

export default function CreateFlashcardScreen() {
  const { groupId } = useLocalSearchParams();
  const router = useRouter();
  const { addFlashcardToGroup } = useFlashcards();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const saveFlashcard = () => {
    if (!question || !answer) {
      Alert.alert('Erro', 'Preencha a pergunta e a resposta.');
      return;
    }

    const newFlashcard = { id: Date.now().toString(), question, answer };
    addFlashcardToGroup(groupId as string, newFlashcard);

    setQuestion('');
    setAnswer('');

    router.push(`/groupFlashcards/${groupId}`);
  };

  return (
    <View className="flex-1 bg-white p-4 justify-center">
      <Text className="text-xl font-bold mb-4">Criar Flashcard</Text>

      <TextInput
        placeholder="Pergunta"
        value={question}
        onChangeText={setQuestion}
        className="border border-gray-300 rounded-xl p-3 mb-4"
      />

      <TextInput
        placeholder="Resposta"
        value={answer}
        onChangeText={setAnswer}
        className="border border-gray-300 rounded-xl p-3 mb-4"
      />

      <TouchableOpacity
        onPress={saveFlashcard}
        className="bg-blue-500 p-4 rounded-xl items-center"
      >
        <Text className="text-white text-lg font-bold">Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
