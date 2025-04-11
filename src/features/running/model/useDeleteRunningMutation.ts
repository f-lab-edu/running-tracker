import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRunning } from "../api/apis"
import { Running } from "@entities/running/constant/running"

export const useDeleteRunningMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteRunning,
    onSuccess(_, deletedId) {
      queryClient.getQueryCache().getAll().forEach((query) => {
        if (query.queryKey[0] !== 'running') return
        if (query.queryKey[1] === 'list') {
          queryClient.setQueryData(query.queryKey, (oldData: Running[]) => {
            return oldData.filter((item) => item.id !== deletedId)
          })
        }
        if (query.queryKey[1] === deletedId) {
          queryClient.invalidateQueries({ queryKey: ["running", deletedId] })
        }
      })
      queryClient.invalidateQueries({ queryKey: ["running", 'aggregate'] })
    },
  })
}
