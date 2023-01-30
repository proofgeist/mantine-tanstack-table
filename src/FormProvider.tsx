import { DevTool } from "@hookform/devtools";
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import { createAutocompleteField } from "./RHFAutocomplete";
import { createCheckboxField } from "./RHFCheckbox";
import { createChipField } from "./RHFChip";
import { createColorInputField } from "./RHFColorInput";
import { createColorPickerField } from "./RHFColorPicker";
import { createDatePickerField } from "./RHFDatePicker";
import { createDateRangePickerField } from "./RHFDateRangePicker";
import { createFileInputField } from "./RHFFileInput";
import { createJsonInputField } from "./RHFJsonInput";
import { createMultiSelectField } from "./RHFMultiSelect";
import { createNativeSelectField } from "./RHFNativeSelect";
import { createNumberInputField } from "./RHFNumberInput";
import { createPasswordInputField } from "./RHFPasswordInput";
import { createRangeSliderField } from "./RHFRangeSlider";
import { createSegmentedControlField } from "./RHFSegmentedControl";
import { createSelectField } from "./RHFSelect";
import { createSliderField } from "./RHFSlider";
import { createSwitchField } from "./RHFSwitch";
import { createTextareaField } from "./RHFTextarea";
import { createTextInputField } from "./RHFTextInput";
import { createTimeInputField } from "./RHFTimeInput";
import { createTimeRangeInputField } from "./RHFTimeRangeInput";

type CreateFormProviderProps<T extends FieldValues> = FormProviderProps<T> & {
  onSubmit?: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
};
export const createFormProvider = <T extends FieldValues>() => {
  const Form = (props: CreateFormProviderProps<T> & { debug?: boolean }) => {
    const {
      onSubmit = (values) => console.log(values),
      onError = (err) => console.error(err),
      debug = false,
      children,
      ...formMethods
    } = props;
    return (
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
          {children}
          {debug && <DevTool control={formMethods.control} />}
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
  Form.NumberInput = createNumberInputField<T>();
  Form.PasswordInput = createPasswordInputField<T>();
  Form.SegmentedControl = createSegmentedControlField<T>();
  Form.Select = createSelectField<T>();
  Form.Slider = createSliderField<T>();
  Form.RangeSlider = createRangeSliderField<T>();
  Form.Switch = createSwitchField<T>();

  Form.DatePicker = createDatePickerField<T>();
  Form.DateRangePicker = createDateRangePickerField<T>();
  Form.TimeInput = createTimeInputField<T>();
  Form.TimeRangeInput = createTimeRangeInputField<T>();

  return Form;
};
