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

If you indend to use the Date/Time inputs, you also need the `dayjs` and `@mantine/dates` as peers

```bash
npm install dayjs @mantine/dates
# or
yarn add dayjs @mantine/dates
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

Most, but not all Mantine input components are supported. PRs welcome!

## TypeScript Support
If you type your form values, you can pass the type to the components to get autocomplete suggestions on the required `name` prop

You can automatically infer the form types and avoid passing it everywhere if you use the `createFormProvider` method exposed by this package.
```tsx
import { createFormProvider } from "rhf-mantine"
import { useForm, SubmitHandler } from "react-hook-form"

type FormValues = { name: string }

// create a Form Provider component with the types embedded
// be sure to do this OUTSIDE of your page/component to avoid re-renders
const Form = createFormProvider<FormValues>()

function MyComponent() {
  const form = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <Form {...form} onSubmit={onSubmit}>
      <Form.TextInput
        name="name"  {/* type is inferred from FormValues */}
        rules={{ required: "This field is required" }}
        label="My name"
      />
    </Form>
  )
}
```