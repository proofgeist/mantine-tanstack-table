import React from "react";
import { CheckboxGroupProps, Checkbox } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = CheckboxGroupProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

export default function RHFCheckbox<T extends FieldValues = FieldValues>(
  props: Props<T>
) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <Checkbox.Group
      {...field}
      value={field.value ?? []}
      error={error ? error?.message ?? "This field is required" : false}
      {...others}
    />
  );
}
