import axios from "axios";
import { GetUserInfoFromGoogleProps } from "../../../types/functions.types";

const getUserInfoFromGoogle = async (props: GetUserInfoFromGoogleProps) => {
  try {
    // use normal axios not the axios with credentails
    console.log(props.access_token);
    const res = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${props.access_token}` },
    });

    console.log(res.data.email);
    return res.data.email;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

export default getUserInfoFromGoogle;
