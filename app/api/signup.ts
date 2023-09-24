import { formSchema } from "@/utils/validations/signupSchema";
import axios from "axios";
import * as z from "zod";

interface ISignupUser
  extends Pick<
    z.infer<typeof formSchema>,
    "email" | "password" | "phone" | "username"
  > {
  image: File;
}

export const SignupUser = async (values: ISignupUser) => {
  try {
    const response = await axios.post("/auth/signup", values, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200 || 201) {
      return "successfull";
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("done");
  }
};
