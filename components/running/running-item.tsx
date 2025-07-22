"use client"

import { useState } from "react"
import { Edit3, Trash2, MapPin, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useRunningStore, type RunningSession } from "@/store/running-store"
import { formatDistance, formatDuration } from "@/utils/helpers"
import { RunningEditDialog } from "./running-edit-dialog"

interface RunningItemProps {
  session: RunningSession
}

export function RunningItem({ session }: RunningItemProps) {
  const { deleteSession, toggleSessionCompletion } = useRunningStore()
  const [showEditDialog, setShowEditDialog] = useState(false)

  return (
    <>
      <Card className={`bg-card border-border transition-opacity ${session.completed ? "opacity-75" : ""}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={session.completed}
                onCheckedChange={() => toggleSessionCompletion(session.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`font-semibold text-card-foreground ${session.completed ? "line-through" : ""}`}>
                    {session.day || "Sesión de Running"}
                  </h3>
                  <Badge variant={session.completed ? "default" : "secondary"}>
                    {session.completed ? "Completado" : "Pendiente"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{formatDistance(session.distance)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(session.time)}</span>
                  </div>
                </div>

                {session.observations && (
                  <p className="text-sm text-muted-foreground mt-2 italic">"{session.observations}"</p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowEditDialog(true)}
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => deleteSession(session.id)}
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <RunningEditDialog open={showEditDialog} onOpenChange={setShowEditDialog} session={session} />
    </>
  )
}
