import { useMutation } from "@tanstack/react-query"
import { deleteRunning } from "../api/apis"

export const useDeleteRunningMutation = () => {
  return useMutation({
    mutationFn: deleteRunning,
  })
}
