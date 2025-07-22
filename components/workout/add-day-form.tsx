"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useWorkoutStore } from "@/store/workout-store"

export function AddDayForm() {
  const [newDay, setNewDay] = useState("")
  const { addDay } = useWorkoutStore()

  const handleSubmit = () => {
    if (newDay.trim()) {
      addDay(newDay.trim())
      setNewDay("")
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Nombre del nuevo día (ej: sábado)"
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
            className="bg-background border-border text-foreground"
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          />
          <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Día
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
