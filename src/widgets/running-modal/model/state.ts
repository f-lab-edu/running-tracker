import { atom } from "jotai";
import { Running } from "@entities/running/constant/running";

export type RunningModalType = 'detail' | 'insert' | 'update'

export type RunningModalState = {
  type: RunningModalType | null
  running: Running | null
}

export const runningModalAtom = atom<RunningModalState>({
  type: null,
  running: null
})

