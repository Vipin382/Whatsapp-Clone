import axios from "axios";

export async function updateUserAbout({ about }: { about: string }) {
  try {
    const response = await axios.post<{ id: string; about: string }>(
      "/server/update/about",
      JSON.stringify({ about: about }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || 201) {
      console.log("done");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserName({ name }: { name: string }) {
  try {
    const response = await axios.post<{ id: string; name: string }>(
      "/server/update/name",
      JSON.stringify({ name: name }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || 201) {
      console.log("done");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserProfile({ image }: { image: string }) {
  try {
    const response = await axios.post(
      "/server/update/photo",
      JSON.stringify({ image: image }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || 201) {
      console.log("done");
    }
  } catch (error) {
    console.log(error);
  }
}
