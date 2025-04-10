import StateRender from "@shared/ui/StateRender";

type FilterState = '11' | '10' | '01' | '00'

interface MinMaxHumanizeProps {
  min: number
  max: number
  allText: string
  unit: string
}

const MinMaxHumanize: React.FC<MinMaxHumanizeProps> = ({ min, max, allText, unit }) => {
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
export default MinMaxHumanize