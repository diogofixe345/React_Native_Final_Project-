import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFlashcards } from '../../FlashcardContext'; // ajuste conforme estrutura

export default function GroupFlashcardsScreen() {
  const { groupId } = useLocalSearchParams();
  const router = useRouter();
  const { groups, deleteFlashcard } = useFlashcards();



  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    return <Text>Grupo não encontrado.</Text>;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">{group.name}</Text>

      {group.flashcards.length === 0 ? (
        <Text className="text-gray-500">Nenhum flashcard neste grupo.</Text>
      ) : (
        <ScrollView>
          {group.flashcards.map((card) => (
  <View key={card.id} className="border border-gray-300 rounded-xl p-4 mb-2 bg-gray-50">
    <Text className="text-lg font-semibold mb-1">{card.question}</Text>
    <Text className="text-gray-700 mb-2">{card.answer}</Text>

    <View className="flex-row gap-2">
      <TouchableOpacity
        onPress={() => router.push(`/groupFlashcards/${group.id}/${card.id}`)}
        className="bg-yellow-500 px-3 py-2 rounded-xl items-center flex-1"
      >
        <Text className="text-white font-bold text-center">Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => deleteFlashcard(group.id, card.id)}
        className="bg-red-600 px-3 py-2 rounded-xl items-center flex-1"
      >
        <Text className="text-white font-bold text-center">Eliminar</Text>
      </TouchableOpacity>
    </View>
  </View>
))}

        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => router.push(`../createFlashcard/${group.id}`)}
        className="bg-blue-500 p-4 rounded-xl mt-4 items-center"
      >
        <Text className="text-white font-bold">Adicionar Flashcard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push(`/studyFlashcards/${groupId}`)}
        className="bg-green-500 p-4 rounded-xl mt-2 items-center"
      >
        <Text className="text-white text-lg font-bold">Exibir Flashcards</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-gray-400 p-4 rounded-xl mt-2 items-center mb-4"
      >
        <Text className="text-white font-bold">Voltar</Text>
      </TouchableOpacity>

    </View>
  );
}
