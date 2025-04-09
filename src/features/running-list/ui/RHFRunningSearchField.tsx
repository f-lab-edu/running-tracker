import { Input } from "@heroui/react";
import { useFormContext } from "react-hook-form";

interface RHFRunningSearchFieldProps {
  minValueKey: string;
  maxValueKey: string;
}

const RHFRunningSearchField = ({
  minValueKey,
  maxValueKey,
}: RHFRunningSearchFieldProps) => {
  const { register } = useFormContext()
  return <div className="flex gap-2 items-center">
    <Input
      label="최소"
      placeholder="최소"
      size="sm"
      {...register(minValueKey, {
        valueAsNumber: true
      })}
    />
    <span>~</span>
    <Input
      label="최대"
      placeholder="최대"
      size="sm"
      {...register(maxValueKey, {
        valueAsNumber: true
      })}
    />
  </div>
}

export default RHFRunningSearchField