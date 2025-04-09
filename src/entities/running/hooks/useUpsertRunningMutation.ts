import { useQueryClient } from "@tanstack/react-query"

import { useMutation } from "@tanstack/react-query"
import { createRunning } from "@entities/running/api/createApi"
import { updateRunning } from "@entities/running/api/modifyApi"
import { Running } from "@entities/running/model"
export default function useUpsertRunningMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<Running, 'id'> & Partial<Pick<Running, 'id'>>) => {
      if (data.id) {
        return updateRunning(data.id, data)
      } else {
        return createRunning(data)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['runnings'] })
      queryClient.invalidateQueries({ queryKey: ['running-list'] })
      queryClient.invalidateQueries({ queryKey: ['aggregate'] })
    }
  })
}