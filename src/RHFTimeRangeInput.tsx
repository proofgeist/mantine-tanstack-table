import React from "react";
import { TimeRangeInput, TimeRangeInputProps } from "@mantine/dates";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = TimeRangeInputProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFTimeRangeInput<T extends FieldValues = FieldValues>(
  props: Props<T>
) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <TimeRangeInput
      {...field}
      value={field.value}
      error={
        error
          ? error.message === "" && error.type === "required"
            ? "Required"
            : error.message
          : false
      }
      {...others}
    />
  );
}
export default RHFTimeRangeInput;

export const createTimeRangeInputField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFTimeRangeInput {...props} />;
  return Field;
};
