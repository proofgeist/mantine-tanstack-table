import React from "react";
import {
  SegmentedControl,
  SegmentedControlProps,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = SegmentedControlProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFSegmentedControl<T extends FieldValues = FieldValues>(
  props: Props<T>
) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return <SegmentedControl {...field} value={field.value ?? ""} {...others} />;
}
export default RHFSegmentedControl;

export const createSegmentedControlField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFSegmentedControl {...props} />;
  return Field;
};
