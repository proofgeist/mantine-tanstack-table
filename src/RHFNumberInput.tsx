import { NumberInput, NumberInputProps } from "@mantine/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = NumberInputProps & {
  name: UseControllerProps<T>["name"];
  rules?: UseControllerProps<T>["rules"];
  defaultValue?: UseControllerProps<T>["defaultValue"];
};

function RHFNumberInput<T extends FieldValues = FieldValues>(props: Props<T>) {
  const { name, rules, defaultValue, ...others } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  return (
    <NumberInput
      {...field}
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
export default RHFNumberInput;

export const createNumberInputField = <T extends FieldValues>() => {
  const Field = (props: Props<T>) => <RHFNumberInput {...props} />;
  return Field;
};
