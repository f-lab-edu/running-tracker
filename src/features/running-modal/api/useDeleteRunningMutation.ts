import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRunning } from "@entities/running/api/runningApi";

export default function useDeleteRunningMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteRunning,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['running-list'] })
      queryClient.invalidateQueries({ queryKey: ['running'] })
    }
  })
}