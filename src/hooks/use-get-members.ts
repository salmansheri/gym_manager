import { getMembers } from "@/lib/actions/members";
import { useQuery } from "@tanstack/react-query";

export const useGetMembers = () => {
  const query = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const members = await getMembers();
      return members;
    },
  });

  return query;
};
