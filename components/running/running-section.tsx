"use client"

import { RunningControls } from "./running-controls"
import { RunningFilters } from "./running-filters"
import { RunningStats } from "./running-stats"
import { RunningList } from "./running-list"
import { AddRunningForm } from "./add-running-form"

export function RunningSection() {
  return (
    <div className="space-y-6">
      <RunningControls />
      <RunningStats />
      <RunningFilters />
      <AddRunningForm />
      <RunningList />
    </div>
  )
}
