import { createMember } from "@/lib/actions/members";
import { Member, Package, Status } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (memberData: Member) => {
      const member = await createMember(memberData);

      return member;
    },
    onSuccess: () => {
      toast.success("Member Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return mutation;
};
