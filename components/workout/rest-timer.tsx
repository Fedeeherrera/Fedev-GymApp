"use client"

import { useEffect } from "react"
import { Clock, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useWorkoutStore } from "@/store/workout-store"
import { formatTime } from "@/utils/helpers"
import { REST_TIMES } from "@/utils/constants"

export function RestTimer() {
  const { restTimer, isTimerRunning, setRestTimer, setIsTimerRunning } = useWorkoutStore()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(restTimer - 1)
        if (restTimer <= 1) {
          setIsTimerRunning(false)
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("¡Descanso terminado!", {
              body: "Es hora de continuar con el siguiente ejercicio",
            })
          }
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, restTimer, setRestTimer, setIsTimerRunning])

  const startTimer = (seconds: number) => {
    setRestTimer(seconds)
    setIsTimerRunning(true)
  }

  const pauseTimer = () => {
    setIsTimerRunning(false)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setRestTimer(0)
  }

  return (
    <div className="space-y-4">
      {/* Active Timer */}
      {(restTimer > 0 || isTimerRunning) && (
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-semibold">Descanso: {formatTime(restTimer)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => (isTimerRunning ? pauseTimer() : setIsTimerRunning(true))}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button onClick={resetTimer} size="sm" variant="outline" className="border-border bg-transparent">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Timer Buttons */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-card-foreground">Temporizador de descanso:</span>
            <div className="flex gap-2">
              {REST_TIMES.map((time) => (
                <Button
                  key={time}
                  onClick={() => startTimer(time)}
                  size="sm"
                  variant="outline"
                  className="border-border hover:bg-accent"
                >
                  {time}s
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
