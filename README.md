# rhf-mantine


A thin wrapper around the [Mantine](https://mantine.dev/) input components to use with [react-hook-form](https://react-hook-form.com/).

Requires only a `name` prop added to the components and lets react-hook-form handle the rest, even automatically setting the error prop when react-hook-form triggers a validation error on the field.

[![rhf-mantine Versions](https://badges.openbase.com/js/versions/rhf-mantine.svg?)](https://openbase.com/js/rhf-mantine?utm_source=embedded&amp;utm_medium=badge&amp;utm_campaign=rate-badge)
## Installation
```bash
npm install rhf-mantine
# or
yarn add rhf-mantine
```
Requires `react-hook-form` and `@mantine/core` as peer dependencies.

Install with peers:
```bash
npm install rhf-mantine react-hook-form @mantine/core
# or
yarn add rhf-mantine react-hook-form @mantine/core
```

## Usage
Replace your import statments from `@mantine/core` with `rhf-mantine`.

Import `FormProvider` from `react-hook-form` and wrap around your form.




```tsx
import { TextInput } from "rhf-mantine"
import { useForm, FormProvider } from "react-hook-form"

function MyComponent() {
  const formMethods = useForm()
  return (
    <FormProvider {...formMethods}>
      <TextInput
        name="myInput" // required
        rules={{ required: "This field is required" }}
        label="My Input"
        placeholder="Enter something"
      />
    </FormProvider>
  )
}
```

Most, but not all Mantine input components are supported.

## TypeScript Support
If you type your form values, you can pass the type to the components to get autocomplete suggestions on the required `name` prop

You can automatically infer the form types and avoid passing it everywhere if you use the `createFormProvider` method exposed by this package.
```tsx
import { createFormProvider } from "rhf-mantine"
import { useForm, HandleSubmit } from "react-hook-form"

type FormValues = { name: string }

// create a Form Provider component with the types embedded
// be sure to do this OUTSIDE of your page/component to avoid re-renders
const Form = createFormProvider<FormValues>()

function MyComponent() {
  const formMethods = useForm<FormValues>()

  const onSubmit: HandleSubmit<FormValues> = (data) => console.log(data)

  return (
    <Form {...formMethods} onSubmit={onSubmit}>
      <Form.TextInput
        name="name"  {/* type is inferred from FormValues */}
        rules={{ required: "This field is required" }}
        label="My name"
      />
    </Form>
  )
}
```