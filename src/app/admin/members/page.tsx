import { AddMembers } from "@/components/members";

export default async function MembersPage() {
  return (
    <div className="space-y-5 min-h-screen px-5 md:px-20 lg:px-36">
      <AddMembers />
    </div>
  );
}
