import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRunning } from "../api/apis"

export const useDeleteRunningMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteRunning,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["running"] })
      queryClient.invalidateQueries({ queryKey: ["aggregate"] })
    },
  })
}
