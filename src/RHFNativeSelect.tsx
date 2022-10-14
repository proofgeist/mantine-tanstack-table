import React from "react";
import { NativeSelect, NativeSelectProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = NativeSelectProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFNativeSelect<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const { field, fieldState, formState } = useController({ name, rules });

  return (
    <NativeSelect
      {...field}
      value={field.value ?? []}
      error={fieldState.error?.message}
      {...others}
    />
  );
}
export default RHFNativeSelect;
