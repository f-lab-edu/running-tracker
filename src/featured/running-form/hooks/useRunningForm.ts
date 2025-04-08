import { useAtom } from 'jotai'
import { runningFormAtom } from '../lib/runningFormAtom'
import { Running } from '@entities/running/model/running'

interface useRunningFormResult {
  isOpen: boolean
  running: Running | null
  openForm: (running?: Running | null) => void
  closeForm: () => void
}

/**
 * RunningForm을 전역적으로 제어하기 위한 훅
 */
export const useRunningForm = (): useRunningFormResult => {
  const [formState, setFormState] = useAtom(runningFormAtom)

  // 폼 모달 열기
  const openForm = (running?: Running | null) => {
    setFormState({
      isOpen: true,
      running: running ?? null
    })
  }

  // 폼 모달 닫기
  const closeForm = () => {
    setFormState({
      isOpen: false,
      running: null
    })
  }

  return {
    isOpen: formState.isOpen,
    running: formState.running,
    openForm,
    closeForm
  }
} 