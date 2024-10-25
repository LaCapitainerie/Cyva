"use client"

import * as React from "react"
import { FieldValues, Path, type UseFormReturn } from "react-hook-form"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

interface CreateFormProps<DataType extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode
  form: UseFormReturn<DataType>
  onSubmit: (data: DataType) => void
}

export function CreateItemsForm<DataType extends FieldValues>({
  form,
  onSubmit,
  children,
}: CreateFormProps<DataType>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name={"title" as Path<DataType>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Do a kickflip"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  )
}
