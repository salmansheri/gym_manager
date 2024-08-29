import { getMember } from "@/lib/actions/members";
import { useQuery } from "@tanstack/react-query";

export const useGetMember = (id: string) => {
  const query = useQuery({
    queryKey: ["members", id],
    queryFn: async () => {
      const member = await getMember(id);
      return member;
    },
  });

  return query;
};
