"use client";

import { Actions } from "@/components/actions";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type SupplementType = {
  id: string;
  name: string;
  price: number;
  weight: string;
  flavour: string;
  idProof: string;
  category: string;
  image?: string;
};

export const columns: ColumnDef<SupplementType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "status",
    header: "status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // console.log(member.id);

      return <Actions id={row.original.id} />;
    },
  },
];
