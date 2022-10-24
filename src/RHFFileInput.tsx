import React from "react";
import { FileInput, FileInputProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = FileInputProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFFileInput<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <FileInput
      {...field}
      value={field.value ?? null}
      error={error ? error?.message ?? "This field is required" : false}
      {...others}
    />
  );
}
export default RHFFileInput;

export const createFileInputField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFFileInput {...props} />;
  return Field;
};
