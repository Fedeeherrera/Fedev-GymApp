export const MUSCLE_GROUPS = [
  "Pecho",
  "Espalda",
  "Bíceps",
  "Tríceps",
  "Hombro",
  "Cuádriceps",
  "Isquios",
  "Glúteo",
  "Gemelos",
  "Abdomen",
] as const

export const EXERCISE_TYPES = ["fuerza", "movilidad", "cardio"] as const

export const MUSCLE_GROUP_COLORS: Record<string, string> = {
  Pecho: "bg-red-500",
  Espalda: "bg-blue-500",
  Bíceps: "bg-purple-500",
  Tríceps: "bg-pink-500",
  Hombro: "bg-yellow-500",
  Cuádriceps: "bg-green-500",
  Isquios: "bg-orange-500",
  Glúteo: "bg-indigo-500",
  Gemelos: "bg-teal-500",
  Abdomen: "bg-cyan-500",
}

export const REST_TIMES = [30, 60, 90, 120] as const
