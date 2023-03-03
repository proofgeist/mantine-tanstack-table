import React from "react";
import { DatePickerInput, DatePickerInputProps } from "@mantine/dates";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = DatePickerInputProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFDatePickerInput<T extends FieldValues = FieldValues>(
  props: Props<T>
) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <DatePickerInput
      {...field}
      value={(field.value as any) instanceof Date ? field.value : null}
      onChange={(value) => field.onChange(value)}
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
export default RHFDatePickerInput;

export const createDatePickerField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFDatePickerInput {...props} />;
  return Field;
};
