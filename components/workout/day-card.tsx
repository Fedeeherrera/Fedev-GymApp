"use client"

import { Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useWorkoutStore, type Exercise } from "@/store/workout-store"
import { ExerciseItem } from "./exercise-item"
import { AddExerciseButton } from "./add-exercise-button"

interface DayCardProps {
  day: string
  dayName: string
  exercises: Exercise[] | string[]
  filteredExercises: Exercise[] | string[]
}

export function DayCard({ day, dayName, exercises, filteredExercises }: DayCardProps) {
  const { dayCompletion, markDayComplete, deleteDay } = useWorkoutStore()
  const dayStats = dayCompletion[day]

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-bold text-card-foreground">{dayName}</CardTitle>
            {dayStats && (
              <Badge variant={dayStats.completed ? "default" : "secondary"} className="ml-2">
                {dayStats.completed ? "Completado" : `${dayStats.completedExercises}/${dayStats.totalExercises}`}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {Array.isArray(exercises) && typeof exercises[0] === "object" && (
              <Button onClick={() => markDayComplete(day)} size="sm" className="bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4" />
              </Button>
            )}
            <Button
              onClick={() => deleteDay(day)}
              variant="outline"
              size="sm"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {dayStats && (
          <Progress value={(dayStats.completedExercises / dayStats.totalExercises) * 100} className="mt-2" />
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {typeof exercises[0] === "string" ? (
          <div className="text-center py-8">
            <p className="text-2xl font-semibold text-primary">{exercises[0]}</p>
          </div>
        ) : (
          <>
            {(filteredExercises as Exercise[]).map((exercise, index) => {
              const originalIndex = (exercises as Exercise[]).findIndex((ex) => ex === exercise)
              return <ExerciseItem key={originalIndex} day={day} index={originalIndex} exercise={exercise} />
            })}
            <AddExerciseButton day={day} />
          </>
        )}
      </CardContent>
    </Card>
  )
}
