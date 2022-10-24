import React from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = TextInputProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFTextInput<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <TextInput
      {...field}
      value={field.value ?? ""}
      error={
        error
          ? error.message === "" && error.type === "required"
            ? "Required"
            : error.message
          : false
      }
      {...others}
    />
  );
}
export default RHFTextInput;

export const createTextInputField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFTextInput {...props} />;
  return Field;
};
