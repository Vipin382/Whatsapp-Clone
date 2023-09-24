import * as z from "zod";

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "email is required",
  }),
  phone: z
    .string()
    .min(10, {
      message: "must be only 10 digits",
    })
    .max(10, { message: "must be only 10 digits" }),
  email: z
    .string()
    .min(15, {
      message: "email is required",
    })
    .email(),
  password: z
    .string()
    .min(8, { message: "minimum 8 characters" })
    .max(32, { message: "maximun 32 characters" }),
  image: z.string(),
});
