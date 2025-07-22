"use client"

import { WorkoutControls } from "./workout-controls"
import { WorkoutFilters } from "./workout-filters"
import { RestTimer } from "./rest-timer"
import { DaysList } from "./days-list"
import { AddDayForm } from "./add-day-form"

export function WorkoutSection() {
  return (
    <div className="space-y-6">
      <WorkoutControls />
      <RestTimer />
      <WorkoutFilters />
      <AddDayForm />
      <DaysList />
    </div>
  )
}
