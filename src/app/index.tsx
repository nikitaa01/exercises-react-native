import ExerciseToFillLink from "@/components/ExerciseToFillLink";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import { useWorkoutStore } from "@/stores/workoutStore";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Index() {
  const { routine, exercises, workout } = useWorkoutStore((state) => ({
    routine: state.routine,
    exercises: state.exercises,
    workout: state.workout,
  }));

  const completeWorkout = useWorkoutStore(
    (state) => state.actions.completeWorkout,
  );

  if (!routine || !exercises || !workout) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <PageHeader title={routine.name} description={routine.description} />
      <FlatList
        data={exercises}
        keyExtractor={(item) =>
          item?.id?.toString() ?? Math.random().toString()
        }
        renderItem={({ item }) => (
          <ExerciseToFillLink
            exercise={item}
            workoutId={workout.id}
            key={item.id}
          />
        )}
      />
      <PrimaryButton onPress={() => completeWorkout()}>
        <Text className="text-white text-center font-bold text-lg">
          Completar
        </Text>
      </PrimaryButton>
    </View>
  );
}
