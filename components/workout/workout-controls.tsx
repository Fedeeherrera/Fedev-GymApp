"use client"

import { useState } from "react"
import { Download, Upload, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useWorkoutStore } from "@/store/workout-store"
import { useRunningStore } from "@/store/running-store"
import { WorkoutStats } from "./workout-stats"

export function WorkoutControls() {
  const { routine, dayCompletion, setRoutine, setDayCompletion } = useWorkoutStore()
  const { sessions, setSessions } = useRunningStore()
  const [jsonInput, setJsonInput] = useState("")
  const [showJsonDialog, setShowJsonDialog] = useState(false)
  const [showStatsDialog, setShowStatsDialog] = useState(false)

  const exportData = () => {
    const data = {
      workout: { routine, dayCompletion },
      running: { sessions },
      exportDate: new Date().toISOString(),
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "entrenamiento-completo.json"
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importData = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      if (parsed.workout?.routine) {
        setRoutine(parsed.workout.routine)
      }
      if (parsed.workout?.dayCompletion) {
        setDayCompletion(parsed.workout.dayCompletion)
      }
      if (parsed.running?.sessions) {
        setSessions(parsed.running.sessions)
      }
      setJsonInput("")
      setShowJsonDialog(false)
    } catch (error) {
      alert("JSON inválido. Por favor verifica el formato.")
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => setShowStatsDialog(true)} className="bg-primary hover:bg-primary/90" size="sm">
        <BarChart3 className="w-4 h-4 mr-2" />
        Estadísticas
      </Button>

      <Button onClick={exportData} className="bg-green-600 hover:bg-green-700 text-white" size="sm">
        <Download className="w-4 h-4 mr-2" />
        Exportar
      </Button>

      <Dialog open={showJsonDialog} onOpenChange={setShowJsonDialog}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card border-border text-card-foreground">
          <DialogHeader>
            <DialogTitle>Importar Datos desde JSON</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Pega aquí tu JSON de entrenamiento..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="min-h-[200px] bg-background border-border"
            />
            <div className="flex gap-2">
              <Button onClick={importData} className="bg-blue-600 hover:bg-blue-700">
                Importar
              </Button>
              <Button variant="outline" onClick={() => setShowJsonDialog(false)} className="border-border">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <WorkoutStats open={showStatsDialog} onOpenChange={setShowStatsDialog} />
    </div>
  )
}
