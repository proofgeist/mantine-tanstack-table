import React from "react";
import { DateRangePicker, DateRangePickerProps } from "@mantine/dates";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = DateRangePickerProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFDateRangePicker<T extends FieldValues = FieldValues>(
  props: Props<T>
) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <DateRangePicker
      {...field}
      value={field.value}
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
export default RHFDateRangePicker;

export const createDateRangePickerField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFDateRangePicker {...props} />;
  return Field;
};
