"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExerciseEditDialog } from "./exercise-edit-dialog"

interface AddExerciseButtonProps {
  day: string
}

export function AddExerciseButton({ day }: AddExerciseButtonProps) {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className="w-full mt-4 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
      >
        <Plus className="w-4 h-4 mr-2" />
        Agregar Ejercicio
      </Button>

      <ExerciseEditDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        day={day}
        index={-1}
        exercise={{ ejercicio: "", series: "", grupo: "", tipo: "fuerza" }}
        isNew
      />
    </>
  )
}
