import { db } from "../db/client";
import { exercise, routine, workout } from "../db/scheme";

const seed = () => {
  // Insert data into the routine table

  db.insert(routine)
    .values([
      {
        id: 1,
        name: "Rutina 1",
        description: "pecho, hombros y triceps",
      },
      {
        id: 2,
        name: "Rutina 2",
        description: "Tren inferior",
      },
      {
        id: 3,
        name: "Rutina 3",
        description: "Drosal y biceps",
      },
    ])
    .execute();

  // Insert data into the exercise table
  db.insert(exercise)
    .values([
      {
        id: 1,
        name: "Sentadilla",
        description: "",
        muscleGroup: "gluteos",
        routineId: 2,
      },
      {
        id: 2,
        name: "Press militar",
        description: "",
        muscleGroup: "hombros",
        routineId: 1,
      },
      {
        id: 3,
        name: "Triceps con barra",
        description: "",
        muscleGroup: "triceps",
        routineId: 1,
      },
      {
        id: 4,
        name: "Abducción de caderas",
        description: "",
        muscleGroup: "gluteos",
        routineId: 2,
      },
      {
        id: 5,
        name: "Curl",
        description: "",
        muscleGroup: "biceps",
        routineId: 3,
      },
      {
        id: 6,
        name: "Remo sentado",
        description: "",
        muscleGroup: "dorsal",
        routineId: 3,
      },
      {
        id: 7,
        name: "Remo con barra",
        description: "",
        muscleGroup: "dorsal",
        routineId: 3,
      },
      {
        id: 8,
        name: "Elevaciones laterales",
        description: "",
        muscleGroup: "hombro",
        routineId: 1,
      },
      {
        id: 9,
        name: "Elevación de tobillo",
        description: "",
        muscleGroup: "gemelos",
        routineId: 2,
      },
      {
        id: 10,
        name: "Hip thrust",
        description: "",
        muscleGroup: "gluteos",
        routineId: 2,
      },
      {
        id: 11,
        name: "Martillo",
        description: "",
        muscleGroup: "biceps",
        routineId: 3,
      },
      {
        id: 12,
        name: "Aductores en maquina",
        description: "",
        muscleGroup: "aductores",
        routineId: 2,
      },
      {
        id: 13,
        name: "Isquios en máquina",
        description: "",
        muscleGroup: "isquios",
        routineId: 2,
      },
      {
        id: 14,
        name: "Pek-dek",
        description: "",
        muscleGroup: "pecho",
        routineId: 1,
      },
      {
        id: 15,
        name: "Press de pecho en máquina",
        description: "",
        muscleGroup: "pecho",
        routineId: 1,
      },
      {
        id: 16,
        name: "Triceps con cuerda",
        description: "",
        muscleGroup: "triceps",
        routineId: 1,
      },
    ])
    .execute();

  // Insert first workout

  db.insert(workout)
    .values({
      id: 1,
      routineId: 1,
    })
    .execute();
};

export default seed;
