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
import { SearchOption } from '@entities/searchOption/constant/searchOption'
import { searchOptionAsSearchParsm } from '@entities/searchOption/lib/searchOptionAsSearchParsm'
import { searchParamsToSearchFilter } from '@entities/searchOption/lib/searchParamAsSearchOption'
import { BooleanRender } from '@shared/ui/StateRender'
import MinMaxHumanize from '@shared/ui/MinMaxHumanize'
import RHFMinMaxNumberField from '@shared/ui/RHFMinMaxNumberField'
import { SearchFilterRule } from '../constant/searchForm'
const defaultFilter: SearchOption = {
  minLength: undefined,
  maxLength: undefined,
  minDuration: undefined,
  maxDuration: undefined,
  minPace: undefined,
  maxPace: undefined,
  isAggregateOnly: false
}


const RunningSearchFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  // react-hook-form 설정
  const form = useForm<SearchOption>({
    resolver: zodResolver(SearchFilterRule),
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
  const onSubmit: SubmitHandler<SearchOption> = (data) => {
    setSearchParams(searchOptionAsSearchParsm(data))
  }

  // 필터 초기화
  const handleReset = () => {
    reset(defaultFilter)
    setSearchParams(searchOptionAsSearchParsm(defaultFilter))
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
              <BooleanRender
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
                      min={filterValues.minLength ?? 0}
                      max={filterValues.maxLength ?? 0}
                      unit="km"
                      allText="모든 거리"
                    />
                  </span>
                }
              >
                <RHFMinMaxNumberField
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
                      min={filterValues.minDuration ?? 0}
                      max={filterValues.maxDuration ?? 0}
                      unit="분"
                      allText="모든 시간"
                    />
                  </span>
                }
              >
                <RHFMinMaxNumberField
                  minValueKey="minDuration"
                  maxValueKey="maxDuration"
                />
              </AccordionItem>
              <AccordionItem
                key="pace"
                title="페이스 (분/km)"
                subtitle="러닝 페이스 범위로 필터링"
                startContent={
                  <span className="text-small text-primary">
                    <MinMaxHumanize
                      min={filterValues.minPace ?? 0}
                      max={filterValues.maxPace ?? 0}
                      unit="분/km"
                      allText="모든 페이스"
                    />
                  </span>
                }
              >
                <RHFMinMaxNumberField
                  minValueKey="minPace"
                  maxValueKey="maxPace"
                />
              </AccordionItem>
            </Accordion>
            <div className="px-2">
              <Checkbox
                {...register('isAggregateOnly')}
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