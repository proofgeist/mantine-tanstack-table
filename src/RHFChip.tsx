import React from "react";
import { Chip, ChipProps } from "@mantine/core";
import RHFChipGroup from "./RHFChipGroup";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = ChipProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFChip<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return <Chip {...field} value={field.value ?? ""} {...others} />;
}

RHFChip.Group = RHFChipGroup;
export default RHFChip;

export const createChipField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFChip {...props} />;
  return Field;
};
