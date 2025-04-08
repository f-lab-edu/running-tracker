import { Running } from '@entities/running/model/running'
import { atom } from 'jotai'

// RunningCreateForm 상태를 위한 atom
interface RunningFormState {
  isOpen: boolean
  running: Running | null
}

// 초기 상태 설정
const initialFormState: RunningFormState = {
  isOpen: false,
  running: null
}

// RunningCreateForm 상태를 관리하는 atom 생성
export const runningFormAtom = atom<RunningFormState>(initialFormState) 