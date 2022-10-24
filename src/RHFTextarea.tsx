import React from "react";
import { Textarea, TextareaProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = TextareaProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

export default function RHFTextarea<T extends FieldValues = FieldValues>(
  props: Props<T>
) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <Textarea
      {...field}
      value={field.value ?? ""}
      error={error ? error?.message ?? "This field is required" : false}
      {...others}
    />
  );
}

export const createTextareaField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFTextarea {...props} />;
  return Field;
};
