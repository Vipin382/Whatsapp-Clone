import axios from "axios";

export const SignoutUser = async () => {
  try {
    const response = await axios.get("/auth/signout");
    if (response.status === 200 || 201) {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("done");
  }
};
