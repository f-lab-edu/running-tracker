import { ModalBody, Spinner } from '@heroui/react'

export default function RunningModalSkeleton() {
  return <ModalBody className="flex justify-center items-center py-10">
    <Spinner size="lg" />
  </ModalBody>
}