import React from "react";
import { RangeSlider, RangeSliderProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = RangeSliderProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFRangeSlider<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const { field, fieldState, formState } = useController({ name, rules });

  return (
    <RangeSlider {...field} value={field.value ?? [NaN, NaN]} {...others} />
  );
}
export default RHFRangeSlider;
