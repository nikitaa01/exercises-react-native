import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import { Exercise, Routine, Set, Workout } from "@/lib/db/scheme";
import { importData } from "@/lib/services";
import { useWorkoutStore } from "@/stores/workoutStore";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Import() {
  const [inputValue, setInputValue] = useState("");
  const refetch = useWorkoutStore((state) => state.actions.refetch);

  const handleImport = () => {
    try {
      JSON.parse(inputValue);
      const dataUnknown = JSON.parse(inputValue);

      const data: {
        exercises: Exercise[];
        routines: Routine[];
        sets: Set[];
        workouts: Workout[];
      } = {
        exercises: [],
        routines: [],
        sets: [],
        workouts: [],
      };

      for (const exerciseData of dataUnknown?.exercises ?? []) {
        const exercise: Partial<Exercise> = {};
        if (
          "id" in exerciseData &&
          "name" in exerciseData &&
          "description" in exerciseData &&
          "muscleGroup" in exerciseData &&
          "routineId" in exerciseData
        ) {
          exercise.id = exerciseData.id;
          exercise.name = exerciseData.name;
          exercise.description = exerciseData.description;
          exercise.muscleGroup = exerciseData.muscleGroup;
          exercise.routineId = exerciseData.routineId;
        } else {
          continue;
        }
        if ("imgUrl" in exerciseData) {
          exercise.imgUrl = exerciseData.imgUrl;
        }
        data.exercises.push(exercise as Exercise);
      }
      for (const routineData of dataUnknown?.routines ?? []) {
        const routine: Partial<Routine> = {};
        if (
          "id" in routineData &&
          "name" in routineData &&
          "description" in routineData
        ) {
          routine.id = routineData.id;
          routine.name = routineData.name;
          routine.description = routineData.description;
        } else {
          continue;
        }
        data.routines.push(routine as Routine);
      }
      for (const setData of dataUnknown?.sets ?? []) {
        const set: Partial<Set> = {};
        if (
          "id" in setData &&
          "exerciseId" in setData &&
          "workoutId" in setData &&
          "weight" in setData &&
          "reps" in setData &&
          "createdAt" in setData
        ) {
          set.id = setData.id;
          set.exerciseId = setData.exerciseId;
          set.workoutId = setData.workoutId;
          set.weight = setData.weight;
          set.reps = setData.reps;
          set.createdAt = setData.createdAt;
        } else {
          continue;
        }
        data.sets.push(set as Set);
      }
      for (const workoutData of dataUnknown?.workouts ?? []) {
        const workout: Partial<Workout> = {};
        if (
          "id" in workoutData &&
          "routineId" in workoutData &&
          "completedAt" in workoutData
        ) {
          workout.id = workoutData.id;
          workout.routineId = workoutData.routineId;
          workout.completedAt = workoutData.completedAt;
        } else {
          continue;
        }
        data.workouts.push(workout as Workout);
      }

      importData(data);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader
        title="Importar"
        description="Importe los datos en formato JSON"
      />
      <TextInput
        placeholderTextColor={"#fff"}
        multiline
        placeholder="Pegue aqui el JSON"
        className="flex-1 text-white align-top h-full items-start justify-start mb-auto"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <PrimaryButton onPress={handleImport}>
        <View className="flex-row gap-2 justify-center items-center">
          <Icon name="download" size={25} color="white" />
          <Text className="text-white text-center font-bold text-lg">
            Importar la configuración
          </Text>
        </View>
      </PrimaryButton>
    </>
  );
}
