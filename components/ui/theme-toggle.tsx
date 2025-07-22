"use client"

import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeStore } from "@/store/theme-store"
import { useEffect } from "react"

export function ThemeToggle() {
  const { isDark, toggleTheme, setTheme } = useThemeStore()

  useEffect(() => {
    // Initialize theme on mount
    setTheme(isDark)
  }, [isDark, setTheme])

  return (
    <Button onClick={toggleTheme} variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  )
}
