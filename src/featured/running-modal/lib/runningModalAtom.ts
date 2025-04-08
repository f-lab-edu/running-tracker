import { atom } from 'jotai'

// RunningModal 상태를 위한 atom
interface RunningModalState {
  isOpen: boolean
  runningId: string | null
}

// 초기 상태 설정
const initialModalState: RunningModalState = {
  isOpen: false,
  runningId: null
}

// RunningModal 상태를 관리하는 atom 생성
export const runningModalAtom = atom<RunningModalState>(initialModalState) 