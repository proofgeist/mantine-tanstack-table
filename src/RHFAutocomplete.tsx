import React from "react";
import { Autocomplete, AutocompleteProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = AutocompleteProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

export default function RHFAutocomplete<T extends FieldValues = FieldValues>(
  props: Props<T>
) {
  const { name, rules, defaultValue, ...others } = props;
  const { field, fieldState, formState } = useController({ name, rules });

  return (
    <Autocomplete
      {...field}
      value={field.value ?? ""}
      error={fieldState.error?.message}
      {...others}
    />
  );
}
