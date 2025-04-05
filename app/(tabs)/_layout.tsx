import { Tabs } from 'expo-router';
import { FlashcardProvider } from './FlashcardContext';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <FlashcardProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'black',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Os meus Grupos de Flashcards',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="albums-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="CreateFlashcardGroupScreen"
          options={{
            title: 'Criar Grupo',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="groupFlashcards/[groupId]/index"
          options={{
            title: 'Grupo de Flashcards',
          href: null
          }}
        />

        <Tabs.Screen name="createFlashcard/[groupId]" options={{ href: null, title: "Criar" }} />
        <Tabs.Screen name='studyFlashcards/[groupId]' options={{href: null, title: "Modo de exibição"}} />
        <Tabs.Screen name="groupFlashcards/[groupId]/[flashcardId]" options={{ href: null, title: "Editar" }} />

      </Tabs>
    </FlashcardProvider>
  );
}
