import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toggleAggregateRunning } from "../api/apis"
import { Running, ToggleAggregateProps } from "@entities/running/constant/running"

export const useToggleRunningMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, isAggregate }: ToggleAggregateProps) => toggleAggregateRunning(id, isAggregate),
    onSuccess(data) {
      queryClient.getQueryCache().getAll().forEach((query) => {
        if (query.queryKey[0] !== 'running') return
        if (query.queryKey[1] === 'list') {
          queryClient.setQueryData(query.queryKey, (oldData: Running[]) => {
            return oldData.map((item) => {
              return {
                ...item,
                isAggregate: item.id === data.id ? data.isAggregate : item.isAggregate,
              }
            })
          })
        }
        if (query.queryKey[1] === data.id) {
          queryClient.setQueryData(["running", data.id], (oldData: Running) => {
            return {
              ...oldData,
              isAggregate: data.isAggregate,
            }
          })
        }
      })
      queryClient.invalidateQueries({ queryKey: ["aggregate"] })
    },
  })
}
