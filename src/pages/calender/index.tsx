import { Calendar } from "@heroui/react"
import RunningListWithFilter from "@widgets/list-with-filter/RunningListWithFilter"
import CreateModalBtn from "@widgets/running-modal/ui/CreateModalBtn"
import { CalendarDate, parseDate, today } from '@internationalized/date'
import dayjs from "dayjs"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import RunningModal from "@widgets/running-modal/ui/RunningModal"
import { useRunningModal } from "@widgets/running-modal/hooks/useRunningModal"

export default function CalenderPage() {
  const [searchParams] = useSearchParams()
  const dateParam = searchParams.get('date')

  const [selectedDate, setSelectedDate] = useState<CalendarDate>(dateParam ? parseDate(dateParam) : today('Asia/Seoul'))

  const startTime = useMemo(() => dayjs(selectedDate.toString()).startOf('day').valueOf(), [selectedDate])
  const endTime = useMemo(() => dayjs(selectedDate.toString()).endOf('day').valueOf(), [selectedDate])
  const { openRunningModal } = useRunningModal()


  return <section className="space-y-6">
    <header className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold">월간 러닝 기록</h1>
      <CreateModalBtn />
    </header>
    <div className="flex items-center justify-between">
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
      />
    </div>
    <RunningListWithFilter
      startTime={startTime}
      endTime={endTime}
      onItemClick={(running) => openRunningModal('detail', running)}
    />
    <RunningModal />
  </section>
}