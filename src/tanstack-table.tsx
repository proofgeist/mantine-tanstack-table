"use client";
import React, { useEffect, useState } from "react";

import { Column, flexRender, RowData, Table } from "@tanstack/react-table";
import {
  Box,
  LoadingOverlay,
  Table as MTable,
  TableProps,
  Pagination,
  Group,
  Text,
  Select,
  TextInput,
  TextInputProps,
  MultiSelect,
  Flex,
  SelectProps,
  ActionIcon,
  MultiSelectProps,
  MantineStyleProp,
  AppShell,
  ComboboxData,
  ScrollArea,
  Container,
  Space,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconX,
} from "@tabler/icons-react";
import classes from "./tanstack-table.module.css";
import { isEmpty } from "lodash";
import { useElementOuterSize } from "./hooks";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    cellStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    filter?:
      | {
          type: "expiration";
          placeholder?: string;
        }
      | {
          type: "text" | "number";
          placeholder?: string;
        }
      | {
          type: "select";
          options: ComboboxData;
          placeholder?: string;
          selectProps?: Partial<Omit<SelectProps, "data">>;
        }
      | {
          type: "multi-select";
          options: ComboboxData;
          placeholder?: string;
          selectProps?: Partial<Omit<MultiSelectProps, "data">>;
        };
  }
}

const defaultLabels = {
  rowSingle: "row",
  rowPlural: "rows",
  rowsPerPage: "Rows per page",
  of: "of",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  stickyFoot?: number | null;
  stickyBorderRadius?: string | null;
  showSummary?: boolean;
  header?: React.ReactNode;
  scrollHeight?: string | number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TanstackTable<T extends Table<any>>({
  table,
  onRowClick,
  paginate,
  loading = false,
  sortable = false,
  columnFilters = false,
  stickyTop = null,
  stickyFoot = null,
  stickyBorderRadius = null,
  rowStyles = () => [],
  showSummary = false,
  scrollHeight = "100%",
  header,

  // labels = {},
  perPageOptions = [10, 25, 50],
  ...rest
}: Props<T>) {
  const footerGroups = table.getFooterGroups();
  const rows =
    paginate || sortable ? table.getRowModel() : table.getCoreRowModel();
  const totalRowCount = table.getFilteredRowModel().rows.length;

  const {
    ref: scrollViewportRef,
    width: scrollViewportWidth,
    height: scrollViewportHeight,
  } = useElementOuterSize<HTMLDivElement>();

  const { ref: headerRef, height: headerHeight } =
    useElementOuterSize<HTMLTableSectionElement>();
  const {
    ref: tableRef,
    width: tableWidth,
    height: tableHeight,
  } = useElementOuterSize<HTMLTableElement>();
  const { ref: footerRef, height: footerHeight } =
    useElementOuterSize<HTMLTableSectionElement>();
  const { ref: paginationRef, height: paginationHeight } =
    useElementOuterSize<HTMLDivElement>();

  const textLabels = defaultLabels;

  // if a filter lowers the page count and you are now viewing a page out of range, reset
  const watchedPageCount = table.getPageCount();
  useEffect(() => {
    if (table.getState().pagination.pageIndex > watchedPageCount - 1) {
      table.resetPageIndex();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedPageCount]);

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay
        visible={loading}
        overlayProps={{ blur: 1, radius: "md" }}
      />
      <ScrollArea
        h={scrollHeight}
        viewportRef={scrollViewportRef}
        styles={{
          scrollbar: {
            marginTop: stickyTop !== null ? headerHeight : 0,
            marginBottom: stickyFoot !== null ? paginationHeight : 0,
          },
        }}
      >
        <MTable {...rest} highlightOnHover={!!onRowClick} ref={tableRef}>
          <MTable.Thead
            ref={headerRef}
            style={
              stickyTop === null
                ? {}
                : {
                    position: "sticky",
                    top: stickyTop,
                    zIndex: 10,
                    backgroundColor: "var(--mantine-color-body)",
                    borderRadius: stickyBorderRadius ? stickyBorderRadius : 0,
                    //TODO fix this border radius, currently not being respected
                  }
            }
          >
            {header && (
              <MTable.Tr>
                <MTable.Th
                  style={{ padding: 0 }}
                  colSpan={table.getHeaderGroups()[0]?.headers.length}
                >
                  {header}
                </MTable.Th>
              </MTable.Tr>
            )}
            {table.getHeaderGroups().map((headerGroup) => (
              <MTable.Tr
                key={headerGroup.id}
                style={{
                  position: "relative",
                  top: "-1px",
                }}
              >
                {headerGroup.headers.map((header) => (
                  <MTable.Th
                    key={header.id}
                    style={{
                      ...header.getContext().column.columnDef.meta?.headerStyle,
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <Box
                          style={{
                            cursor:
                              header.column.getCanSort() && sortable
                                ? "pointer"
                                : undefined,
                            userSelect: header.column.getCanSort()
                              ? "none"
                              : undefined,
                            display: "inline-flex",
                            gap: 6,
                            alignItems: "center",
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
                        <Box>
                          {header.column.getCanFilter() && columnFilters ? (
                            <Filter column={header.column} table={table} />
                          ) : null}
                        </Box>
                      </>
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                style={rowStyles}
              >
                {row.getVisibleCells().map((cell) => (
                  <MTable.Td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      ...cell.getContext().column.columnDef.meta?.cellStyle,
                    }}
                  >
                    {cell.getIsGrouped() ? (
                      <Flex
                        align="center"
                        gap={4}
                        onClick={(e) => {
                          e.stopPropagation();
                          row.getToggleExpandedHandler()();
                        }}
                      >
                        {row.getIsExpanded() ? (
                          <IconChevronDown size="1rem" />
                        ) : (
                          <IconChevronRight size="1rem" />
                        )}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}{" "}
                        ({row.subRows.length})
                      </Flex>
                    ) : cell.getIsAggregated() ? (
                      flexRender(
                        cell.column.columnDef.aggregatedCell,
                        cell.getContext()
                      )
                    ) : cell.getIsPlaceholder() ? null : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </MTable.Td>
                ))}
              </MTable.Tr>
            ))}
          </MTable.Tbody>

          {footerGroups.length > 0 && (
            <MTable.Tfoot ref={footerRef}>
              {footerGroups.map((footerGroup) => {
                return footerGroup.headers.some((header) => {
                  return (
                    !header.isPlaceholder && header.column.columnDef.footer
                  );
                }) ? (
                  <MTable.Tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <MTable.Td
                        key={header.id}
                        style={
                          header.getContext().column.columnDef.meta?.cellStyle
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            )}
                      </MTable.Td>
                    ))}
                  </MTable.Tr>
                ) : null;
              })}
            </MTable.Tfoot>
          )}
        </MTable>
        {showSummary || paginate ? (
          <>
            <Space h={paginationHeight} />
            <Container
              p="sm"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bottom: stickyFoot !== null ? stickyFoot : 0,
                borderRadius: stickyBorderRadius ? stickyBorderRadius : 0,
              }}
              ref={paginationRef}
              className={stickyFoot !== null ? classes.stickyFoot : ""}
            >
              {showSummary ? (
                paginate ? (
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
                    {totalRowCount === 1
                      ? textLabels.rowSingle
                      : textLabels.rowPlural}
                  </Text>
                ) : (
                  <Text>
                    {totalRowCount}{" "}
                    {totalRowCount === 1
                      ? textLabels.rowSingle
                      : textLabels.rowPlural}
                  </Text>
                )
              ) : null}
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
                    onChange={(value) =>
                      value && table.setPageSize(parseInt(value))
                    }
                  />
                  <Pagination
                    siblings={2}
                    total={table.getPageCount()}
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={(page) => table.setPageIndex(page - 1)}
                    ref={paginationRef}
                  />
                </Group>
              )}
            </Container>
          </>
        ) : (
          <> </>
        )}
      </ScrollArea>
    </div>
  );
}

function Filter({
  column,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const columnFilterValue = column.getFilterValue();
  const [stringValue, setStringValue] = useState<string | null>(
    (columnFilterValue as string) ?? null
  );
  const [stringArrayValue, setStringArrayValue] = useState<string[] | null>(
    (columnFilterValue as string[]) ?? null
  );

  const filterOptions = column.columnDef.meta?.filter ?? { type: "text" };

  // useEffect(() => {
  // 	column.setFilterValue(debounced);
  // }, [column, debounced]);

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

  if (filterOptions.type === "select") {
    return (
      <Select
        rightSection={
          <ActionIcon onClick={() => column.setFilterValue(null)}>
            <IconX size="1rem" />
          </ActionIcon>
        }
        searchable
        value={
          stringValue ?? typeof columnFilterValue === "string"
            ? (columnFilterValue as string)
            : null
        }
        placeholder="Filter..."
        style={{ fontWeight: 400 }}
        data={filterOptions.options}
        styles={{ input: { minWidth: 0 } }}
        onChange={(value) => {
          setStringValue(value as string);
          column.setFilterValue(value);
        }}
        {...filterOptions.selectProps}
      />
    );
  }
  if (filterOptions.type === "multi-select") {
    return (
      <MultiSelect
        rightSection={
          <ActionIcon onClick={() => column.setFilterValue(null)}>
            <IconX size="1rem" />
          </ActionIcon>
        }
        searchable
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value={stringArrayValue ?? null}
        placeholder="Filter..."
        sx={{ fontWeight: 400 }}
        data={filterOptions.options}
        styles={{ input: { minWidth: 0 } }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={(values) => {
          if (Array.isArray(values)) {
            setStringArrayValue(values);
            column.setFilterValue(values);
          } else {
            setStringArrayValue([values]);
            column.setFilterValue([values]);
          }
        }}
        {...filterOptions.selectProps}
      />
    );
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
