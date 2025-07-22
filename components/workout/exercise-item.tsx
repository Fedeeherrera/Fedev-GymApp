"use client"

import { Edit3, Trash2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWorkoutStore, type Exercise } from "@/store/workout-store"
import { MUSCLE_GROUP_COLORS } from "@/utils/constants"
import { useState } from "react"
import { ExerciseEditDialog } from "./exercise-edit-dialog"
import { ProgressDialog } from "./progress-dialog"

interface ExerciseItemProps {
  day: string
  index: number
  exercise: Exercise
}

export function ExerciseItem({ day, index, exercise }: ExerciseItemProps) {
  const { toggleExerciseCompletion, deleteExercise } = useWorkoutStore()
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showProgressDialog, setShowProgressDialog] = useState(false)

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-lg p-3 transition-colors bg-accent/50 hover:bg-accent gap-3 ${
          exercise.completed ? "opacity-75" : ""
        }`}
      >
        <div className="flex items-start gap-3 flex-1 w-full">
          <div
            onClick={() => toggleExerciseCompletion(day, index)}
            className={`w-5 h-5 mt-1 border-2 rounded-sm cursor-pointer transition-colors flex items-center justify-center ${
              exercise.completed
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border hover:border-primary bg-background"
            }`}
          >
            {exercise.completed && (
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p
                className={`font-semibold capitalize text-foreground break-words ${exercise.completed ? "line-through" : ""}`}
              >
                {exercise.ejercicio}
              </p>
              {exercise.grupo && (
                <Badge
                  className={`${MUSCLE_GROUP_COLORS[exercise.grupo]} text-white text-xs self-start sm:self-center`}
                >
                  {exercise.grupo}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{exercise.series}</p>
            {exercise.history && exercise.history.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Último: {exercise.history[exercise.history.length - 1].weight}kg -{" "}
                {exercise.history[exercise.history.length - 1].reps}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button
            onClick={() => setShowProgressDialog(true)}
            variant="outline"
            size="sm"
            className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
          >
            <TrendingUp className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setShowEditDialog(true)}
            variant="outline"
            size="sm"
            className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => deleteExercise(day, index)}
            variant="outline"
            size="sm"
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ExerciseEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        day={day}
        index={index}
        exercise={exercise}
      />

      <ProgressDialog
        open={showProgressDialog}
        onOpenChange={setShowProgressDialog}
        day={day}
        index={index}
        exercise={exercise}
      />
    </>
  )
}
