import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface RunningSession {
  id: string
  day: string
  date: string
  distance: number // km
  time: number // minutes
  observations?: string
  completed: boolean
}

interface RunningState {
  sessions: RunningSession[]
  selectedWeek: string
  selectedMonth: string

  // Actions
  addSession: (session: Omit<RunningSession, "id">) => void
  updateSession: (id: string, session: Partial<RunningSession>) => void
  deleteSession: (id: string) => void
  toggleSessionCompletion: (id: string) => void
  setSessions: (sessions: RunningSession[]) => void
  setSelectedWeek: (week: string) => void
  setSelectedMonth: (month: string) => void
}

export const useRunningStore = create<RunningState>()(
  persist(
    (set) => ({
      sessions: [],
      selectedWeek: "all",
      selectedMonth: "all",

      addSession: (session) =>
        set((state) => ({
          sessions: [
            ...state.sessions,
            {
              ...session,
              id: Date.now().toString(),
            },
          ],
        })),

      updateSession: (id, updatedSession) =>
        set((state) => ({
          sessions: state.sessions.map((session) => (session.id === id ? { ...session, ...updatedSession } : session)),
        })),

      deleteSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((session) => session.id !== id),
        })),

      toggleSessionCompletion: (id) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === id ? { ...session, completed: !session.completed } : session,
          ),
        })),

      setSessions: (sessions) => set({ sessions }),
      setSelectedWeek: (selectedWeek) => set({ selectedWeek }),
      setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
    }),
    {
      name: "running-storage",
    },
  ),
)
