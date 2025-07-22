"use client"

import { BarChart3, Target, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useWorkoutStore } from "@/store/workout-store"
import { MUSCLE_GROUP_COLORS } from "@/utils/constants"

interface WorkoutStatsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WorkoutStats({ open, onOpenChange }: WorkoutStatsProps) {
  const { routine, dayCompletion } = useWorkoutStore()

  const getWeeklyStats = () => {
    const totalExercises = Object.values(routine).reduce((acc, day) => {
      if (Array.isArray(day) && typeof day[0] === "object") {
        return acc + day.length
      }
      return acc
    }, 0)

    const completedDays = Object.values(dayCompletion).filter((day) => day.completed).length
    const totalDays = Object.keys(routine).length

    const exercisesByGroup = Object.values(routine).reduce(
      (acc, day) => {
        if (Array.isArray(day) && typeof day[0] === "object") {
          day.forEach((ex: any) => {
            if (ex.grupo) {
              acc[ex.grupo] = (acc[ex.grupo] || 0) + 1
            }
          })
        }
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalExercises,
      completedDays,
      totalDays,
      exercisesByGroup,
      completionRate: totalDays > 0 ? (completedDays / totalDays) * 100 : 0,
    }
  }

  const stats = getWeeklyStats()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border text-card-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Estadísticas Semanales
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-accent">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-card-foreground">{stats.totalExercises}</p>
                <p className="text-sm text-muted-foreground">Total Ejercicios</p>
              </CardContent>
            </Card>
            <Card className="bg-accent">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <p className="text-2xl font-bold text-card-foreground">
                  {stats.completedDays}/{stats.totalDays}
                </p>
                <p className="text-sm text-muted-foreground">Días Completados</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-card-foreground">Progreso Semanal</h3>
            <Progress value={stats.completionRate} className="mb-2" />
            <p className="text-sm text-muted-foreground">{stats.completionRate.toFixed(1)}% completado</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-card-foreground">Ejercicios por Grupo Muscular</h3>
            <div className="space-y-2">
              {Object.entries(stats.exercisesByGroup).map(([group, count]) => (
                <div key={group} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${MUSCLE_GROUP_COLORS[group]}`}></div>
                    <span className="text-card-foreground">{group}</span>
                  </div>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
