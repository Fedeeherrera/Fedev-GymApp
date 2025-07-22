"use client"

import { Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRunningStore } from "@/store/running-store"

export function RunningFilters() {
  const { selectedWeek, selectedMonth, setSelectedWeek, setSelectedMonth } = useRunningStore()

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <div className="flex gap-4">
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-40 bg-background border-border">
                <SelectValue placeholder="Filtrar por semana" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">Todas las semanas</SelectItem>
                <SelectItem value="current">Semana actual</SelectItem>
                <SelectItem value="last">Semana pasada</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40 bg-background border-border">
                <SelectValue placeholder="Filtrar por mes" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">Todos los meses</SelectItem>
                <SelectItem value="current">Mes actual</SelectItem>
                <SelectItem value="last">Mes pasado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
