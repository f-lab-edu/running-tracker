import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRunning } from "../api/apis"

export const useInsertRunningMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createRunning,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["running", 'list'] })
      queryClient.invalidateQueries({ queryKey: ["aggregate"] })
    },
  })
}
