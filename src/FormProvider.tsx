import { PropsWithChildren } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { createAutocompleteField } from "./RHFAutocomplete";

type CreateFormProviderProps<T extends FieldValues> = {
  formMethods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
};
export const createFormProvider = <T extends FieldValues>({
  formMethods,
  onSubmit,
  onError = (err) => console.error(err),
}: CreateFormProviderProps<T>) => {
  const Form = (props: PropsWithChildren<Record<string, unknown>>) => {
    return (
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
          {props.children}
        </form>
      </FormProvider>
    );
  };

  // here is the point where we infer the generic to a child

  Form.Autocomplete = createAutocompleteField<T>();

  return Form;
};
