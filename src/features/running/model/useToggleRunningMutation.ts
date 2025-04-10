import { useMutation } from "@tanstack/react-query"
import { toggleAggregateRunning } from "../api/apis"
import { ToggleAggregateProps } from "@entities/running/constant/running"

export const useToggleRunningMutation = () => {
  return useMutation({
    mutationFn: ({ id, isAggregate }: ToggleAggregateProps) => toggleAggregateRunning(id, isAggregate),
  })
}
