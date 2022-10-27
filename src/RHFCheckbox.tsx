import React from "react";
import { CheckboxProps, Checkbox } from "@mantine/core";
import CheckboxGroup from "./RHFCheckboxGroup";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = CheckboxProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFCheckbox<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <Checkbox
      {...field}
      value={field.value ?? ""}
      checked={field.value ?? false}
      error={error ? error?.message ?? "This field is required" : false}
      {...others}
    />
  );
}
RHFCheckbox.Group = CheckboxGroup;
export default RHFCheckbox;

export const createCheckboxField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFCheckbox {...props} />;
  return Field;
};
