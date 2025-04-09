import StateRender from "@shared/StateRender";

type FilterState = '11' | '10' | '01' | '00'

interface MinMaxHumanizeProps {
  min: number
  max: number
  allText: string
  unit: string
}

export default function MinMaxHumanize({ min, max, allText, unit }: MinMaxHumanizeProps) {
  return <StateRender
    state={(min ? '1' : '0') + (max ? '1' : '0') as FilterState}
    render={{
      '11': () => `${min} - ${max} ${unit}`,
      '10': () => `최소 ${min} ${unit}`,
      '01': () => `최대 ${max} ${unit}`,
      '00': () => allText
    }}
  />
}
