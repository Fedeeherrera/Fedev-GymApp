"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RunningEditDialog } from "./running-edit-dialog"

export function AddRunningForm() {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <Button onClick={() => setShowDialog(true)} className="w-full bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Sesión de Running
          </Button>
        </CardContent>
      </Card>

      <RunningEditDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        session={{
          id: "",
          day: "",
          date: new Date().toISOString().split("T")[0],
          distance: 0,
          time: 0,
          observations: "",
          completed: false,
        }}
        isNew
      />
    </>
  )
}
