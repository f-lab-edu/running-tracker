import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Divider,
  Tooltip,
  Accordion,
  Checkbox,
  AccordionItem,
} from '@heroui/react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiFilter, FiRefreshCw } from 'react-icons/fi'
import { SearchFilter, SearchFilterSchema, SearchFilterSchemaAsSearchParams, searchParamsToSearchFilter } from '@features/running-list/model/search'
import StateRender from '@shared/StateRender'
import MinMaxHumanize from './MinMaxHumanize'
import RHFRunningSearchField from './RHFRunningSearchField'
const defaultFilter: SearchFilter = {
  minLength: null,
  maxLength: null,
  minTime: null,
  maxTime: null,
  minPace: null,
  maxPace: null,
  isActiveOnly: false
}


const RunningSearchFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  // react-hook-form 설정
  const form = useForm<SearchFilter>({
    resolver: zodResolver(SearchFilterSchema),
    defaultValues: defaultFilter,
    values: searchParamsToSearchFilter(searchParams),
  })

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isSubmitting }
  } = form

  // 필터 값 감지
  const filterValues = watch()
  const isFilterApplied = Object.entries(filterValues).some(([key, value]) => {
    if (key === 'isActiveOnly') return value === true
    return value !== null
  })

  // 필터 적용
  const onSubmit: SubmitHandler<SearchFilter> = (data) => {
    setSearchParams(SearchFilterSchemaAsSearchParams.parse(data))
  }

  // 필터 초기화
  const handleReset = () => {
    reset(defaultFilter)
    setSearchParams(SearchFilterSchemaAsSearchParams.parse(defaultFilter))
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <Card className="w-full">
          <CardHeader className="flex justify-between items-center py-3">
            <div className="flex items-center gap-2">
              <FiFilter />
              <h3 className="text-base font-semibold">러닝 기록 필터</h3>
              {isFilterApplied && (
                <Tooltip content="필터가 적용되었습니다">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                </Tooltip>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="light"
              onPress={() => setIsFilterExpanded(!isFilterExpanded)}
            >
              <StateRender.Boolean
                state={isFilterExpanded}
                render={{
                  true: () => '접기',
                  false: () => '필터 설정'
                }}
              />
            </Button>
          </CardHeader>
          <Divider />
          <CardBody className={isFilterExpanded ? 'block' : 'hidden'}>
            <Accordion>
              <AccordionItem
                key="length"
                title="거리 (km)"
                subtitle="러닝 거리 범위로 필터링"
                startContent={
                  <span className="text-small text-primary">
                    <MinMaxHumanize
                      min={filterValues.minLength || 0}
                      max={filterValues.maxLength || 0}
                      unit="km"
                      allText="모든 거리"
                    />
                  </span>
                }
              >
                <RHFRunningSearchField
                  minValueKey="minLength"
                  maxValueKey="maxLength"
                />
              </AccordionItem>
              <AccordionItem
                key="time"
                title="시간 (분)"
                subtitle="러닝 소요 시간 범위로 필터링"
                startContent={
                  <span className="text-small text-primary">
                    <MinMaxHumanize
                      min={filterValues.minTime || 0}
                      max={filterValues.maxTime || 0}
                      unit="분"
                      allText="모든 시간"
                    />
                  </span>
                }
              >
                <RHFRunningSearchField
                  minValueKey="minTime"
                  maxValueKey="maxTime"
                />
              </AccordionItem>
              <AccordionItem
                key="pace"
                title="페이스 (분/km)"
                subtitle="러닝 페이스 범위로 필터링"
                startContent={
                  <span className="text-small text-primary">
                    <MinMaxHumanize
                      min={filterValues.minPace || 0}
                      max={filterValues.maxPace || 0}
                      unit="분/km"
                      allText="모든 페이스"
                    />
                  </span>
                }
              >
                <RHFRunningSearchField
                  minValueKey="minPace"
                  maxValueKey="maxPace"
                />
              </AccordionItem>
            </Accordion>
            <div className="px-2">
              <Checkbox
                {...register('isActiveOnly')}
              >
                집계에 포함된 기록만 보기
              </Checkbox>
            </div>
          </CardBody>
          <CardFooter className="flex justify-end gap-2">
            <Button
              color="danger"
              variant="light"
              type="button"
              onPress={handleReset}
              startContent={<FiRefreshCw size={16} />}
              isDisabled={!isFilterApplied}
            >
              초기화
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isSubmitting}
              startContent={<FiFilter size={16} />}
            >
              필터 적용
            </Button>
          </CardFooter>
        </Card>
      </FormProvider>
    </form>
  )
}

export default RunningSearchFilter 