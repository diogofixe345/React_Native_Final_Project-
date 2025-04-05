import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFlashcards } from '../FlashcardContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

export default function StudyFlashcardsScreen() {
  const { groupId } = useLocalSearchParams();
  const { groups } = useFlashcards();
  const router = useRouter();

  const group = groups.find((g) => g.id === groupId);
  const flashcards = group?.flashcards || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const flip = useSharedValue(0); // valor da rotação
const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setShowAnswer(false);
    }, [groupId]);


    useEffect(() => {
      if (flashcards.length === 0) {
        setCurrentIndex(0);
      } else if (currentIndex >= flashcards.length) {
        setCurrentIndex(flashcards.length - 1);
      }
    }, [flashcards.length]);
    

  if (!group || flashcards.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Sem flashcards para estudar.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-red-500 mt-6 p-4 rounded-xl w-3/4 items-center"
        >
          <Text className="text-white font-bold text-lg">Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentCard = flashcards[currentIndex] ?? null;

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flip.value,
      [0, 180],
      [0, 180],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { rotateY: `${rotateY}deg` },
        { perspective: 1000 },
      ],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flip.value,
      [0, 180],
      [180, 360],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { rotateY: `${rotateY}deg` },
        { perspective: 1000 },
      ],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    };
  });

  const handleFlip = () => {
    flip.value = withTiming(flip.value === 0 ? 180 : 0, { duration: 400 });
  };

  const handleNext = () => {
    flip.value = 0;
    setCurrentIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    flip.value = 0;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
  };

  return (
    <View className="flex-1 bg-white p-4 items-center justify-center">
      <Text className="text-xl font-bold mb-4">{group.name}</Text>

      <View className="w-full h-40 mb-4 relative">
        {currentCard && (
          <>
            <Animated.View className="border border-gray-300 rounded-xl bg-gray-100 p-6" style={frontStyle}>
              <Text className="text-lg text-center">{currentCard.question}</Text>
            </Animated.View>

            <Animated.View className="border border-gray-300 rounded-xl bg-gray-100 p-6" style={backStyle}>
              <Text className="text-lg text-center">{currentCard.answer}</Text>
            </Animated.View>
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={handleFlip}
        className="bg-blue-500 mt-2 p-4 rounded-xl w-full items-center"
      >
        <Text className="text-white font-bold text-lg">Virar</Text>
      </TouchableOpacity>

      <View className="flex-row justify-between w-full mt-4 space-x-2">
        <TouchableOpacity
          onPress={handlePrev}
          className="bg-gray-400 p-4 mr-3 rounded-xl flex-1 items-center"
        >
          <Text className="text-white font-bold">Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          className="bg-green-500 p-4 rounded-xl flex-1 items-center"
        >
          <Text className="text-white font-bold">Próximo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.push(`/groupFlashcards/${groupId}`)}
        className="bg-red-500 mt-6 p-4 rounded-xl w-full items-center"
      >
        <Text className="text-white font-bold text-lg">Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
