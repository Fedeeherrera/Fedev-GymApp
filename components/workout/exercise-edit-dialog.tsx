"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWorkoutStore, type Exercise } from "@/store/workout-store"
import { MUSCLE_GROUPS, EXERCISE_TYPES } from "@/utils/constants"
import { parseTimeInput } from "@/utils/helpers"

interface ExerciseEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  day: string
  index: number
  exercise: Exercise
  isNew?: boolean
}

export function ExerciseEditDialog({
  open,
  onOpenChange,
  day,
  index,
  exercise,
  isNew = false,
}: ExerciseEditDialogProps) {
  const { addExercise, updateExercise } = useWorkoutStore()
  const [formData, setFormData] = useState(exercise)

  useEffect(() => {
    setFormData(exercise)
  }, [exercise])

  const handleSave = () => {
    const processedExercise = {
      ...formData,
      series: parseTimeInput(formData.series),
    }

    if (isNew) {
      addExercise(day, processedExercise)
    } else {
      updateExercise(day, index, processedExercise)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border text-card-foreground">
        <DialogHeader>
          <DialogTitle>{isNew ? "Agregar Nuevo Ejercicio" : "Editar Ejercicio"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Nombre del ejercicio"
            value={formData.ejercicio}
            onChange={(e) => setFormData({ ...formData, ejercicio: e.target.value })}
            className="bg-background border-border text-foreground"
          />
          <Input
            placeholder="Series x repeticiones (ej: 3x10) o tiempo (ej: 2M)"
            value={formData.series}
            onChange={(e) => setFormData({ ...formData, series: e.target.value })}
            className="bg-background border-border text-foreground"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select value={formData.grupo || ""} onValueChange={(value) => setFormData({ ...formData, grupo: value })}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Grupo muscular" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {MUSCLE_GROUPS.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={formData.tipo || "fuerza"}
              onValueChange={(value) => setFormData({ ...formData, tipo: value })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {EXERCISE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              {isNew ? "Agregar" : "Guardar"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border">
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
