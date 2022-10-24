import React from "react";
import { Select, SelectProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = SelectProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFSelect<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <Select
      {...field}
      value={field.value ?? null}
      error={error ? error?.message ?? "This field is required" : false}
      {...others}
    />
  );
}
export default RHFSelect;

export const createSelectField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFSelect {...props} />;
  return Field;
};
