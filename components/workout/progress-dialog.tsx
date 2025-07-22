"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useWorkoutStore, type Exercise, type ExerciseHistory } from "@/store/workout-store"

interface ProgressDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  day: string
  index: number
  exercise: Exercise
}

export function ProgressDialog({ open, onOpenChange, day, index, exercise }: ProgressDialogProps) {
  const { addProgressEntry } = useWorkoutStore()
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
  const [notes, setNotes] = useState("")

  const handleSave = () => {
    if (weight || reps) {
      const entry: ExerciseHistory = {
        date: new Date().toISOString().split("T")[0],
        weight: weight ? Number.parseFloat(weight) : undefined,
        reps: reps || undefined,
        notes: notes || undefined,
      }
      addProgressEntry(day, index, entry)
      setWeight("")
      setReps("")
      setNotes("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border text-card-foreground">
        <DialogHeader>
          <DialogTitle>Registrar Progreso - {exercise.ejercicio}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Agregar Registro</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>
          <TabsContent value="add" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-card-foreground">Peso (kg)</label>
                <Input
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground">Repeticiones</label>
                <Input
                  placeholder="3x10"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-card-foreground">Notas</label>
              <Textarea
                placeholder="Sensaciones, dificultad, etc..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700">
              Guardar Progreso
            </Button>
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <div className="max-h-60 overflow-y-auto space-y-2">
              {exercise.history?.length ? (
                exercise.history.map((entry, idx) => (
                  <Card key={idx} className="bg-accent">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-card-foreground">
                            {entry.weight && `${entry.weight}kg`} {entry.reps && `- ${entry.reps}`}
                          </p>
                          {entry.notes && <p className="text-sm text-muted-foreground mt-1">{entry.notes}</p>}
                        </div>
                        <p className="text-xs text-muted-foreground">{entry.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground">No hay registros aún</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
