import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toggleAggregateRunning } from "../api/apis"
import { ToggleAggregateProps } from "@entities/running/constant/running"

export const useToggleRunningMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, isAggregate }: ToggleAggregateProps) => toggleAggregateRunning(id, isAggregate),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["running"] })
      queryClient.invalidateQueries({ queryKey: ["aggregate"] })
    },
  })
}
