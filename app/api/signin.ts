import { formSchema } from "@/utils/validations/signupSchema";
import axios from "axios";
import https from "https";
import * as z from "zod";

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

interface ISigninUser
  extends Pick<z.infer<typeof formSchema>, "email" | "password"> {}

export const SigninUser = async (values: ISigninUser) => {
  try {
    const response = await instance.post(
      "/auth/signin",
      JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 200 || 201) {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("done");
  }
};
