import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFlashcards } from './FlashcardContext';
import { useRouter } from 'expo-router';

export default function FlashcardListScreen() {
  const { groups, deleteGroup } = useFlashcards();
  const router = useRouter();

  const handleGroupPress = (groupId: string, flashcardsLength: number) => {
    if (flashcardsLength === 0) {
      router.push(`./createFlashcard/${groupId}`);
    } else {
      router.push(`./groupFlashcards/${groupId}`);
    }
  };

  const handleDeleteGroup = (groupId: string, flashcardsLength: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza de que deseja excluir o grupo de flashcards? ${flashcardsLength > 0 ? 'Todos os flashcards também serão apagados.' : ''}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteGroup(groupId);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      {groups.length === 0 ? (
        <Text className="text-gray-500">Nenhum grupo criado ainda.</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {groups.map((group) => (
            <View key={group.id} className="mb-4 p-4 border border-gray-300 rounded-xl bg-gray-50">
              <Text className="text-xl font-bold">{group.name}</Text>
              <Text className="text-gray-600 mt-1">
                {group.flashcards.length} flashcard{group.flashcards.length !== 1 ? 's' : ''}
              </Text>

              <TouchableOpacity
                onPress={() => handleGroupPress(group.id, group.flashcards.length)}
                className="bg-blue-500 px-3 py-2 rounded-xl mt-2"
              >
                <Text className="text-white font-bold text-center">Ver Flashcards</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDeleteGroup(group.id, group.flashcards.length)}
                className="bg-red-600 px-3 py-2 rounded-xl mt-2"
              >
                <Text className="text-white font-bold text-center">Excluir Grupo</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
