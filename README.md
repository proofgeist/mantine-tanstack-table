# mantine-tanstack-table

An opinionated table component with default styling for [Mantine 7](https://mantine.dev/) and [TanStack Table 8](https://tanstack.com/table/v8).

Initialize the `useReactTable` hook and pass it into this component to get a fully functional table with sorting, filtering, pagination, and more.

## Installation

```bash
pnpm i @proofgeist/mantine-tanstack-table
```

Requires `@tanstack/react-table` and `@mantine/core` as peer dependencies.  
You may also need the `dayjs` and `@mantine/dates` as peers

```bash
pnpm install dayjs @mantine/dates
```

## Basic Example (minimal)

```tsx
import TanstackTable from "@proofgeist/mantine-tanstack-table";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

// this CSS only needs to be imported once in your entire app
// and can be ignored if you want to use your own styles
import "@proofgeist/mantine-tanstack-table/styles.css";

type TData = { name: string };
const columnHelper = createColumnHelper<TData>();

// define your columns outside of your component to avoid re-renders
// or within a useMemo hook if needed to be inside the component
const columns = [columnHelper.accessor("name", { header: "Name" })];

function MyComponent() {
  const table = useReactTable({
    data: [], // add your data here
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <TanstackTable table={table} />;
}
```

More examples to come
