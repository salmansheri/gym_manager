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

import { columns, MemberType } from "@/app/admin/members/columns";
import { useGetMembers } from "@/hooks/use-get-members";
import { DataTable } from "./data-table";
import { MemberForm } from "./forms/member-form";
import { Package, Status } from "@prisma/client";
import { useBulkDelete } from "@/hooks/use-bulk-delete";

export const AddMembers = () => {
  const { isOpen, onClose, onOpen } = useCreateMemberModal();

  const getMembers = useGetMembers();

  // @ts-ignore
  const data: MemberType[] = getMembers.data;

  const deleteMembers = useBulkDelete();

  return (
    <div>
      <div className="flex justify-end">
        <Dialog onOpenChange={onClose} open={isOpen}>
          <Button onClick={onOpen}>
            <Plus className="size-4 mr-2" />
            Add Member
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Members</DialogTitle>
            </DialogHeader>
            <MemberForm type="create" />
          </DialogContent>
        </Dialog>
      </div>
      {getMembers.isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <DataTable
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);

            deleteMembers.mutate(ids);
          }}
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
};
