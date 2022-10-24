import React from "react";
import { Switch, SwitchProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import RHFSwitchGroup from "./RHFSwitchGroup";

type Props<T extends FieldValues = FieldValues> = SwitchProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFSwitch<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <Switch
      {...field}
      checked={field.value ?? false}
      error={error ? error?.message ?? "This field is required" : false}
      {...others}
    />
  );
}
RHFSwitch.Group = RHFSwitchGroup;
export default RHFSwitch;
