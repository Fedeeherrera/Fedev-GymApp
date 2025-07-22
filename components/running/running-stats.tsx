"use client"

import { MapPin, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRunningStore } from "@/store/running-store"
import { formatDistance, formatDuration, getWeekNumber } from "@/utils/helpers"

export function RunningStats() {
  const { sessions } = useRunningStore()

  const getWeeklyStats = () => {
    const currentWeek = getWeekNumber(new Date())
    const currentYear = new Date().getFullYear()

    const weekSessions = sessions.filter((session) => {
      const sessionDate = new Date(session.date)
      return getWeekNumber(sessionDate) === currentWeek && sessionDate.getFullYear() === currentYear
    })

    const totalDistance = weekSessions.reduce((acc, session) => acc + session.distance, 0)
    const totalTime = weekSessions.reduce((acc, session) => acc + session.time, 0)
    const completedSessions = weekSessions.filter((session) => session.completed).length

    return {
      totalDistance,
      totalTime,
      completedSessions,
      totalSessions: weekSessions.length,
    }
  }

  const stats = getWeeklyStats()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Distancia Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-card-foreground">{formatDistance(stats.totalDistance)}</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Tiempo Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-card-foreground">{formatDuration(stats.totalTime)}</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Sesiones Completadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-card-foreground">
            {stats.completedSessions}/{stats.totalSessions}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
