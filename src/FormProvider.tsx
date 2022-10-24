import { PropsWithChildren } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { createAutocompleteField } from "./RHFAutocomplete";
import { createCheckboxField } from "./RHFCheckbox";
import { createChipField } from "./RHFChip";
import { createColorInputField } from "./RHFColorInput";
import { createColorPickerField } from "./RHFColorPicker";
import { createFileInputField } from "./RHFFileInput";
import { createJsonInputField } from "./RHFJsonInput";
import { createMultiSelectField } from "./RHFMultiSelect";
import { createNativeSelectField } from "./RHFNativeSelect";
import { createPasswordInputField } from "./RHFPasswordInput";
import { createRangeSliderField } from "./RHFRangeSlider";
import { createSegmentedControlField } from "./RHFSegmentedControl";
import { createSelectField } from "./RHFSelect";
import { createSliderField } from "./RHFSlider";
import { createSwitchField } from "./RHFSwitch";
import { createTextareaField } from "./RHFTextarea";
import { createTextInputField } from "./RHFTextInput";

type CreateFormProviderProps<T extends FieldValues> = {
  formMethods: UseFormReturn<T>;
  onSubmit?: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
};
export const createFormProvider = <T extends FieldValues>({
  formMethods,
  onSubmit = (values) => console.log(values),
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
  Form.Checkbox = createCheckboxField<T>();
  Form.Chip = createChipField<T>();
  Form.ColorInput = createColorInputField<T>();
  Form.ColorPicker = createColorPickerField<T>();
  Form.FileInput = createFileInputField<T>();
  Form.TextInput = createTextInputField<T>();
  Form.Textarea = createTextareaField<T>();
  Form.JsonInput = createJsonInputField<T>();
  Form.MultiSelect = createMultiSelectField<T>();
  Form.NativeSelect = createNativeSelectField<T>();
  Form.PasswordInput = createPasswordInputField<T>();
  Form.SegmentedControl = createSegmentedControlField<T>();
  Form.Select = createSelectField<T>();
  Form.Slider = createSliderField<T>();
  Form.RangeSlider = createRangeSliderField<T>();
  Form.Switch = createSwitchField<T>();

  return Form;
};
