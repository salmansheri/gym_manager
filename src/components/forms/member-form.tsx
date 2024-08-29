"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Member, Package, Status } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReadLocalStorage } from "usehooks-ts";
import { useCreateMember } from "@/hooks/use-create-member";
import { useCreateMemberModal } from "@/hooks/use-create-member-modal";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEditMemberModal } from "@/hooks/use-edit-member-modal";
import { init } from "next/dist/compiled/webpack/webpack";
import { MemberType } from "@/app/admin/members/columns";
import { useUpdateMember } from "@/hooks/use-update-member";

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  idProof: z.string(),
  package: z.string(),
  status: z.string(),
});

const packages: Package[] = ["OneMonth", "TwoMonth", "ThreeMonth"];

const status: Status[] = ["PAID", "PENDING"];

interface MemberFormProps {
  type: "create" | "update";
  initialData?: MemberType;
}

export const MemberForm: React.FC<MemberFormProps> = ({
  type,
  initialData,
}) => {
  const { isOpen, onClose, onOpen } = useCreateMemberModal();
  const editModal = useEditMemberModal();
  const updateMemberMutation = useUpdateMember();

  const defaultValues = initialData?.id
    ? {
        name: initialData?.name,
        email: initialData?.email,
        idProof: initialData?.idProof,
        package: initialData?.package as Package,
        status: initialData?.status as Status,
      }
    : {
        name: "",
        email: "",
        idProof: "",
        status: "",
        package: "",
      };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  // const userType = useReadLocalStorage("type");
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if (type === "create") {
      // @ts-ignore
      createMemberMutation.mutate(values, {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      });
    }

    if (type === "update") {
      const payload = {
        id: editModal.id,
        ...values,
      };
      // @ts-ignore
      updateMemberMutation.mutate(payload, {
        onSuccess: () => {
          editModal.onClose();
        },
      });
    }
  };

  const createMemberMutation = useCreateMember();

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Eg: Mr. John Doe" {...field} />
              </FormControl>
              <FormDescription>Enter the Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Eg: johndoe@gmail.com" {...field} />
              </FormControl>
              <FormDescription>Enter the Email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="idProof"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Proof</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Eg: Aadhar no, License No" />
              </FormControl>
              <FormDescription>Enter the ID</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-between">
          <FormField
            name="package"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the Package" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {packages.map((p) => (
                      <SelectItem value={p} key={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="status"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {status.map((s) => (
                      <SelectItem value={s} key={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full">
          {createMemberMutation.isPending || updateMemberMutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>Submit</>
          )}
        </Button>
      </form>
    </Form>
  );
};
