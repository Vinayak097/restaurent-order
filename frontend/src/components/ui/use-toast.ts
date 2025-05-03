// Adapted from shadcn/ui toast component
import { useState, useEffect } from 'react'

type ToastVariant = 'default' | 'destructive'

interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface Toast extends ToastProps {
  id: string
  visible: boolean
}

interface ToastContextValue {
  toast: (props: ToastProps) => void
  dismiss: (id: string) => void
  toasts: Toast[]
}

export function useToast(): ToastContextValue {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant = 'default', duration = 5000 }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, description, variant, duration, visible: true },
    ])

    if (duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, duration)
    }

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    )

    // Remove from state after animation completes
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 300)
  }

  useEffect(() => {
    // Clean up any toasts when component unmounts
    return () => {
      setToasts([])
    }
  }, [])

  return {
    toast,
    dismiss,
    toasts,
  }
}
