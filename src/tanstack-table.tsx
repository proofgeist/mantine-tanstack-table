"use client";
import React, { useEffect, useState } from "react";

import { Column, RowData, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type {
  ComboboxData,
  MantineStyleProp,
  SelectProps,
  TableProps,
  TextInputProps,
} from "@mantine/core";
import {
  ActionIcon,
  Box,
  LoadingOverlay,
  Table as MTable,
  Pagination,
  Group,
  Text,
  Select,
  TextInput,
  MultiSelect,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons-react";
import { DatePickerInput, DatePickerInputProps } from "@mantine/dates";
import { isEmpty } from "lodash";
import classes from "./tanstack-table.module.css";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filter?:
      | {
          type: "text" | "number";
          placeholder?: string;
        }
      | {
          type: "select" | "multi-select";
          options: ComboboxData;
          placeholder?: string;
          selectProps?: Partial<Omit<SelectProps, "data">>;
        }
      | { type: "date"; datePickerProps?: DatePickerInputProps };
  }
}

const defaultLabels = {
  rowSingle: "row",
  rowPlural: "rows",
  rowsPerPage: "Rows per page",
  of: "of",
};

type Props<T extends Table<any>> = TableProps & {
  table: T;
  onRowClick?: (row: ReturnType<T["getRow"]>) => void;
  paginate?: boolean;
  sortable?: boolean;
  loading?: boolean;
  columnFilters?: boolean;
  // labels?: Partial<typeof defaultLabels>;
  perPageOptions?: number[];
  rowStyles?: (row: ReturnType<T["getRow"]>) => MantineStyleProp;
  stickyTop?: number | null;
};

export default function TanstackTable<T extends Table<any>>({
  table,
  onRowClick,
  paginate,
  loading = false,
  sortable = false,
  columnFilters = false,

  // labels = {},
  perPageOptions = [10, 25, 50],
  stickyTop = null,
  rowStyles = () => [],
  ...rest
}: Props<T>) {
  const footerGroups = table.getFooterGroups();
  const rows =
    paginate || sortable ? table.getRowModel() : table.getCoreRowModel();
  const totalRowCount = table.getCoreRowModel().rows.length;

  const textLabels = defaultLabels;

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay
        visible={loading}
        overlayProps={{ blur: 1, radius: "md" }}
      />

      <MTable
        {...rest}
        highlightOnHover={!!onRowClick}
        classNames={{
          ...rest.classNames,
          tfoot: classes.tfoot,
          tbody: classes.tbody,
        }}
      >
        <MTable.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <MTable.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <MTable.Th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <Box
                      style={{
                        display: "inline-flex",
                        gap: 6,
                        alignItems: "center",
                        cursor:
                          header.column.getCanSort() && sortable
                            ? "pointer"
                            : undefined,
                        userSelect: header.column.getCanSort()
                          ? "none"
                          : undefined,
                      }}
                      onClick={(e: unknown) => {
                        const sortHandler =
                          header.column.getToggleSortingHandler();
                        if (sortable && sortHandler) sortHandler(e);
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <IconChevronUp size={18} />,
                        desc: <IconChevronDown size={18} />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </Box>
                  )}
                </MTable.Th>
              ))}
            </MTable.Tr>
          ))}
        </MTable.Thead>
        <MTable.Tbody>
          {rows.rows.map((row) => (
            <MTable.Tr
              key={row.id}
              className={onRowClick && classes.tableRow}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onRowClick && onRowClick(row);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <MTable.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </MTable.Td>
              ))}
            </MTable.Tr>
          ))}
        </MTable.Tbody>
        {footerGroups.length > 0 && (
          <MTable.Tfoot>
            {footerGroups.map((footerGroup) => (
              <MTable.Tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <MTable.Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </MTable.Th>
                ))}
              </MTable.Tr>
            ))}
          </MTable.Tfoot>
        )}
      </MTable>

      <Group justify="space-between">
        {paginate ? (
          <Text>
            {table.getState().pagination.pageSize *
              table.getState().pagination.pageIndex +
              1}
            -
            {Math.min(
              totalRowCount,
              table.getState().pagination.pageSize *
                (table.getState().pagination.pageIndex + 1)
            )}{" "}
            of {totalRowCount}{" "}
            {totalRowCount === 1 ? textLabels.rowSingle : textLabels.rowPlural}
          </Text>
        ) : (
          <Text>
            {totalRowCount}{" "}
            {totalRowCount === 1 ? textLabels.rowSingle : textLabels.rowPlural}
          </Text>
        )}
        {paginate && (
          <Group>
            <Text>Per page: </Text>
            <Select
              data={perPageOptions
                .sort((a, b) => a - b)
                .map((n) => ({
                  value: n.toString(),
                  label: n.toString(),
                }))}
              style={{ width: 80 }}
              value={table.getState().pagination.pageSize.toString()}
              onChange={(value) => value && table.setPageSize(parseInt(value))}
            />
            <Pagination
              siblings={2}
              total={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={(page) => table.setPageIndex(page - 1)}
            />
          </Group>
        )}
      </Group>
    </div>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 500);

  const filterOptions = column.columnDef.meta?.filter ?? { type: "text" };

  useEffect(() => {
    column.setFilterValue(debounced);
  }, [column, debounced]);

  const columnFilterValue = column.getFilterValue();

  if (filterOptions.type === "number")
    return (
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
    );

  if (filterOptions.type === "select")
    return (
      <Select
        clearable
        searchable
        placeholder="Filter..."
        style={{ fontWeight: 400 }}
        data={filterOptions.options}
        onChange={(value) => column.setFilterValue(value)}
        {...filterOptions.selectProps}
      />
    );
  if (filterOptions.type === "multi-select")
    return (
      <MultiSelect
        clearable
        searchable
        placeholder="Filter..."
        sx={{ fontWeight: 400 }}
        data={filterOptions.options}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={(values) => {
          Array.isArray(values)
            ? column.setFilterValue(values)
            : column.setFilterValue([values]);
        }}
        {...filterOptions.selectProps}
      />
    );

  if (filterOptions.type === "date")
    return (
      <DatePickerInput
        popoverProps={{ withinPortal: true }}
        placeholder="Filter..."
        clearable
        valueFormat="M/D/YY"
        onChange={(date) => column.setFilterValue(date)}
        {...filterOptions.datePickerProps}
      />
    );

  return (
    <DebouncedInput
      value={(columnFilterValue ?? "") as string}
      onChange={(value) => column.setFilterValue(value)}
      style={{ flex: 1 }}
      placeholder="Filter..."
    />
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<TextInputProps, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  const rightSection = isEmpty(value) ? null : (
    <ActionIcon
      onClick={() => {
        setValue("");
        onChange("");
      }}
    >
      <IconX size={14} />
    </ActionIcon>
  );

  return (
    <TextInput
      {...props}
      value={value}
      rightSection={rightSection}
      style={{ fontWeight: 400 }}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
