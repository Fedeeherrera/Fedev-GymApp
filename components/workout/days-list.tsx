"use client"

import { useWorkoutStore, type Exercise } from "@/store/workout-store"
import { DayCard } from "./day-card"
import { getDayName } from "@/utils/helpers"

export function DaysList() {
  const { routine, selectedFilter } = useWorkoutStore()

  const getFilteredExercises = (exercises: Exercise[]) => {
    if (selectedFilter === "todos") return exercises
    return exercises.filter((ex) => ex.grupo === selectedFilter || ex.tipo === selectedFilter)
  }

  return (
    <div className="space-y-6">
      {Object.entries(routine).map(([day, exercises]) => {
        const filteredExercises =
          Array.isArray(exercises) && typeof exercises[0] === "object"
            ? getFilteredExercises(exercises as Exercise[])
            : exercises

        return (
          <DayCard
            key={day}
            day={day}
            dayName={getDayName(day)}
            exercises={exercises}
            filteredExercises={filteredExercises}
          />
        )
      })}
    </div>
  )
}
