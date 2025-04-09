import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleRunningAggregate } from "@entities/running/api";

export default function useToggleRunningAggregateByIdMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, isAggregate }: { id: string, isAggregate: boolean }) => toggleRunningAggregate(id, isAggregate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['running'] })
      queryClient.invalidateQueries({ queryKey: ['running-list'] })
    }
  })
}