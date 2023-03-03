import React from "react";
import { DateTimePicker, DateTimePickerProps } from "@mantine/dates";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = DateTimePickerProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFDateTimePickerInput<T extends FieldValues = FieldValues>(
  props: Props<T>
) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <DateTimePicker
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
export default RHFDateTimePickerInput;

export const createDateTimePickerField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFDateTimePickerInput {...props} />;
  return Field;
};
