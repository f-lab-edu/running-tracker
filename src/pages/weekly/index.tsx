import { RunningAggregator } from "@features/aggregate/ui/RunningAggregator"
import RunningListSkeleton from "@features/running/ui/RunningListSkeleton"
import AsyncBoundary from "@shared/ui/AsyncBoundary"
import RunningListWithFilter from "@widgets/list-with-filter/ui/RunningListWithFilter"
import { useRunningModal } from "@widgets/running-modal/hooks/useRunningModal"
import CreateModalBtn from "@widgets/running-modal/ui/CreateModalBtn"
import RunningModal from "@widgets/running-modal/ui/RunningModal"
import dayjs from "dayjs"

export default function WeeklyPage() {
  const startTime = dayjs().startOf('week').valueOf()
  const endTime = dayjs().endOf('week').valueOf()
  const { openRunningModal } = useRunningModal()

  return <section className="space-y-6">
    <header className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold">주간 러닝 기록</h1>
      <CreateModalBtn />
    </header>
    <AsyncBoundary pendingFallback={<RunningListSkeleton />}>
      <RunningAggregator />
    </AsyncBoundary>

    <h2 className="text-2xl font-semibold mt-8 mb-4">주간 러닝 목록</h2>
    <RunningListWithFilter
      startTime={startTime}
      endTime={endTime}
      onItemClick={(running) => openRunningModal('detail', running)}
    />
    <RunningModal />
  </section>
}