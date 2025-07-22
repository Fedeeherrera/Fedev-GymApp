"use client"

import { Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWorkoutStore } from "@/store/workout-store"
import { MUSCLE_GROUPS } from "@/utils/constants"

export function WorkoutFilters() {
  const { selectedFilter, setSelectedFilter } = useWorkoutStore()

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-48 bg-background border-border">
              <SelectValue placeholder="Filtrar ejercicios" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="todos">Todos los ejercicios</SelectItem>
              {MUSCLE_GROUPS.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
              <SelectItem value="fuerza">Fuerza</SelectItem>
              <SelectItem value="movilidad">Movilidad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
