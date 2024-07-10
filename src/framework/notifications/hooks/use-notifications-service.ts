import { toast } from 'sonner'

export const useNotificationService = () => {
  const sendMessage = (message: string, description?: string): void => {
    toast.message(message, {
      description: description,
    })
  }

  const sendInfo = (message: string): void => {
    toast(message)
  }

  const sendSuccess = (message: string): void => {
    toast.success(message)
  }

  const sendError = (message: string): void => {
    toast.error(message)
  }

  return {
    sendMessage,
    sendInfo,
    sendSuccess,
    sendError,
  }
}
