"use client"

import * as React from "react"
import type { DataTableAdvancedFilterField, DataTableFilterField } from "@/types"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

import type { getTaskPriorityCounts, getTasks, getTaskStatusCounts } from "../_lib/queries"
import { useFeatureFlags } from "./feature-flags-provider"
import { getColumns } from "./tasks-table-columns"
import { TasksTableFloatingBar } from "./tasks-table-floating-bar"
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions"

interface TasksTableProps<Type> {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getTasks>>,
      Awaited<ReturnType<typeof getTaskStatusCounts>>,
      Awaited<ReturnType<typeof getTaskPriorityCounts>>,
    ]
  >,

  filterFields: DataTableFilterField<Type>[],
  advancedFilterFields: DataTableAdvancedFilterField<Type>[],
}

export function TasksTable<Type extends { id?: string }>({ promises, filterFields, advancedFilterFields }: TasksTableProps<Type>) {
  const { featureFlags } = useFeatureFlags()

  const [{ data, pageCount }, statusCounts, priorityCounts] = React.use(promises)

  const columns = React.useMemo(() => getColumns(), [])

  const advancedFilter = featureFlags.includes("advancedFilter")
  const floatingBar = featureFlags.includes("floatingBar")

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: advancedFilter,
    initialState: {
      // sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow:Type, index:number) => `${originalRow.id || ""}-${index}`,
    shallow: false,
    clearOnDefault: true,
  })

  return (
    <DataTable
      table={table}
      floatingBar={floatingBar ? <TasksTableFloatingBar table={table} /> : null}
    >
      {advancedFilter ? (
        <DataTableAdvancedToolbar
          table={table}
          filterFields={advancedFilterFields}
          shallow={false}
        >
          <TasksTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
    </DataTable>
  )
}
