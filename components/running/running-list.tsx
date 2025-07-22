"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { useRunningStore } from "@/store/running-store"
import { RunningItem } from "./running-item"
import { getWeekNumber } from "@/utils/helpers"

export function RunningList() {
  const { sessions, selectedWeek, selectedMonth } = useRunningStore()

  const getFilteredSessions = () => {
    let filtered = [...sessions]

    if (selectedWeek !== "all") {
      const currentWeek = getWeekNumber(new Date())
      const currentYear = new Date().getFullYear()

      filtered = filtered.filter((session) => {
        const sessionDate = new Date(session.date)
        const sessionWeek = getWeekNumber(sessionDate)
        const sessionYear = sessionDate.getFullYear()

        if (selectedWeek === "current") {
          return sessionWeek === currentWeek && sessionYear === currentYear
        } else if (selectedWeek === "last") {
          return sessionWeek === currentWeek - 1 && sessionYear === currentYear
        }
        return true
      })
    }

    if (selectedMonth !== "all") {
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()

      filtered = filtered.filter((session) => {
        const sessionDate = new Date(session.date)
        const sessionMonth = sessionDate.getMonth()
        const sessionYear = sessionDate.getFullYear()

        if (selectedMonth === "current") {
          return sessionMonth === currentMonth && sessionYear === currentYear
        } else if (selectedMonth === "last") {
          const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
          const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
          return sessionMonth === lastMonth && sessionYear === lastMonthYear
        }
        return true
      })
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const filteredSessions = getFilteredSessions()

  return (
    <div className="space-y-4">
      {filteredSessions.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No hay sesiones de running registradas</p>
          </CardContent>
        </Card>
      ) : (
        filteredSessions.map((session) => <RunningItem key={session.id} session={session} />)
      )}
    </div>
  )
}
