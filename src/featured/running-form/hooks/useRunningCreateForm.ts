import { useAtom } from 'jotai'
import { runningCreateFormAtom } from '../lib/runningFormAtom'
import { Running } from '@entities/running/model/running'

interface useRunningCreateFormResult {
  isOpen: boolean
  running: Running | null
  openForm: (running?: Running | null) => void
  closeForm: () => void
}

/**
 * RunningCreateForm을 전역적으로 제어하기 위한 훅
 */
export const useRunningCreateForm = (): useRunningCreateFormResult => {
  const [formState, setFormState] = useAtom(runningCreateFormAtom)

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