"use client";

import { useEditMemberModal } from "@/hooks/use-edit-member-modal";
import { useGetMember } from "@/hooks/use-get-member";
import { Edit2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { MemberForm } from "./forms/member-form";
import { Member } from "@prisma/client";

interface ActionsProps {
  id: string;
}
export const Actions = ({ id }: ActionsProps) => {
  const editModal = useEditMemberModal();

  const getMember = useGetMember(editModal.id);

  const memberData = getMember.data;

  return (
    <div>
      <Dialog open={editModal.isOpen} onOpenChange={editModal.onClose}>
        <Button variant="ghost" onClick={() => editModal.onOpen(id!)}>
          <Edit2 className="size-4" />
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>Edit Member Details</DialogDescription>
          </DialogHeader>
          <div>
            <MemberForm type="update" initialData={memberData as Member} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
