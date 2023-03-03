import React from "react";
import { YearPicker, YearPickerProps } from "@mantine/dates";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Input } from "@mantine/core";

type Props<T extends FieldValues = FieldValues> = YearPickerProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFYearPicker<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <>
      <YearPicker
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
export default RHFYearPicker;

export const createYearPicker = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFYearPicker {...props} />;
  return Field;
};
