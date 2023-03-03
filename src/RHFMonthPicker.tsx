import React from "react";
import { MonthPicker, MonthPickerProps } from "@mantine/dates";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Input } from "@mantine/core";

type Props<T extends FieldValues = FieldValues> = MonthPickerProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFMonthPicker<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <>
      <MonthPicker
        {...field}
        value={(field.value as any) instanceof Date ? field.value : null}
        onChange={(value) => field.onChange(value)}
        {...others}
      />
      {error && (
        <Input.Error>
          {error.message === "" && error.type === "required"
            ? "Required"
            : error.message}
        </Input.Error>
      )}
    </>
  );
}
export default RHFMonthPicker;

export const createMonthPicker = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFMonthPicker {...props} />;
  return Field;
};
