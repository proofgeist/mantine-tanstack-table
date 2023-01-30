import React from "react";
import { Radio, RadioGroupProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = RadioGroupProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFRadioGroup<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <Radio.Group
      {...field}
      value={field.value ?? ""}
      error={error ? error?.message ?? "This field is required" : false}
      {...others}
    />
  );
}
export default RHFRadioGroup;

export const createRadioGroupField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFRadioGroup {...props} />;
  return Field;
};
