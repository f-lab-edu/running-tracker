import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateRunning } from "../api/apis"

export const useUpdateRunningMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateRunning,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["running"] })
      queryClient.invalidateQueries({ queryKey: ["aggregate"] })
    },
  })
}
