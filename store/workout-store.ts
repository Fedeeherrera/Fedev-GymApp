import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Exercise {
  ejercicio: string
  series: string
  grupo?: string
  tipo?: string
  completed?: boolean
  history?: ExerciseHistory[]
}

export interface ExerciseHistory {
  date: string
  weight?: number
  reps?: string
  notes?: string
}

export interface Routine {
  [key: string]: Exercise[] | string[]
}

export interface DayCompletion {
  [key: string]: {
    date: string
    completed: boolean
    completedExercises: number
    totalExercises: number
  }
}

interface WorkoutState {
  routine: Routine
  dayCompletion: DayCompletion
  restTimer: number
  isTimerRunning: boolean
  selectedFilter: string

  // Actions
  setRoutine: (routine: Routine) => void
  setDayCompletion: (completion: DayCompletion) => void
  addExercise: (day: string, exercise: Exercise) => void
  updateExercise: (day: string, index: number, exercise: Exercise) => void
  deleteExercise: (day: string, index: number) => void
  toggleExerciseCompletion: (day: string, index: number) => void
  addProgressEntry: (day: string, index: number, entry: ExerciseHistory) => void
  addDay: (dayName: string) => void
  deleteDay: (day: string) => void
  markDayComplete: (day: string) => void
  setRestTimer: (time: number) => void
  setIsTimerRunning: (running: boolean) => void
  setSelectedFilter: (filter: string) => void
}

const initialRoutine: Routine = {
  lunes: [
    { ejercicio: "banco plano", series: "3x6", grupo: "Pecho", tipo: "fuerza" },
    { ejercicio: "press plano con mancuerna", series: "4x8", grupo: "Pecho", tipo: "fuerza" },
    { ejercicio: "cruces en polea", series: "4x8-10", grupo: "Pecho", tipo: "fuerza" },
    { ejercicio: "jalón al pecho", series: "4x8", grupo: "Espalda", tipo: "fuerza" },
    { ejercicio: "serrucho con mancuerna", series: "4x8", grupo: "Espalda", tipo: "fuerza" },
    { ejercicio: "pull over / VueLatPol", series: "3x10", grupo: "Espalda", tipo: "fuerza" },
    { ejercicio: "bíceps con barra", series: "3x8-10", grupo: "Bíceps", tipo: "fuerza" },
    { ejercicio: "tríceps en polea", series: "3x8-10", grupo: "Tríceps", tipo: "fuerza" },
  ],
  martes: [
    { ejercicio: "sentadilla", series: "3x10", grupo: "Cuádriceps", tipo: "fuerza" },
    { ejercicio: "posteriores en polea", series: "3x12", grupo: "Hombro", tipo: "fuerza" },
    { ejercicio: "peso muerto rumano manc", series: "4x8", grupo: "Isquios", tipo: "fuerza" },
    { ejercicio: "sentadilla copa", series: "4x4", grupo: "Cuádriceps", tipo: "fuerza" },
    { ejercicio: "búlgaras", series: "3x8", grupo: "Cuádriceps", tipo: "fuerza" },
    { ejercicio: "sillón de cuádriceps", series: "3x12", grupo: "Cuádriceps", tipo: "fuerza" },
    { ejercicio: "oblícuos con mancuerna", series: "3x10-12", grupo: "Abdomen", tipo: "fuerza" },
    { ejercicio: "bicho muerto con lastre", series: "3x10-12", grupo: "Abdomen", tipo: "fuerza" },
  ],
  miércoles: ["MOVILIDAD"],
  jueves: [
    { ejercicio: "remo con barra prono", series: "3x6-8", grupo: "Espalda", tipo: "fuerza" },
    { ejercicio: "remo bajo en polea", series: "4x8-10", grupo: "Espalda", tipo: "fuerza" },
    { ejercicio: "press plano con mancuerna", series: "4x8", grupo: "Pecho", tipo: "fuerza" },
    { ejercicio: "Vuelos Laterales", series: "4x10", grupo: "Hombro", tipo: "fuerza" },
    { ejercicio: "aperturas en polea", series: "4x8-10", grupo: "Pecho", tipo: "fuerza" },
    { ejercicio: "press de hombro con barra", series: "3x10", grupo: "Hombro", tipo: "fuerza" },
    { ejercicio: "bíceps martillo", series: "3x10", grupo: "Bíceps", tipo: "fuerza" },
    { ejercicio: "tríceps en soga", series: "3x10", grupo: "Tríceps", tipo: "fuerza" },
  ],
  viernes: [
    { ejercicio: "sentadilla", series: "3x6-8", grupo: "Cuádriceps", tipo: "fuerza" },
    { ejercicio: "peso muerto rum con barra", series: "3x8", grupo: "Isquios", tipo: "fuerza" },
    { ejercicio: "subidas al cajón con lastre", series: "3x8", grupo: "Cuádriceps", tipo: "fuerza" },
    { ejercicio: "sillón de femorales", series: "3x10", grupo: "Isquios", tipo: "fuerza" },
    { ejercicio: "gemelos con lastre", series: "3x10", grupo: "Gemelos", tipo: "fuerza" },
    { ejercicio: "abdominales con lastre", series: "3x12", grupo: "Abdomen", tipo: "fuerza" },
    { ejercicio: "toques de tobillos", series: "3x12", grupo: "Abdomen", tipo: "fuerza" },
    { ejercicio: "plancha con toque de hombros", series: "3x10 por hombro", grupo: "Abdomen", tipo: "fuerza" },
  ],
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      routine: initialRoutine,
      dayCompletion: {},
      restTimer: 0,
      isTimerRunning: false,
      selectedFilter: "todos",

      setRoutine: (routine) => set({ routine }),
      setDayCompletion: (dayCompletion) => set({ dayCompletion }),

      addExercise: (day, exercise) =>
        set((state) => ({
          routine: {
            ...state.routine,
            [day]:
              Array.isArray(state.routine[day]) && typeof state.routine[day][0] === "object"
                ? [...(state.routine[day] as Exercise[]), exercise]
                : [exercise],
          },
        })),

      updateExercise: (day, index, exercise) =>
        set((state) => ({
          routine: {
            ...state.routine,
            [day]: (state.routine[day] as Exercise[]).map((ex, i) => (i === index ? exercise : ex)),
          },
        })),

      deleteExercise: (day, index) =>
        set((state) => ({
          routine: {
            ...state.routine,
            [day]: (state.routine[day] as Exercise[]).filter((_, i) => i !== index),
          },
        })),

      toggleExerciseCompletion: (day, index) =>
        set((state) => ({
          routine: {
            ...state.routine,
            [day]: (state.routine[day] as Exercise[]).map((ex, i) =>
              i === index ? { ...ex, completed: !ex.completed } : ex,
            ),
          },
        })),

      addProgressEntry: (day, index, entry) =>
        set((state) => ({
          routine: {
            ...state.routine,
            [day]: (state.routine[day] as Exercise[]).map((ex, i) =>
              i === index ? { ...ex, history: [...(ex.history || []), entry] } : ex,
            ),
          },
        })),

      addDay: (dayName) =>
        set((state) => {
          if (dayName && !state.routine[dayName.toLowerCase()]) {
            return {
              routine: {
                ...state.routine,
                [dayName.toLowerCase()]: [],
              },
            }
          }
          return state
        }),

      deleteDay: (day) =>
        set((state) => {
          const newRoutine = { ...state.routine }
          delete newRoutine[day]
          return { routine: newRoutine }
        }),

      markDayComplete: (day) =>
        set((state) => {
          const exercises = state.routine[day] as Exercise[]
          const completedCount = exercises.filter((ex) => ex.completed).length
          const today = new Date().toISOString().split("T")[0]

          return {
            dayCompletion: {
              ...state.dayCompletion,
              [day]: {
                date: today,
                completed: completedCount === exercises.length,
                completedExercises: completedCount,
                totalExercises: exercises.length,
              },
            },
          }
        }),

      setRestTimer: (restTimer) => set({ restTimer }),
      setIsTimerRunning: (isTimerRunning) => set({ isTimerRunning }),
      setSelectedFilter: (selectedFilter) => set({ selectedFilter }),
    }),
    {
      name: "workout-storage",
    },
  ),
)
