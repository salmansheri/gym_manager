import { updateMember } from "@/lib/actions/members";
import { Member } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (memberData: Member) => {
      const member = await updateMember(memberData?.id, memberData);
      return member;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Successfully Update Member");
    },
  });

  return mutation;
};
