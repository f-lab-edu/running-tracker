import { useMutation } from "@tanstack/react-query"
import { createRunning } from "../api/apis"

export const useInsertRunningMutation = () => {
  return useMutation({
    mutationFn: createRunning,
  })
}
