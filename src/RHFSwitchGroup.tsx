import React from "react";
import { Switch, SwitchGroupProps, SwitchProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = SwitchGroupProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFSwitchGroup<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const { field, fieldState, formState } = useController({ name, rules });

  return (
    <Switch.Group
      {...field}
      value={field.value ?? []}
      error={fieldState.error?.message}
      {...others}
    />
  );
}
export default RHFSwitchGroup;
