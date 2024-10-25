"use client"

import * as React from "react"
import type { DataTableAdvancedFilterField, DataTableFilterField } from "@/types"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

import { useFeatureFlags } from "./feature-flags-provider"
import { getCarrouselColumns } from "./carrousel-table-columns"
import { ItemsTableFloatingBar } from "./unstable_items-table-floating-bar"
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions"

interface TasksTableProps<Type> {
  data: Type[],
  pageCount: number,
  filterFields: DataTableFilterField<Type>[],
  advancedFilterFields: DataTableAdvancedFilterField<Type>[],
}

export function ItemsTable<Type extends { id?: number }>({ data, pageCount, filterFields, advancedFilterFields }: TasksTableProps<Type>) {
  const { featureFlags } = useFeatureFlags()

  const columns = React.useMemo(() => getCarrouselColumns<Type>(), [])

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
      floatingBar={floatingBar ? <ItemsTableFloatingBar table={table} /> : null}
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
