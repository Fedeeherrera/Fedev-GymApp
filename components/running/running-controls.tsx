"use client"

import { BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { RunningStatsDialog } from "./running-stats-dialog"

export function RunningControls() {
  const [showStatsDialog, setShowStatsDialog] = useState(false)

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => setShowStatsDialog(true)} className="bg-primary hover:bg-primary/90" size="sm">
        <BarChart3 className="w-4 h-4 mr-2" />
        Estadísticas Detalladas
      </Button>

      <RunningStatsDialog open={showStatsDialog} onOpenChange={setShowStatsDialog} />
    </div>
  )
}
