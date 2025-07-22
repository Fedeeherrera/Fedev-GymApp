import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mi App de Entrenamiento",
  description: "Aplicación completa para gestionar rutinas de gimnasio y sesiones de running",
  keywords: "gimnasio, rutina, ejercicios, fitness, entrenamiento, running, cardio",
  authors: [{ name: "Training App" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
