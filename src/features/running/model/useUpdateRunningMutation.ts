import { useMutation } from "@tanstack/react-query"
import { updateRunning } from "../api/apis"

export const useUpdateRunningMutation = () => {
  return useMutation({
    mutationFn: updateRunning,
  })
}
