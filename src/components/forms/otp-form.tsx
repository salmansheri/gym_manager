import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

const FormSchema = z.object({
  pin: z.string().min(5, {
    message: " Your pin must contain 5 characters ",
  }),
});

export const OTPForm = () => {
  const [value, setValue] = useLocalStorage("type", "");
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const adminPin = process.env.NEXT_PUBLIC_ADMIN_KEY as string;

    if (adminPin === values.pin) {
      setValue("admin");
      router.push("/admin/dashboard");
      return toast.success("Welcome Admin!");
    }

    return toast.error("Invalid Pin");
  };
  return (
    <div className="flex items-center justify-center lg:justify-start mt-5 gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="pin"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pin</FormLabel>
                <FormControl>
                  <InputOTP {...field} maxLength={5} className="">
                    <InputOTPGroup className="">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>Enter You Pin Here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin size-4" />
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
