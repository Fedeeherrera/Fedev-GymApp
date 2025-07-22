"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRunningStore, type RunningSession } from "@/store/running-store"

interface RunningEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: RunningSession
  isNew?: boolean
}

export function RunningEditDialog({ open, onOpenChange, session, isNew = false }: RunningEditDialogProps) {
  const { addSession, updateSession } = useRunningStore()
  const [formData, setFormData] = useState(session)

  useEffect(() => {
    setFormData(session)
  }, [session])

  const handleSave = () => {
    if (isNew) {
      addSession({
        day: formData.day,
        date: formData.date,
        distance: formData.distance,
        time: formData.time,
        observations: formData.observations,
        completed: formData.completed,
      })
    } else {
      updateSession(session.id, formData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border text-card-foreground">
        <DialogHeader>
          <DialogTitle>{isNew ? "Agregar Sesión de Running" : "Editar Sesión de Running"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Nombre del día o sesión"
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            className="bg-background border-border text-foreground"
          />

          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="bg-background border-border text-foreground"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-card-foreground">Distancia (km)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="5.0"
                value={formData.distance || ""}
                onChange={(e) => setFormData({ ...formData, distance: Number.parseFloat(e.target.value) || 0 })}
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-card-foreground">Tiempo (minutos)</label>
              <Input
                type="number"
                placeholder="30"
                value={formData.time || ""}
                onChange={(e) => setFormData({ ...formData, time: Number.parseInt(e.target.value) || 0 })}
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-card-foreground">Observaciones</label>
            <Textarea
              placeholder="Cómo te sentiste, ritmo, clima, etc..."
              value={formData.observations || ""}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              className="bg-background border-border text-foreground"
            />
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
