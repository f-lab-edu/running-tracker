import { useQueryClient } from "@tanstack/react-query"

import { useMutation } from "@tanstack/react-query"
import { RunningFormObject } from "../model/runningForm"
import { createRunning } from "@featured/running-form/api/runningCreateApi"
import { updateRunning } from "@featured/running-form/api/runningModifyApi"

export default function useUpsertRunningMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RunningFormObject) => {
      if (data.id) {
        return updateRunning(data.id, data)
      } else {
        return createRunning(data)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['runnings'] })
      queryClient.invalidateQueries({ queryKey: ['running-list'] })
      queryClient.invalidateQueries({ queryKey: ['running-aggregate'] })
    }
  })
}