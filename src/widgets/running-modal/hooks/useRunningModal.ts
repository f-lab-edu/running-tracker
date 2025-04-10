import { useAtom } from "jotai";
import { runningModalAtom, RunningModalType } from "../model/state";
import { Running } from "@entities/running/constant/running";

export const useRunningModal = () => {
  const [runningModal, setRunningModal] = useAtom(runningModalAtom)
  const openRunningModal = (type: RunningModalType, running: Running | null = null) => {
    setRunningModal({ type, running })
  }
  const closeRunningModal = () => {
    setRunningModal({ type: null, running: null })
  }
  return { runningModal, openRunningModal, closeRunningModal }
}
