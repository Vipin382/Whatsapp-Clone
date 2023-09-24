import * as z from "zod";

export const signinSchema = z.object({
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
});
