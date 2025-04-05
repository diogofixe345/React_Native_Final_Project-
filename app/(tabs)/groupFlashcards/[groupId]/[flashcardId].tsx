import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFlashcards } from '../../FlashcardContext';

export default function EditFlashcardScreen() {
    const params = useLocalSearchParams();
    const groupId = typeof params.groupId === 'string' ? params.groupId : '';
    const flashcardId = typeof params.flashcardId === 'string' ? params.flashcardId : '';    
  const router = useRouter();
  const { groups, updateFlashcard } = useFlashcards();

  const group = groups.find((g) => g.id === groupId);
  const flashcard = group?.flashcards.find((c) => c.id === flashcardId);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (flashcard) {
      setQuestion(flashcard.question);
      setAnswer(flashcard.answer);
    }
  }, [flashcard]);

  const handleSave = () => {
    if (!question || !answer) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    updateFlashcard(groupId, flashcardId, { question, answer });
    router.push(`/groupFlashcards/${groupId}`);
  };

  if (!group || !flashcard) {
    return <Text className="p-4">Flashcard não encontrado.</Text>;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Editar Flashcard</Text>

      <Text className="text-base font-semibold mb-1">Pergunta:</Text>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        className="border border-gray-300 rounded-xl p-3 mb-4"
        placeholder="Digite a pergunta"
      />

      <Text className="text-base font-semibold mb-1">Resposta:</Text>
      <TextInput
        value={answer}
        onChangeText={setAnswer}
        className="border border-gray-300 rounded-xl p-3 mb-4"
        placeholder="Digite a resposta"
      />

      <TouchableOpacity
        onPress={handleSave}
        className="bg-blue-600 p-4 rounded-xl items-center"
      >
        <Text className="text-white font-bold">Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-gray-400 p-4 rounded-xl items-center mt-2"
      >
        <Text className="text-white font-bold">Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
