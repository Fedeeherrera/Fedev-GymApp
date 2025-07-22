"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, MapPin } from "lucide-react"
import { WorkoutSection } from "./workout/workout-section"
import { RunningSection } from "./running/running-section"
import { ThemeToggle } from "./ui/theme-toggle"

export function GymApp() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Mi App de Entrenamiento</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="workout" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="workout" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              Rutina de Gym
            </TabsTrigger>
            <TabsTrigger value="running" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Running
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workout">
            <WorkoutSection />
          </TabsContent>

          <TabsContent value="running">
            <RunningSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
