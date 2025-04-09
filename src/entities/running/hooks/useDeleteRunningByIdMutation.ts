import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRunningById } from "@entities/running/api";

export default function useDeleteRunningByIdMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteRunningById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['running-list'] })
      queryClient.invalidateQueries({ queryKey: ['running'] })
    }
  })
}