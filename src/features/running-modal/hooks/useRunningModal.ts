import { useAtom } from 'jotai'
import { runningModalAtom } from '@features/running-modal/lib/runningModalAtom'

/**
 * RunningModal을 전역적으로 제어하기 위한 훅
 */
export const useRunningModal = () => {
  const [modalState, setModalState] = useAtom(runningModalAtom)

  // 모달 열기
  const openModal = (runningId: string) => {
    setModalState({
      isOpen: true,
      runningId
    })
  }

  // 모달 닫기
  const closeModal = () => {
    setModalState({
      isOpen: false,
      runningId: null
    })
  }

  return {
    isOpen: modalState.isOpen,
    runningId: modalState.runningId,
    openModal,
    closeModal
  }
} 