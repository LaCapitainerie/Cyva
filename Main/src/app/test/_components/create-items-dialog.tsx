"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "sonner"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Icons } from "@/components/icons"

import { CreateItemsForm } from "./create-items-form"
import { z } from "zod"

interface CreateItemsDialogProps {
  schema: z.ZodObject<any, any>
}

export function CreateItemsDialog({ schema }: CreateItemsDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isCreatePending, startCreateTransition] = React.useTransition()
  const isDesktop = useMediaQuery("(min-width: 640px)")

  type DataType = z.infer<typeof schema>

  const form = useForm<DataType>({
    resolver: zodResolver(schema),
  })

  function onSubmit(input: DataType) {
    startCreateTransition(async () => {
      const error = "Not implemented"
      // TODO: Implement createTask
      // const { error } = await createTask(input)

      if (error) {
        toast.error(error)
        return
      }

      form.reset()
      setOpen(false)
      toast.success("Items created")
    })
  }

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            New item
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create item</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new item.
            </DialogDescription>
          </DialogHeader>
          <CreateItemsForm form={form} onSubmit={onSubmit}>
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isCreatePending}>
                {isCreatePending && (
                  <Icons.spinner
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Create
              </Button>
            </DialogFooter>
          </CreateItemsForm>
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          New item
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create item</DrawerTitle>
          <DrawerDescription>
            Fill in the details below to create a new item.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button disabled={isCreatePending}>
            {isCreatePending && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Create
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
