
import { X } from 'lucide-react'
import { useToast } from './use-toast'
import { cn } from '@/lib/utils'

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'bg-white rounded-lg border shadow-lg p-4 transition-all duration-300 transform',
            toast.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
            toast.variant === 'destructive' && 'border-red-500 text-red-500'
          )}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{toast.title}</h3>
              {toast.description && (
                <p className="text-sm text-gray-500 mt-1">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
