import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateRunning } from "../api/apis"
import { Running } from "@entities/running/constant/running"

export const useUpdateRunningMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateRunning,
    onSuccess(data) {
      queryClient.getQueryCache().getAll().forEach((query) => {
        if (query.queryKey[0] !== 'running') return
        if (query.queryKey[1] === 'list') {
          queryClient.setQueryData(query.queryKey, (oldData: Running[]) => {
            return oldData.map((item) => {
              return item.id === data.id ? data : item
            })
          })
        }
        if (query.queryKey[1] === data.id) {
          queryClient.setQueryData(["running", data.id], () => {
            return data
          })
        }
      })
      queryClient.invalidateQueries({ queryKey: ["aggregate"] })
    },
  })
}
