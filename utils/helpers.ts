export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export const getDayName = (day: string): string => {
  const days: Record<string, string> = {
    lunes: "Lunes",
    martes: "Martes",
    miércoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sábado: "Sábado",
    domingo: "Domingo",
  }
  return days[day] || day.charAt(0).toUpperCase() + day.slice(1)
}

export const parseTimeInput = (input: string): string => {
  // Convert "1M", "2M", etc. to proper format
  const timeMatch = input.match(/^(\d+)M$/i)
  if (timeMatch) {
    return `${timeMatch[1]} min`
  }
  return input
}

export const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export const formatDistance = (distance: number): string => {
  return `${distance.toFixed(1)} km`
}

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}
