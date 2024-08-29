"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateMemberModal } from "@/hooks/use-create-member-modal";

import { Loader2, Plus } from "lucide-react";

import { Button } from "./ui/button";

import { columns, SupplementType } from "@/app/admin/supplements/columns";
import { useGetMembers } from "@/hooks/use-get-members";
import { DataTable } from "./data-table";
import { MemberForm } from "./forms/member-form";
import { Package, Status } from "@prisma/client";
import { useBulkDelete } from "@/hooks/use-bulk-delete";
import { useCreateSupplementModal } from "@/hooks/use-create-supplements";
import { SupplementForm } from "./forms/supplement-form";

export const AddSupplements = () => {
  const { isOpen, onClose, onOpen } = useCreateSupplementModal();

  return (
    <div>
      <div className="flex justify-end">
        <Dialog onOpenChange={onClose} open={isOpen}>
          <Button onClick={onOpen}>
            <Plus className="size-4 mr-2" />
            Add Supplements
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Supplements</DialogTitle>
            </DialogHeader>
            <SupplementForm type="create" />
          </DialogContent>
        </Dialog>
      </div>
      {/* <div className="flex items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div> */}

      <DataTable
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id);
        }}
        columns={columns}
        data={[]}
      />
    </div>
  );
};
