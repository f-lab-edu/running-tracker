import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  Button,
  Divider,
  Tooltip,
  Accordion,
  AccordionItem,
  Checkbox
} from '@heroui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiFilter, FiRefreshCw } from 'react-icons/fi'
import { SearchFilter, SearchFilterSchema, SearchFilterSchemaAsSearchParams, searchParamsToSearchFilter } from '@featured/running-list/model/search'
import StateRender from '@shared/StateRender'

const defaultFilter: SearchFilter = {
  minLength: null,
  maxLength: null,
  minTime: null,
  maxTime: null,
  minPace: null,
  maxPace: null,
  isActiveOnly: false
}

type FilterState = '11' | '10' | '01' | '00'

const RunningSearchFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  // react-hook-form 설정
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isSubmitting }
  } = useForm<SearchFilter>({
    resolver: zodResolver(SearchFilterSchema),
    defaultValues: defaultFilter,
    values: searchParamsToSearchFilter(searchParams),
  })

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
              key="distance"
              title="거리 (km)"
              subtitle="러닝 거리 범위로 필터링"
              startContent={
                <span className="text-small text-primary">
                  <StateRender
                    state={(filterValues.minLength ? '1' : '0') + (filterValues.maxLength ? '1' : '0') as FilterState}
                    render={{
                      '11': () => `${filterValues.minLength} - ${filterValues.maxLength} km`,
                      '10': () => `최소 ${filterValues.minLength} km`,
                      '01': () => `최대 ${filterValues.maxLength} km`,
                      '00': () => '모든 거리'
                    }}
                  />
                </span>
              }
            >
              <div className="flex gap-2 items-center">
                <Input
                  label="최소"
                  placeholder="최소"
                  size="sm"
                  {...register('minLength', {
                    valueAsNumber: true
                  })}
                />
                <span>~</span>
                <Input
                  label="최대"
                  placeholder="최대"
                  size="sm"
                  {...register('maxLength', {
                    valueAsNumber: true
                  })}
                />
              </div>
            </AccordionItem>

            <AccordionItem
              key="time"
              title="시간 (분)"
              subtitle="러닝 소요 시간 범위로 필터링"
              startContent={
                <span className="text-small text-primary">
                  <StateRender
                    state={(filterValues.minTime ? '1' : '0') + (filterValues.maxTime ? '1' : '0') as FilterState}
                    render={{
                      '11': () => `${filterValues.minTime || 0} - ${filterValues.maxTime || 0} 분`,
                      '10': () => `최소 ${filterValues.minTime || 0} 분`,
                      '01': () => `최대 ${filterValues.maxTime || 0} 분`,
                      '00': () => '모든 시간'
                    }}
                  />
                </span>
              }
            >
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  label="최소"
                  placeholder="최소"
                  size="sm"
                  {...register('minTime', {
                    valueAsNumber: true
                  })}
                />
                <span>~</span>
                <Input
                  type="number"
                  label="최대"
                  placeholder="최대"
                  size="sm"
                  {...register('maxTime', {
                    valueAsNumber: true
                  })}
                />
              </div>
            </AccordionItem>

            <AccordionItem
              key="pace"
              title="페이스 (분/km)"
              subtitle="러닝 페이스 범위로 필터링"
              startContent={
                <span className="text-small text-primary">
                  <StateRender
                    state={(filterValues.minPace ? '1' : '0') + (filterValues.maxPace ? '1' : '0') as FilterState}
                    render={{
                      '11': () => `${filterValues.minPace} - ${filterValues.maxPace} 분/km`,
                      '10': () => `최소 ${filterValues.minPace} 분/km`,
                      '01': () => `최대 ${filterValues.maxPace} 분/km`,
                      '00': () => '모든 페이스'
                    }}
                  />
                </span>
              }
            >
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  label="최소"
                  placeholder="최소"
                  size="sm"
                  {...register('minPace', {
                    valueAsNumber: true
                  })}
                />
                <span>~</span>
                <Input
                  type="number"
                  label="최대"
                  placeholder="최대"
                  size="sm"
                  {...register('maxPace', {
                    valueAsNumber: true
                  })}
                />
              </div>
            </AccordionItem>
          </Accordion>
          <div className="px-2">
            <Checkbox
              {...register('isActiveOnly', {
                setValueAs(value) {
                  return value === 'true'
                }
              })}
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
    </form>
  )
}

export default RunningSearchFilter 