import RunningListWithFilter from "@widgets/list-with-filter/RunningListWithFilter"
import { useRunningModal } from "@widgets/running-modal/hooks/useRunningModal"
import CreateModalBtn from "@widgets/running-modal/ui/CreateModalBtn"
import RunningModal from "@widgets/running-modal/ui/RunningModal"
import dayjs from "dayjs"

export default function DailyPage() {
  const startTime = dayjs().startOf('day').valueOf()
  const endTime = dayjs().endOf('day').valueOf()
  const { openRunningModal } = useRunningModal()

  return <section className="space-y-6">
    <header className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold">일간 러닝 기록</h1>
      <CreateModalBtn />
    </header>
    <RunningListWithFilter
      startTime={startTime}
      endTime={endTime}
      onItemClick={(running) => openRunningModal('detail', running)}
    />
    <RunningModal />
  </section>
}