import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal-store";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../common/form/formInput";
import FormCustomButton from "../common/form/formCustomButton";
import { createUserContact } from "@/app/api/createUserData";
import { Loader2Icon } from "lucide-react";

const createContactSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().length(10, { message: "must have 10 digits" }),
});

export const CreateContact = () => {
  const { isOpen, onClose, type, getContacts } = useModal();
  const [loading, setLoading] = React.useState<boolean>(false);
  const isModelOpen = isOpen && type === "createContact";

  const createContactForm = useForm<z.infer<typeof createContactSchema>>({
    resolver: zodResolver(createContactSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createContactSchema>) {
    setLoading(true);
    try {
      await createUserContact(values);
      getContacts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
    }
  }
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={isModelOpen} onOpenChange={handleClose}>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-mainPrimaryDark/40">
          <Loader2Icon className="mr-2 text-chatbackground h-12 w-12 animate-spin" />
        </div>
      )}
      <DialogContent className=" bg-mainPrimaryDark border-none">
        <DialogHeader>
          <DialogTitle>Create New Contact </DialogTitle>
        </DialogHeader>
        <Form {...createContactForm}>
          <form
            onSubmit={createContactForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={createContactForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Your Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createContactForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Your number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormCustomButton
              loading={loading}
              className="border-none cursor-pointer hover:bg-chatbackground/80 font-light h-auto text-[10px] bg-chatbackground text-white px-2 rounded-sm py-1.5"
              type="submit"
            >
              Submit
            </FormCustomButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
