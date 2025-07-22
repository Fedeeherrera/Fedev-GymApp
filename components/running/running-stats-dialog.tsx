"use client"

import { BarChart3, MapPin, Clock, TrendingUp, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRunningStore } from "@/store/running-store"
import { formatDistance, formatDuration, getWeekNumber } from "@/utils/helpers"

interface RunningStatsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RunningStatsDialog({ open, onOpenChange }: RunningStatsDialogProps) {
  const { sessions } = useRunningStore()

  const getDetailedStats = () => {
    const currentWeek = getWeekNumber(new Date())
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const weekSessions = sessions.filter((session) => {
      const sessionDate = new Date(session.date)
      return getWeekNumber(sessionDate) === currentWeek && sessionDate.getFullYear() === currentYear
    })

    const monthSessions = sessions.filter((session) => {
      const sessionDate = new Date(session.date)
      return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear
    })

    const totalSessions = sessions.length
    const completedSessions = sessions.filter((s) => s.completed).length
    const totalDistance = sessions.reduce((acc, s) => acc + s.distance, 0)
    const totalTime = sessions.reduce((acc, s) => acc + s.time, 0)

    const weekDistance = weekSessions.reduce((acc, s) => acc + s.distance, 0)
    const weekTime = weekSessions.reduce((acc, s) => acc + s.time, 0)
    const monthDistance = monthSessions.reduce((acc, s) => acc + s.distance, 0)
    const monthTime = monthSessions.reduce((acc, s) => acc + s.time, 0)

    const avgDistance = totalSessions > 0 ? totalDistance / totalSessions : 0
    const avgTime = totalSessions > 0 ? totalTime / totalSessions : 0
    const completionRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0

    return {
      totalSessions,
      completedSessions,
      totalDistance,
      totalTime,
      weekDistance,
      weekTime,
      monthDistance,
      monthTime,
      avgDistance,
      avgTime,
      completionRate,
    }
  }

  const stats = getDetailedStats()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border text-card-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Estadísticas Detalladas de Running
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Resumen General */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-accent">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-card-foreground">{stats.totalSessions}</p>
                <p className="text-sm text-muted-foreground">Total Sesiones</p>
              </CardContent>
            </Card>
            <Card className="bg-accent">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <p className="text-2xl font-bold text-card-foreground">{stats.completedSessions}</p>
                <p className="text-sm text-muted-foreground">Completadas</p>
              </CardContent>
            </Card>
          </div>

          {/* Progreso de Completado */}
          <div>
            <h3 className="font-semibold mb-3 text-card-foreground">Tasa de Completado</h3>
            <Progress value={stats.completionRate} className="mb-2" />
            <p className="text-sm text-muted-foreground">{stats.completionRate.toFixed(1)}% de sesiones completadas</p>
          </div>

          {/* Estadísticas por Período */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-accent">
              <CardContent className="p-4">
                <h4 className="font-medium text-card-foreground mb-2">Esta Semana</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{formatDistance(stats.weekDistance)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(stats.weekTime)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent">
              <CardContent className="p-4">
                <h4 className="font-medium text-card-foreground mb-2">Este Mes</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{formatDistance(stats.monthDistance)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(stats.monthTime)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent">
              <CardContent className="p-4">
                <h4 className="font-medium text-card-foreground mb-2">Total</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{formatDistance(stats.totalDistance)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(stats.totalTime)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Promedios */}
          <div>
            <h3 className="font-semibold mb-3 text-card-foreground">Promedios por Sesión</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-accent">
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-card-foreground">{formatDistance(stats.avgDistance)}</p>
                  <p className="text-xs text-muted-foreground">Distancia Promedio</p>
                </CardContent>
              </Card>
              <Card className="bg-accent">
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-card-foreground">{formatDuration(stats.avgTime)}</p>
                  <p className="text-xs text-muted-foreground">Tiempo Promedio</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
