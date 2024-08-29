"use client";

import { Actions } from "@/components/actions";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, Status } from "@prisma/client";

export type MemberType = {
  id: string;
  name: string;
  package: Package;
  status: Status;
  email: string;
  idProof: string;
};

export const columns: ColumnDef<MemberType>[] = [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "package",
    header: "Package",
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
