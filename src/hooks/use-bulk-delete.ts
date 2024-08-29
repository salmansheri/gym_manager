import { bulkDeleteMembers } from "@/lib/actions/members";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBulkDelete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const deleteMembers = await bulkDeleteMembers(ids);
      return deleteMembers;
    },
    onSuccess: () => {
      toast.success("Members delete successfully");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      console.log(error);
      toast.success("Cannot Delete member, Please Try again");
    },
  });

  return mutation;
};
