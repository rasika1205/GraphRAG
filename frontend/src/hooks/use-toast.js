"use client"

import { useState, useCallback } from "react"

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description }) => {
    const id = Date.now()
    const newToast = { id, title, description }

    setToasts((prev) => [...prev, newToast])

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)

    // Simple toast display (you can enhance this)
    const toastElement = document.createElement("div")
    toastElement.className = "bg-card border border-border rounded-lg p-4 mb-2 shadow-lg"
    toastElement.innerHTML = `
      <div class="font-semibold">${title}</div>
      <div class="text-sm text-muted-foreground">${description}</div>
    `

    const container = document.getElementById("toast-container")
    if (container) {
      container.appendChild(toastElement)
      setTimeout(() => {
        if (container.contains(toastElement)) {
          container.removeChild(toastElement)
        }
      }, 3000)
    }
  }, [])

  return { toast }
}
