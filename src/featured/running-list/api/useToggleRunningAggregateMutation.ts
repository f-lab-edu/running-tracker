import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleRunningAggregate } from "@entities/running/api/runningApi";

export default function useToggleRunningAggregateMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, isAggregate }: { id: string, isAggregate: boolean }) => toggleRunningAggregate(id, isAggregate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['running'] })
      queryClient.invalidateQueries({ queryKey: ['running-list'] })
    }
  })
}